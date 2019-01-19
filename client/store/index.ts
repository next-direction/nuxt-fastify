import * as Cookies from "tiny-cookie";

export const state = () => ({
    locale: {
        all: {
            de: "Deutsch",
            en: "English",
        },
        current: "",
        default: "de",
        // if you add new locales here, make sure you add it to nuxt.config.js in wepack ContextReplacementPlugin config

    },
});

export const getters = {
    selectedLocale(vuexState): string {
        return vuexState.locale.current !== "" ? vuexState.locale.current : vuexState.locale.default;
    },
};

export const actions = {

};

export const mutations = {
    setLocale(vuexState, locale) {

        if (vuexState.locale.all[locale] !== undefined) {
            vuexState.locale.current = locale;
        }
    },
};
