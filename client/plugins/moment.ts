import moment from "moment-timezone";
import Vue from "vue";

export default ({
    app,
    store,
}) => {
    moment.tz.setDefault("UTC");

    // used to load all available locales in
    for (const loc in store.state.locale.all) {

        if (loc) {
            moment.locale(loc);
        }
    }

    moment.locale(app.i18n.locale);

    Vue.prototype.$moment = moment;
};
