import firebase from 'firebase/app';
import { firestoreAction } from "vuexfire";
import { dbMenuRef } from "../../firebase";

const state = {
    menuItems: []
};

const getters = {
    getMenuItems: state => state.menuItems,

    getMenuItemTypes: state => state.menuItems.map(menuItem => menuItem.type),

    getMenuItemTypesLC: state => state.menuItems.map(menuItem => menuItem.type.toLowerCase()),

    getMenuItemsOfType: (state) => menuItemTypeName => state.menuItems.filter(i => i.type.toLowerCase() === menuItemTypeName.toLowerCase())[0].types.map(j => j.name),
    
    getMenuItemsOfTypeLC: (state) => menuItemTypeName => state.menuItems.filter(i => i.type.toLowerCase() === menuItemTypeName.toLowerCase())[0].types.map(j => j.name.toLowerCase())
};

const mutations = {
    
};

const actions = {
    setMenuRef: firestoreAction(context => {
        return context.bindFirestoreRef('menuItems', dbMenuRef);
    }),
    addNewMenuItemType: async(context, menuItemType) => {
        try {
            await dbMenuRef.add(menuItemType);
            alert("New item type created.");
        } catch (err) {
            alert("Error creating new type of menu item.", err);
        }
    },
    addNewMenuItem: async(context, menuItem) => {
        try {
            await dbMenuRef
                .where("type", "==", menuItem.type)
                .get()
                .then(querySnapshot => querySnapshot.docs[0].id)
                .then(docId => {
                    dbMenuRef.doc(docId).update({
                        types: firebase.firestore.FieldValue.arrayUnion(menuItem)  
                    });
                });
    
            alert("New item created.");            
        } catch (err) {
            alert("Error creating new menu item.", err);
        }
    },
    removeItemType: async(context, id) => {
        try {
            await dbMenuRef.doc(id).delete();

            alert("Item type deleted.");
        } catch (err) {
            alert(`Error removing item type, ${err}`);
        }
    },
    removeItem: async (context, data) => { 
        const { typeId, itemData } = data;
        
        try {
            await dbMenuRef.doc(typeId).update({
                types: firebase.firestore.FieldValue.arrayRemove(itemData)  
            });

            alert("Item deleted.");
        } catch (err) {
            alert(`Error removing item, ${err}`);
        }
    },
    toggleItemAvailability: async (context, data) => {
        const { typeId, itemData, setAvailability } = data;
        const actionTextSuccess = setAvailability ? "enabled" : "disabled";
        const actionTextError = setAvailability ? "enabling" : "disabling";
        const itemDataNew = JSON.parse(JSON.stringify(itemData)); 

        itemDataNew.availability = setAvailability; 
        
        try {
            // Removing item with old availability data and adding item with new availability data
            await dbMenuRef
                    .doc(typeId)
                    .update({
                        types: firebase.firestore.FieldValue.arrayRemove(itemData)
                    })
                    .then(async () => {
                        await dbMenuRef
                            .doc(typeId)
                            .update({
                                types: firebase.firestore.FieldValue.arrayUnion(itemDataNew)
                            });
                    });

            alert(`Item ${actionTextSuccess}.`);
        } catch (err) {
            console.log(`Error ${actionTextError} item, ${err}`);
        }
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}