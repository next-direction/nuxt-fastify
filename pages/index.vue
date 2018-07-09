<template>
<section class="container">
    <div>
        <logo/>
        <h1 class="title">
            Full Stack App
        </h1>
        <h2 class="subtitle">
            {{ $t('index.subTitle') }}
        </h2>
        <h3>{{ $t('index.listStore') }}</h3>
        <ul>
            <li v-for="(person, index) in people" :key="index">
                {{ person.name }}
            </li>
        </ul><br><br>
        <h3>{{ $t('index.variableStore') }}</h3>
        Count {{ count }}
        <br><br>
        <h3>Button from ElementUI (with tree shaking)</h3>
        <el-button type="danger">Danger</el-button><br>
        <h3>Button used as Nuxt Link</h3>
        <nuxt-link to="/about" tag="el-button" class="el-button--danger">About</nuxt-link><br><br>
        <h3>Icon from FontAwesome 5 (including tree shaking)</h3>
        <fa :icon="fa.faAddressBook" size="6x"></fa><br><br>
        <h3>Date with MomentJS (only german and english locale available)</h3>
        Current date (german/english format possible) {{ now }}
        <br><br>
        <h3 class="colored">Text colored with LESS variable</h3>
        <br><br>
        <h3>Currency formatted with filter (registered as plugin)</h3>
        {{ currencyValue | currency }}
    </div>
</section>
</template>

<script>
import Logo from "@/components/Logo.vue";

// here you can add any other icon you want (brands set is also available as dependency in package.json)
import {
    faAddressBook
} from "@fortawesome/free-solid-svg-icons";

import {
    mapGetters,
    mapState
} from 'vuex';

export default {
    data() {
        return {
            currencyValue: 123151
        }
    },
    computed: {
        ...mapState(['count']), // map from root store
        ...mapGetters('list', [ // map from list module of the store
            'people'
        ]),
        now() {
            return new this.$moment().format("DD. MMMM YYYY");
        },
        fa() {

            // here you have to return all imported icons
            return {
                faAddressBook
            };
        }
    },
    components: {
        Logo
    }
};
</script>

<style lang="less" scoped>
@import "~assets/styles/variables";
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
