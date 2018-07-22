<template>
<div>
    <select v-model="selectedLocale">
        <option v-for="(lang, key) in locale.all" :key="key" :label="lang" :value="key">
            {{ lang }}
        </option>
    </select>
    <nuxt/>
</div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    computed: {
        ...mapState(["locale"]),
        selectedLocale: {
            get() {
                return this.$store.getters.selectedLocale;
            },
            set(locale) {
                if (locale in this.$i18n.messages) {
                    this.$i18n.locale = locale;
                    this.changeMomentLocale(locale);
                } else {
                    this.loadLocaleMessage(locale, (err, message) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        this.$i18n.setLocaleMessage(locale, message);

                        this.$i18n.locale = locale;
                        this.$store.commit("setLocale", locale);
                        this.changeMomentLocale(locale);
                    });
                }
            }
        }
    },
    methods: {
        changeMomentLocale(locale) {
            this.$moment.locale(locale);
        },
        loadLocaleMessage(locale, cb) {
            this.$axios
                .$get(`/lang/${locale}.json`)
                .then(res => {
                    cb(null, res);
                })
                .catch(e => {
                    cb(e);
                });
        }
    }
};
</script>

<style>
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}
</style>
