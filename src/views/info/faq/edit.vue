<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.question" rules="required" :label="$t('question')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.answer" rules="required" :label="$t('answer')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <form-picker v-model="Data.dateOn" :label="'dateOn'" :placeholder="$t('docOn')"></form-picker>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="ApplicationClassificationList"
                     v-model="Data.applicationClassificationId"
                     :label="$t('applicationclassification')"
                  ></form-select>
               </b-col>

               <!-- <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.shortName" rules="required" :label="$t('shortname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('short_name')">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.fullName" rules="required" :label="$t('fullname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('full_name')">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>-->
            </b-row>

            <b-row class="mt-3">
               <b-col sm="12" md="6" lg="6" class="text-left"></b-col>
               <b-col sm="12" md="6" lg="6" class="text-right">
                  <b-button @click="SaveData" size="sm" variant="outline-success">
                     <feather-icon icon="CheckIcon"></feather-icon>
                     {{ $t("Save") }}
                  </b-button>
               </b-col>
            </b-row>
         </validation-observer>
      </b-card>
      <b-modal
         size="lg"
         :title="$t('Translates')"
         v-model="TranslateModal"
         hide-footer
         no-close-on-backdrop
      >
         <b-table
            :fields="TranslateFields"
            :items="TranslateItems"
            responsive="sm"
            striped
            bordered
            small
         >
            <template v-slot:thead-top>
               <b-tr>
                  <b-td>
                     <v-select
                        :options="LanguageList"
                        :reduce="(item) => item.value"
                        :placeholder="$t('ChooseBelow')"
                        label="text"
                        v-model="TranslateItem.languageId"
                        @input="ChangeTranslate"
                     ></v-select>
                  </b-td>
                  <b-td>
                     <b-form-input
                        :placeholder="$t('fullname')"
                        v-model="TranslateItem.translateText"
                     />
                  </b-td>
                  <b-td class="text-center">
                     <b-button variant="primary" @click="AddTranslate">
                        <feather-icon icon="PlusIcon"></feather-icon>
                     </b-button>
                  </b-td>
               </b-tr>
            </template>
            <template #cell(translateText)="{ item }">
               <b-form-input :placeholder="$t('fullname')" v-model="item.translateText" />
            </template>
         </b-table>
         <b-row>
            <b-col class="text-right">
               <b-button @click="TranslateModal = false" variant="success">{{ $t("Save") }}</b-button>
            </b-col>
         </b-row>
      </b-modal>
   </div>
</template>
<script>
import ManualService from '@/services/others/manual.service';
import FaqService from '@/services/info/faq.service';
import ApplicationClassificationService from '@/services/info/applicationclassification.service';

import {
   BOverlay,
   BCard,
   BCardBody,
   BRow,
   BCol,
   BFormInput,
   BTabs,
   BTab,
   BButton,
   BTable,
   BLink,
   BFormGroup,
   VBTooltip,
   BModal,
   VBModal,
   BCardText,
   BInputGroup,
   BInputGroupAppend,
   BTr,
   BTd,
   BFormCheckbox
} from 'bootstrap-vue';

export default {
   components: {
      BOverlay,
      BCard,
      BCardBody,
      BRow,
      BCol,
      BFormInput,
      BTabs,
      BTab,
      BButton,
      BTable,
      BLink,
      BFormGroup,
      VBTooltip,
      BModal,
      VBModal,
      BCardText,
      BInputGroup,
      BInputGroupAppend,
      BTr,
      BTd,
      BFormCheckbox
   },
   name: 'CreateOrUpdateRole',

   data() {
      return {
         lang: '',
         loadingButton: false,
         Data: {
            translates: [],
            person: {}
         },
         TranslateModal: false,
         TranslateFields: [
            {
               key: 'language',
               label: this.$t('languagename'),
               class: 'text-center'
            },
            {
               key: 'translateText',
               label: this.$t('translatetext'),
               class: 'text-center'
            },
            { key: 'actions', label: this.$t('actions'), thClass: 'text-center' }
         ],
         TranslateItem: {
            language: '',
            languageId: 0,
            columnName: '',
            translateText: ''
         },
         TranslateItems: [],
         LanguageList: [],
         ApplicationClassificationList: []
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      FaqService.Get(this.$route.params.id).then(res => {
         this.Data = res.data;
      });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ApplicationClassificationService.GetAsSelectList({ parentId: 0 })
         .then(res => {
            this.ApplicationClassificationList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      OpenTranslateModal(columnname) {
         this.TranslateModal = true;
         this.GetTranslateItems(columnname);
         this.clearLangTable(columnname);
      },
      GetTranslateItems(columnname) {
         this.TranslateItems = this.Data.translates.filter(item => item.columnName == columnname);
      },
      ChangeTranslate() {
         this.TranslateItem.language = !!this.TranslateItem.languageId ? this.LanguageList.filter(item => item.value == this.TranslateItem.languageId)[0].text : '';
      },
      clearLangTable(columnname) {
         this.TranslateItem = {
            language: '',
            languageId: 0,
            columnName: columnname,
            translateText: ''
         };
      },
      AddTranslate() {
         if (this.TranslateItem.languageId === null || this.TranslateItem.languageId === undefined || this.TranslateItem.languageId === 0 || this.TranslateItem.languageId === '') {
            this.makeToast(this.$t('notSelectLang'), 'danger');
            return false;
         }
         if (this.Data.translates.filter(item => item.languageId === this.TranslateItem.languageId && item.columnName == this.TranslateItem.columnName).length > 0) {
            this.makeToast(this.$t('AlreadySelectLang'), 'danger');
            return false;
         }
         this.Data.translates.push(this.TranslateItem);
         this.GetTranslateItems(this.TranslateItem.columnName);
         this.clearLangTable(this.TranslateItem.columnName);
      },
      backToList() {
         this.$router.push({ name: 'role' });
      },
      SaveData() {
         this.$refs.ValidationDTO.validate().then(success => {
            if (success) {
               this.loadingButton = true;
               FaqService.Update(this.Data)
                  .then(res => {
                     this.makeToast(this.$t('SaveSuccess'), 'success');
                     this.$router.push({ name: 'Faq' });
                  })
                  .catch(err => {
                     this.makeToast(this.$t(err), 'danger');
                  });
            }
         });
      }
   }
};
</script>