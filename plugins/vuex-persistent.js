import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'tiny-cookie';

export default ({
    store
}) => {
    createPersistedState({
        storage: {
            getItem: key => {

                try {
                    let value = 'undefined' !== typeof localStorage ? localStorage.getItem(key) : '';

                    if (!value) {
                        value = Cookies.get(key);
                    }

                    return value ? value : null;
                } catch (e) {
                    return null;
                }
            },
            setItem: (key, value) => {
                Cookies.set(key, value); // no options for now, but be aware of possible options: https://www.npmjs.com/package/tiny-cookie#setkey-value-options

                if ('undefined' !== typeof localStorage) {
                    localStorage.setItem(key, value);
                }
            },
            removeItem: key => {
                Cookies.remove(key);

                if ('undefined' !== typeof localStorage) {
                    localStorage.removeItem(key);
                }
            }
        },
        paths: [
            'locale.current'
        ]
    })(store)
}
