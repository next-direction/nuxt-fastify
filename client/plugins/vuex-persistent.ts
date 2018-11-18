import * as Cookies from "tiny-cookie";
import createPersistedState from "vuex-persistedstate";

export default ({
    store,
}) => {
    createPersistedState({
        paths: [
            "locale.current",
        ],
        storage: {
            getItem: (key) => {

                try {
                    let value = "undefined" !== typeof localStorage ? localStorage.getItem(key) : "";

                    if (!value) {
                        value = Cookies.get(key);
                    }

                    return value ? value : null;
                } catch (e) {
                    return null;
                }
            },
            removeItem: (key) => {
                Cookies.remove(key);

                if ("undefined" !== typeof localStorage) {
                    localStorage.removeItem(key);
                }
            },
            setItem: (key, value) => {
                // no options for now, possible options: https://www.npmjs.com/package/tiny-cookie#setkey-value-options
                Cookies.set(key, value);

                if ("undefined" !== typeof localStorage) {
                    localStorage.setItem(key, value);
                }
            },

        },

    })(store);
};
