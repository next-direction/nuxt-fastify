import * as Cookies from 'tiny-cookie';

export const state = () => ({
    locale: {
        current: '',
        default: 'de',
        // if you add new locales here, make sure you add it to nuxt.config.js in wepack ContextReplacementPlugin config otherwise moment won't know it
        all: {
            'en': 'English',
            'de': 'Deutsch'
        }
    }
})

export const getters = {
    selectedLocale(state): string {
        return state.locale.current !== '' ? state.locale.current : state.locale.default
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
