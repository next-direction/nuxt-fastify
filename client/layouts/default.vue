<template>
<div>
    <select v-model="selectedLocale">
        <option v-for="(lang, key) in stateLocale.all" :key="key" :label="lang" :value="key">
            {{ lang }}
        </option>
    </select>
    <nuxt/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { mapState } from "vuex";
import { Action, Getter, Mutation, namespace, State } from "vuex-class";

@Component
export default class Default extends Vue {
  @State("locale") public stateLocale;

  get selectedLocale() {
    return this.$store.getters.selectedLocale;
  }

  set selectedLocale(locale) {
    const setLocale = () => {
      this.$i18n.locale = locale;
      this.changeMomentLocale(locale);
      this.$store.commit("setLocale", locale);
    };

    if (locale in this.$i18n.messages) {
      setLocale();
    } else {
      this.loadLocaleMessage(locale, (err, message) => {
        if (err) {
          // tslint:disable-next-line:no-console
          console.error(err);
          return;
        }
        this.$i18n.setLocaleMessage(locale, message);

        setLocale();
      });
    }
  }

  public changeMomentLocale(locale) {
    this.$moment.locale(locale);
  }

  public loadLocaleMessage(locale, cb) {
    this.$axios
      .$get(`/lang/${locale}.json`)
      .then((res) => {
        cb(null, res);
      })
      .catch((e) => {
        cb(e);
      });
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
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
