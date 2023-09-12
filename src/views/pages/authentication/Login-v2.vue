<template>
   <div class="auth-wrapper auth-v2" style="position: relative">
      <div>
         <div class="d-flex images-login">
            <img width="100px" src="../../../../public/Logo.svg" alt="logo" />
         </div>
         <div class="language-login">
            <locale :is-login="true" @getLanguageId="getLanguageId" />
         </div>
      </div>
      <b-row class="auth-inner m-0">
         <!-- Brand logo-->
         <b-link class="brand-logo">
            <h2 class="brand-text text-primary ml-1" style="width: 520px;">{{ $t("appName") }}</h2>
            <!-- Савдо саноат палатаси Ягона ахборот тизими -->
         </b-link>

         <!-- /Brand logo-->

         <!-- Left Text-->
         <b-col
            lg="8"
            class="d-none d-lg-flex align-items-center p-5"
            style="background-color: #f3f4f9"
         >
            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
               <!-- <b-img width="900px" fluid :src="imgUrl" alt="Login V2" /> -->
               <img class="w-100" src="@/assets/images/main-section-bg.png" alt="bg" />
            </div>
         </b-col>
         <!-- /Left Text-->

         <!-- Login-->

         <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
            <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
               <b-card-title title-tag="h2" class="font-weight-bold mb-1">{{ $t("auth") }}</b-card-title>
               <!-- <b-card-text class="mb-2">{{ $t("Sign In to your account") }}</b-card-text> -->

               <!-- form -->

               <validation-observer ref="loginValidation">
                  <b-row>
                     <b-col lg="6">
                        <b-button
                           class="w-100"
                           :class="step == 1 && 'active'"
                           variant="outline-success"
                           @click="step = 1"
                        >{{ $t("enterLogin") }}</b-button>
                     </b-col>
                     <b-col lg="6">
                        <b-button
                           class="w-100"
                           :class="step == 2 && 'active'"
                           variant="outline-primary"
                           @click="step = 2"
                        >
                           <feather-icon icon="KeyIcon" />
                           {{ $t("enterEImzo") }}
                        </b-button>
                     </b-col>
                  </b-row>
                  <div v-if="step == 2">
                     <just-sign @sign="loginESP($event)" />
                  </div>
                  <div v-show="step == 1">
                     <b-form class="auth-login-form mt-2" @submit.prevent>
                        <form-input v-model="login.username" required :label="$t('username')" />
                        <!-- email -->
                        <!-- <b-form-group :label="$t('username')" label-for="login-email">
                  <validation-provider #default="{ errors }" name="username" rules="required">
                    <b-form-input
                      v-model="login.username"
                      :state="errors.length > 0 ? false : null"
                      name="login-email"
                      :placeholder="$t('username')"
                    />
                    <small class="text-danger" v-show="errors.length > 0">{{ $t(`${errors[0]}`) }}</small>
                  </validation-provider>

                  
                        </b-form-group>-->

                        <!-- forgot password -->
                        <b-form-group>
                           <div class="d-flex justify-content-between">
                              <label for="login-password">{{ $t("Password") }}</label>
                              <!-- <b-link :to="{ name: 'auth-forgot-password' }">
                    <small>{{ $t("ForgotPassword") }}</small>
                              </b-link>-->
                           </div>
                           <validation-provider
                              #default="{ errors }"
                              name="Password"
                              rules="required"
                           >
                              <b-input-group
                                 class="input-group-merge"
                                 :class="errors.length > 0 ? 'is-invalid' : null"
                              >
                                 <b-form-input
                                    v-model="login.password"
                                    :state="errors.length > 0 ? false : null"
                                    class="form-control-merge"
                                    :type="passwordFieldType"
                                    name="login-password"
                                    placeholder="············"
                                 />
                                 <b-input-group-append is-text>
                                    <feather-icon
                                       class="cursor-pointer"
                                       :icon="passwordToggleIcon"
                                       @click="togglePasswordVisibility"
                                    />
                                 </b-input-group-append>
                              </b-input-group>
                              <small
                                 class="text-danger"
                                 v-show="errors.length > 0"
                              >{{ $t(`${errors[0]}`) }}</small>
                           </validation-provider>
                        </b-form-group>

                        <!-- checkbox -->
                        <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
                        </b-form-group>-->

                        <!-- submit buttons -->

                        <!-- !!!!!!!!!  LOCAL BILAN SERVER AJRATILDI -->

                        <b-button
                           type="submit"
                           variant="primary"
                           block
                           @click="validationForm"
                           :disabled="Loading"
                        >
                           <b-spinner v-if="Loading" small></b-spinner>
                           {{ $t("SignIn") }}
                        </b-button>
                        <!-- <b-button
                type="submit"
                variant="primary"
                block
                @click="Sign"
                :disabled="Loading"
                v-if="!isLocal"
              >
                <b-spinner v-if="Loading" small></b-spinner>
                {{ $t("SignIn") }}
                        </b-button>-->
                     </b-form>
                  </div>
               </validation-observer>

               <b-modal
                  v-model="sms.trusteddevice"
                  hide-footer
                  no-close-on-backdrop
                  :title="$t('SmsCode')"
               >
                  <b-alert show variant="success">
                     <p class="p-1">{{ $t("SendSmmYourPhone", { phonenumber: sms.phoneNumber }) }}</p>
                  </b-alert>
                  <b-row>
                     <b-col>
                        <label for>{{ $t("SmsCode") }}</label>
                        <b-form-input maxlength="4" v-model="sms.smscode"></b-form-input>
                     </b-col>
                  </b-row>
                  <b-row class="mt-2">
                     <b-col class="text-center">
                        <b-button variant="danger" @click="sms.trusteddevice = false" class="mr-2">
                           <feather-icon icon="XIcon"></feather-icon>
                           {{ $t("Cancel") }}
                        </b-button>
                        <b-button variant="success" @click="SignTwoFactor">
                           <b-spinner small v-if="SignTwoFactorLoading"></b-spinner>
                           <feather-icon v-if="!SignTwoFactorLoading" icon="CheckSquareIcon"></feather-icon>
                           {{ $t("SignIn") }}
                        </b-button>
                     </b-col>
                  </b-row>
               </b-modal>
            </b-col>
         </b-col>
         <!-- /Login-->
      </b-row>
   </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VuexyLogo from '@core/layouts/components/Logo.vue';
