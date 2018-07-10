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
        commit
    }, {
        req
    }) {

        if (process.server) {

            if (req.headers.cookie) {
                const cookie = require('cookie');
                const cookies = cookie.parse(req.headers.cookie);

                if (cookies.locale) {
                    commit('setLocale', cookies.locale);
                }
            }
        }
    }
}

export const mutations = {
    setLocale(state, locale) {
        if (state.locale.all[locale] !== undefined) {
            state.locale.current = locale

            if (!process.server) {
                localStorage.setItem('locale', locale);
                Cookies.set('locale', locale);
            }
        }
    }
}
