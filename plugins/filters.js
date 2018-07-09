import Vue from 'vue';

Vue.filter('currency', value => {
    if (!value || typeof value !== 'number') {
        return '';
    }

    return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EUR'
    });
})
