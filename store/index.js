import * as Cookies from 'tiny-cookie';

export const state = () => ({
    count: 0,
    locale: {
        current: '',
        default: 'de',
        all: {
            'en': 'English',
            'de': 'Deutsch'
        }
    }
})

export const getters = {
    count(state) {
        return state.count;
    },
    selectedLocale(state) {
        return state.locale.current !== '' ? state.locale.current : state.locale.default;
    }
}

export const actions = {
    nuxtServerInit({
        dispatch
    }, {
        req
    }) {
        // use this logic if main function also uses async action (you can also use axios return as promise here)
        /* const p = new Promise((resolve, reject) => {
            resolve();
        }); */

        // use this for chaining init functions of store modules (if root store - means this function - also performs async actions, add this promise in the array too - see variable p below)
        return Promise.all([
            //p,
            dispatch('list/nuxtServerInit', 20)
        ])
    }
}

export const mutations = {
    setCount(state, count) {
        state.count = count;
    },
    setLocale(state, locale) {

        if (state.locale.all[locale] !== undefined) {
            state.locale.current = locale
        }
    },
    incrementCounter(state) {
        state.count++;
    }
}
