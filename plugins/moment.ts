import Vue from 'vue'
import moment from 'moment-timezone'

export default ({
    app,
    store
}) => {
    moment.tz.setDefault('UTC');

    // used to load all available locales in
    for (var loc in store.state.locale.all) {
        moment.locale(loc);
    }

    moment.locale(app.i18n.locale);

    Vue.prototype.$moment = moment;
};
