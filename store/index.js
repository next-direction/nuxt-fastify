import * as Cookies from 'tiny-cookie';

export const state = () => ({
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
    selectedLocale(state) {
        return state.locale.current !== '' ? state.locale.current : state.locale.default;
    }
}

export const actions = {

}

export const mutations = {
    setLocale(state, locale) {

        if (state.locale.all[locale] !== undefined) {
            state.locale.current = locale
        }
    }
}
