<template>
<section class="container">
    <div>
        <logo/>
        <h1 class="title">
            Full Stack App
        </h1>
        <h2 class="subtitle">
            A full stack example application (excluding TypeScript for now)
        </h2>
        <ul>
            <li v-for="(person, index) in people" :key="index">
                {{ person.name }}
            </li>
        </ul>
        Der Count ist {{ count }}
        <br><br>
        <el-button type="danger">Gefahr</el-button><br><br>
        <fa :icon="fa.faAddressBook" size="6x"></fa>
        <br><br>
        Aktuelles Datum {{ now }}
    </div>
</section>
</template>

<script>
import Logo from '@/components/Logo.vue';
import {
    Button
} from "element-ui";
import {
    faAddressBook
} from "@fortawesome/free-solid-svg-icons";

export default {
    computed: {
        now() {
            return new this.$moment().format('DD. MMMM YYYY');
        },
        fa() {
            return {
                faAddressBook
            };
        },
        count() {
            return this.$store.getters.count;
        },
        people() {
            return this.$store.getters['list/people'];
        }
    },
    components: {
        "el-button": Button,
        Logo
    }
}
</script>

<style lang="less">
@import '~assets/styles/site';

.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: @link-color;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
