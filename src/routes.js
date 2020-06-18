import Home from './components/Home';
import Menu from './components/Menu';
import OrderingGuide from './components/OrderingGuide';
import Delivery from './components/Delivery';
import History from './components/History';
import Contact from './components/Contact';
import Admin from './components/Admin';

// // Lazy loading components via "Dynamic Imports" i.e. these components below will be loaded only when called
// const Menu = () => import('./components/Menu');
// const OrderingGuide = () => import('./components/OrderingGuide');
// const Delivery = () => import('./components/Delivery');
// const History = () => import('./components/Menu');
// const Contact = () => import('./components/Contact');

// // Grouping components into chunks for lazy loading i.e. these components below will be lazy loaded together if one of them was called
// const OrderingGuide = () => import(/* webpackChunkName: "aboutGroup" */ './components/OrderingGuide');
// const Delivery = () => import(/* webpackChunkName: "aboutGroup" */ './components/Delivery');
// const History = () => import(/* webpackChunkName: "aboutGroup" */ './components/Menu');

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