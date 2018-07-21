import Vue from 'vue'
import moment from 'moment-timezone'

moment.tz.setDefault('UTC');

Vue.prototype.$moment = moment;
