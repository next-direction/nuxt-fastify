import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({
    app,
    store
}) => {

    const locales = store.state.locale.all;
    const messages = {};

    for (let key in locales) {

        if (locales.hasOwnProperty(key)) {
            messages[key] = require('~/lang/' + key + '.json');
        }
    }

    let currentLocale = store.state.locale.default;

    // try to find previously selected value
    if (process.server) {
        const cookie = require('cookie');
        const cookies = cookie.parse(app.context.req.headers.cookie);

        if (cookies.locale) {
            currentLocale = cookies.locale;
        }
    } else {
        const storageLocale = localStorage.getItem('locale');

        if (storageLocale) {
            currentLocale = storageLocale;
        }
    }

    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: currentLocale,
        fallbackLocale: store.state.locale.default,
        messages
    })
}