import { BSpinner, BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BModal, BAlert } from 'bootstrap-vue';
import { required, email } from '@validations';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import store from '@/store/index';

import AccountService from '@/services/others/account.service';
import ApiService from '@/services/api.service';
import Locale from '@core/layouts/components/app-navbar/components/Locale.vue';
import justSign from '@/components/justSign.vue';
import FormInput from '@/components/forms/form-input.vue';
// import Global from "@/mixins/global";

export default {
   components: {
      BRow,
      BCol,
      BLink,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BInputGroup,
      BFormCheckbox,
      BCardText,
      BCardTitle,
      BImg,
      BForm,
      BButton,
      VuexyLogo,
      ValidationProvider,
      BSpinner,
      ValidationObserver,
      BModal,
      BAlert,
      Locale,
      justSign,
      FormInput
   },
   mixins: [togglePasswordVisibility],
   name: 'Login',
   data() {
      return {
         tempLanguageId: null,
         status: '',
         password: '',
         userEmail: '',
         sideImg: '', //require('@/assets/images/sportMain.png')
         // validation rulesimport store from '@/store/index'
         required,
         step: 1,
         email,
         Loading: false,
         login: {
            username: '',
            password: '',
            languageId: 3
         },
         sms: {
            trusteddevice: false,
            phoneNumber: ''
         },
         SignTwoFactorLoading: false
      };
   },
   computed: {
      passwordToggleIcon() {
         return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
      },
      isLocal() {
         if (window.location.href.indexOf('http://localhost') > -1) {
            return true;
         } else {
            return false;
         }
      },
      imgUrl() {
         if (store.state.appConfig.layout.skin === 'dark') {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.sideImg = require('@/assets/images/bg.jpg');
            return this.sideImg;
         }
         return this.sideImg;
      }
   },
   methods: {
      loginESP(item) {
         // console.log("---AAA---", item);
         AccountService.LoginByEImzo({
            signData: item.key
         })
            .then(res => {
               localStorage.setItem('auth_token', res.data.token);

               let tempLocal = 'ru';

               if (res.data.user?.languageId == 1) {
                  tempLocal = 'ru';
               } else if (res.data.user?.languageId == 2) {
                  tempLocal = 'uz_cyrl';
               } else if (res.data.user?.languageId == 3) {
                  tempLocal = 'uz_latn';
               } else if (res.data.user?.languageId == 4) {
                  tempLocal = 'eng';
               }

               localStorage.setItem('locale', tempLocal);
               this.$i18n.locale = tempLocal;
               // this.$store.dispatch(
               //   "auth/setOrganizationtype",
               //   res.data.user.organizationtypeid
               // );
               localStorage.setItem('user_info', JSON.stringify(res.data.user));
               this.$store.dispatch('auth/login', res.data);
               ApiService.setHeader();
               this.Loading = false;
               this.$router.push('/');
            })
            .catch(error => {
               this.Loading = false;
               // console.log("AAA", error.response);
               this.makeToast(error.response.data.errors, 'danger');
            });
      },
      getLanguageId(id) {
         this.login.languageId = id;
      },
      validationForm() {
         this.$refs.loginValidation.validate().then(success => {
            if (success) {
               this.Loading = true;
               AccountService.Login(this.login)
                  .then(res => {
                     localStorage.setItem('auth_token', res.data.token);
                     let tempLocal = 'ru';
                     if (res.data.user?.languageId == 1) {
                        tempLocal = 'ru';
                     } else if (res.data.user?.languageId == 2) {
                        tempLocal = 'uz_cyrl';
                     } else if (res.data.user?.languageId == 3) {
                        tempLocal = 'uz_latn';
                     } else if (res.data.user?.languageId == 4) {
                        tempLocal = 'eng';
                     }
                     localStorage.setItem('locale', tempLocal);
                     this.$i18n.locale = tempLocal;
                     // this.$store.dispatch(
                     //   "auth/setOrganizationtype",
                     //   res.data.user.organizationtypeid
                     // );
                     localStorage.setItem('user_info', JSON.stringify(res.data.user));
                     this.$store.dispatch('auth/login', res.data);
                     ApiService.setHeader();
                     this.Loading = false;
                     this.$router.push('/');
                  })
                  .catch(error => {
                     this.Loading = false;

                     for (const key in error.response.data.errors) {
                        this.makeToast(error.response.data.errors[key][0], 'danger');
                     }
                  });
            }
         });
      },
      Sign() {
         this.$refs.loginValidation.validate().then(success => {
            if (success) {
               this.Loading = true;
               AccountService.Login(this.login)
                  .then(res => {
                     if (res.data.user) {
                        localStorage.setItem('user_info', JSON.stringify(res.data.user));
                        this.$store.dispatch('auth/login', res.data);
                     }
                     this.Loading = false;
                     this.$router.push('/');
                     // if (res.data.trusteddevice) {
                     //   this.$router.push("/");
                     // }
                     // if (!res.data.trusteddevice) {
                     //   this.sms.trusteddevice = true;
                     //   this.sms.phoneNumber = res.data.phoneNumber;
                     //   this.sms.smscode = "";
                     // }
                  })
                  .catch(error => {
                     this.makeToast(error.response.data.error, 'danger');
                     this.Loading = false;
                  });
            }
         });
      },
      SignTwoFactor() {
         if (this.sms.smscode === undefined || this.sms.smscode === null || this.sms.smscode === '') {
            this.makeToast(this.$t('SmsCodeNotCorrect'), 'danger');
            return false;
         }
         this.SignTwoFactorLoading = true;
         AccountService.SignInTwoFactor(this.sms)
            .then(res => {
               this.SignTwoFactorLoading = false;
               if (res.data.user) {
                  localStorage.setItem('user_info', JSON.stringify(res.data.user));
                  this.$store.dispatch('auth/login', res.data);
                  this.$router.push('/');
               }
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
               this.SignTwoFactorLoading = false;
            });
      }
   }
};
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.language-login {
   position: absolute;
   z-index: 5;
   right: 4rem;
   li {
      top: 2rem;
      list-style: none;
   }
}
.images-login {
   position: absolute;
   z-index: 1;
   top: 1rem;
   right: 27vw;
   li {
      top: 2rem;
      list-style: none;
   }
}
</style>
