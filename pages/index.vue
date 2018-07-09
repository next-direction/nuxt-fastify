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
        <h3>List rendered from vuex store (list module)</h3>
        <ul>
            <li v-for="(person, index) in people" :key="index">
                {{ person.name }}
            </li>
        </ul><br><br>
        <h3>Variable from root vuex store</h3>
        Count {{ count }}
        <br><br>
        <h3>Button from ElementUI (with tree shaking)</h3>
        <el-button type="danger">Gefahr</el-button><br><br>
        <h3>Icon from FontAwesome 5 (including tree shaking)</h3>
        <fa :icon="fa.faAddressBook" size="6x"></fa><br><br>
        <h3>Date with MomentJS (only german and english locale available)</h3>
        Current date (german/english format possible) {{ now }}
        <br><br>
        <h3 class="colored">Text colored with LESS variable</h3>
    </div>
</section>
</template>

<script>
import Logo from "@/components/Logo.vue";
import {
    Button
} from "element-ui";
import {
    faAddressBook
} from "@fortawesome/free-solid-svg-icons";

export default {
    computed: {
        now() {
            return new this.$moment().format("DD. MMMM YYYY");
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
            return this.$store.getters["list/people"];
        }
    },
    components: {
        "el-button": Button,
        Logo
    }
};
</script>

<style lang="less" scoped>
@import "~assets/styles/site";
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.colored {
    color: @link-color;
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

ul {
    list-style-type: none;
}
</style>
