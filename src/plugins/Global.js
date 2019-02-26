// const ServerUrl = 'http://192.168.100.236:9009';
// const ServerUrl = 'http://192.168.100.175:9000';
const ServerUrl = 'http://localhost:9000';

function includes(...values) {
    let a = false;
    for (let val of values) {
        if (this.$route.path() == val) {
            a = true;
        }
    }
    return a ? "menu_item_active" : '';
}

export default {
    ServerUrl,
    includes,
}