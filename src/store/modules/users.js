import { firebaseAuth } from "../../firebase";

const state = {
    currentUser: null
};

const getters = {
    currentUser: state => state.currentUser
};

const mutations = {
    userStatus: (state, user) => {
        user === null ? state.currentUser = null : state.currentUser = user.email;
    }
};

const actions = {
    signIn: async (context, user) => {
        try {
            const userData = await firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
            context.commit('userStatus', userData.user);
        } catch(err) {
            const errCode = err.code;
            const errMsg = err.message;
    
            if (errCode === "auth/wrong-password") {
                alert("Wrong password.");
            } else {
                alert(errMsg);
            }
        }
    },
    signOut: async (context) => {
        try {
            await firebaseAuth.signOut();
        } catch(err) {
            alert(`Error signing out, ${err}`);
        }
    
        context.commit('userStatus', null);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}