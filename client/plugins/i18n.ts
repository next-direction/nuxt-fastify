import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({
    app,
    store,
}) => {
    let currentLocale = store.state.locale.default;

    // try to find previously selected value on client and server to avoid flickering of translations
    if ("undefined" === typeof window) {

        if (app.context.req.headers.cookie) {
            const cookie = require("cookie");
            const cookies = cookie.parse(app.context.req.headers.cookie);
            const vuex = cookies.vuex ? JSON.parse(cookies.vuex) : {};

            if (vuex.locale.current) {
                currentLocale = vuex.locale.current;
            }
        }
    } else {
        const persistedStore = localStorage.getItem("vuex");

        if (persistedStore) {
            const vuex = JSON.parse(persistedStore);
            currentLocale = vuex.locale.current;
        }
    }

    store.commit("setLocale", currentLocale);

    const messages = {};

    messages[currentLocale] = require("~/static/lang/" + currentLocale + ".json");

    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        fallbackLocale: store.state.locale.default,
        locale: currentLocale,
        messages,
    });
};
