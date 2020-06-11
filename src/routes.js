import Home from './components/Home';
import Menu from './components/Menu';
import OrderingGuide from './components/OrderingGuide';
import Delivery from './components/Delivery';
import History from './components/History';
import Contact from './components/Contact';
import Admin from './components/Admin';

export const routes = [
    { 
        path: "/", 
        name: "homeLink", 
        components: {
            default: Home,
            'ordering-guide': OrderingGuide,
            'delivery': Delivery,
            'history': History
        }
    }, { 
        path: "/menu", 
        name: "menuLink", 
        component: Menu 
    }, { 
        path: "/ordering-guide", 
        name: "orderingGuideLink", 
        component: OrderingGuide 
    }, { 
        path: "/delivery", 
        name: "deliveryLink", 
        component: Delivery 
    }, { 
        path: "/history", 
        name: "historyLink", 
        component: History 
    }, { 
        path: "/contact", 
        name: "contactLink", 
        component: Contact 
    }, { 
        path: "/admin", 
        name: "adminLink", 
        component: Admin, 
        beforeEnter: (to, from, next) => {
            // Individual route guard
            alert("This area is for authorised users only. Please login to continue.");
            next();
        }
    }, { 
        path: "*", 
        redirect: "/" 
    }
];