import Accounting from 'accounting-js';     // https://www.npmjs.com/package/accounting-js

export default function formatPrice(val) {
    return Accounting.formatMoney(val);
}