import Vue from 'vue';
// import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
// import VueCompositionAPI from 'vue';
import axios from 'axios';
import i18n from '@/libs/i18n';

import router from './router';
import store from './store';
import App from './App.vue';
import ApiService from '@/services/api.service';

// Global Components
import './global-components';

// 3rd party plugins
import '@axios';
import '@/libs/acl';
import '@/libs/portal-vue';
import '@/libs/clipboard';
import '@/libs/toastification';
import '@/libs/sweet-alerts';
import '@/libs/vue-select';
import '@/libs/tour';
import '@/libs/vee-validate/index';

import * as VueGoogleMaps from 'vue2-google-maps';
import VueMask from 'v-mask';
import DatePicker from 'vue2-datepicker';
import GlobalMixin from '@/@core/mixins/global';
import 'vue2-datepicker/index.css';
import VueCurrencyFilter from 'vue-currency-filter';
import vSelect from 'vue-select';
import Global from '@/mixins/global';
// import { ValidationObserver } from 'vee-validate';
import FormSelect from '@/components/forms/form-select.vue';
import FormInput from '@/components/forms/form-input.vue';
import FormPicker from '@/components/forms/form-picker.vue';

Vue.mixin(GlobalMixin);
Vue.mixin(Global);

Vue.use(VueCurrencyFilter, {
   symbol: '',
   thousandsSeparator: '.',
   fractionCount: 2,
   fractionSeparator: ',',
   symbolPosition: 'front',
   symbolSpacing: true,
   avoidEmptyDecimals: undefined
});
Vue.component('date-picker', DatePicker);
// Vue.component('validation-observer', ValidationObserver);
Vue.component('form-input', FormInput);
Vue.component('form-picker', FormPicker);
Vue.component('form-select', FormSelect);

Vue.component('v-select', vSelect);

Vue.use(VueMask);
axios.defaults.baseURL = 'http://boevotest.apptest.uz/api/';
axios.defaults.headers.common.langCode = localStorage.getItem('locale') || 'uz_latn';
//axios.defaults.baseURL = 'https://admnext-api.maktab.uz/'
// axios.defaults.baseURL = 'https://admnext-api.maktab.uz/'
// axios.defaults.baseURL = "https://adm-api.maktab.uz/";
// axios.defaults.baseURL = "http://adm-api.sport.uz/";
if (window.location.href.indexOf('http://boevo.apptest.uz') > -1) {
   axios.defaults.baseURL = 'http://boevo.apptest.uz/api/';
}
if (window.location.href.indexOf('https://boevo.apptest.uz/api') > -1) {
   axios.defaults.baseURL = 'https://boevo.apptest.uz/api/';
}

const token = localStorage.getItem('auth_token');
if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
const requestInterceptor = (request) => {
   request.withCredentials = true;
   return request;
};
axios.interceptors.request.use((request) => requestInterceptor(request));

ApiService.mount401Interceptor();
// BSV Plugin Registration
// Vue.use(ToastPlugin)
// Vue.use(ModalPlugin)

// Composition API
// Vue.use(VueCompositionAPI);
// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css'); // For form-wizard

// import core styles
require('@core/scss/core.scss');

// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
   load: {
      key: 'AIzaSyBJezTcA6efW5eT6ADhaaTB2v9U0R9RQCk',
      libraries: 'places',
      async: true,
      defer: true
   }
});
new Vue({
   router,
   store,
   i18n,
   render: (h) => h(App)
}).$mount('#app');
