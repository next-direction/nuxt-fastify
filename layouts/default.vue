<template>
<div>
    <header>
        <el-select v-model="selectedLocale" placeholder="Select">
            <el-option v-for="(lang, key) in locale.all" :key="key" :label="lang" :value="key">
                {{ lang }}
            </el-option>
        </el-select>
    </header>
    <nuxt/>
</div>
</template>

<script>
import {
    mapState
} from 'vuex';

export default {
    computed: {
        ...mapState(['locale']),
        selectedLocale: {
            get() {
                return this.$store.getters.selectedLocale;
            },
            set(locale) {
                this.$i18n.locale = locale;
                this.$store.commit('setLocale', locale)
            }
        }
    }
}
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

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
