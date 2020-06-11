import dateTime from './dateTime';
import menuItemTypes from './menuItemTypes';

export default {
    install(Vue) {
        Vue.filter('dateTime', dateTime);
        Vue.filter('menuItemTypes', menuItemTypes);
    }
}