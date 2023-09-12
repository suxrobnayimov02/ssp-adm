<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.code" required :label="$t('code')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.shortName" required :label="$t('shortname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('short_name', 1)">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.fullName" required :label="$t('fullname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('full_name', 1)">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>
            </b-row>
         </validation-observer>
         <b-row>
            <b-col class="text-right mt-2">
               <b-button @click="OpenTabrow" size="sm" variant="outline-primary">
                  <feather-icon icon="PlusIcon"></feather-icon>
                  {{ $t('Add') }}
               </b-button>
            </b-col>
         </b-row>
         <b-row class="mt-2">
            <b-col>
               <b-table
                  :fields="TablesField"
                  bordered
                  small
                  responsive
                  :items="Data.values"
                  hover
                  show-empty
                  :empty-text="$t('NotFound')"
               >
                  <template #cell(actions)="{ item, index }">
                     <div class="text-center">
                        <b-link>
                           <feather-icon
                              style="margin-right: 5px"
                              @click="EditTabrow(item)"
                              icon="EditIcon"
                           ></feather-icon>
                        </b-link>
                        <b-link class="text-danger">
                           <feather-icon @click="DeleteTabrow(index)" icon="Trash2Icon"></feather-icon>
                        </b-link>
                     </div>
                  </template>
                  <template #cell(order)="{ index }">
                     <span>{{ index + 1 }}</span>
                  </template>
               </b-table>
            </b-col>
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
      </b-card>

      <b-modal size="xl" v-model="TabrowModal" no-close-on-backdrop hide-footer>
         <validation-observer ref="ValidationTabrow">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="tabrow.code" :label="$t('code')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="tabrow.shortName" required :label="$t('shortname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('short_name', 2)">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="tabrow.fullName" required :label="$t('fullname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('full_name', 2)">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="StateList"
                     v-model="tabrow.stateId"
                     required-star
                     :label="$t('Status')"
                  ></form-select>
               </b-col>
            </b-row>
         </validation-observer>
         <b-row>
            <b-col class="text-center mt-1">
               <b-button
                  variant="outline-danger"
                  @click="TabrowModal = false"
                  class="mr-1"
                  size="sm"
               >
                  <feather-icon icon="ArrowLeftIcon"></feather-icon>
                  {{ $t('back') }}
               </b-button>
               <b-button variant="outline-success" @click="AddTabrow" size="sm">
                  <feather-icon icon="CheckIcon"></feather-icon>
                  {{ $t('Save') }}
               </b-button>
            </b-col>
         </b-row>
      </b-modal>

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
import FctrlFormControlService from '@/services/info/fctrlformcontrol.service';
import FctrlFormControlRefService from '@/services/info/fctrlformcontrolref.service';
import FctrlManualService from '@/services/others/fctrlmanual.service';

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

const defaultTableRow = {
   id: 0,
   stateId: null,
   state: '',
   code: '',
   shortName: '',
   fullName: '',
   translates: []
};

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
   name: 'Edit',

   data() {
      return {
         lang: '',
         loadingButton: false,
         Data: {
            translates: [],
            rules: []
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
         TablesField: [
            {
               key: 'code',
               label: this.$t('code'),
               sortable: true
            },
            {
               key: 'fullName',
               label: this.$t('fullname'),
               sortable: true
            },
            {
               key: 'shortName',
               label: this.$t('shortname'),
               sortable: true
            },

            {
               key: 'state',
               label: this.$t('state'),
               sortable: true
            },
            {
               key: 'actions',
               label: this.$t('actions'),
               sortable: true
            }
         ],
         TranslateItem: {
            language: '',
            languageId: 0,
            columnName: '',
            translateText: ''
         },
         TranslateItems: [],
         LanguageList: [],
         StateList: [],
         TabrowModal: false,
         editedIndex1: -1,
         tabrow: { ...defaultTableRow },
         type: null
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      FctrlFormControlRefService.Get(this.$route.params.id).then(res => {
         this.Data = res.data;
      });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
      ManualService.StateSelectList()
         .then(res => {
            this.StateList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      OpenTranslateModal(columnname, type) {
         this.type = type;
         this.TranslateModal = true;
         this.GetTranslateItems(columnname);
         this.clearLangTable(columnname);
      },
      GetTranslateItems(columnname) {
         this.TranslateItems = this.type == 1 ? this.Data.translates.filter(item => item.columnName == columnname) : this.tabrow.translates.filter(item => item.columnName == columnname);
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

         if (this.type == 1) {
            if (this.Data.translates.filter(item => item.languageId === this.TranslateItem.languageId && item.columnName == this.TranslateItem.columnName).length > 0) {
               this.makeToast(this.$t('AlreadySelectLang'), 'danger');
               return false;
            }
            this.Data.translates.push(this.TranslateItem);
         } else {
            if (this.tabrow.translates.filter(item => item.languageId === this.TranslateItem.languageId && item.columnName == this.TranslateItem.columnName).length > 0) {
               this.makeToast(this.$t('AlreadySelectLang'), 'danger');
               return false;
            }
            this.tabrow.translates.push(this.TranslateItem);
         }

         this.GetTranslateItems(this.TranslateItem.columnName);
         this.clearLangTable(this.TranslateItem.columnName);
      },

      backToList() {
         this.$router.push({ name: 'role' });
      },
      checkValid() {
         let valid = false;
         if (this.Data.shortName !== '' && this.Data.shortName !== null) {
            valid = true;
         } else {
            valid = false;
         }
         return valid;
      },
      DeleteTabrow(index) {
         this.Data.values.splice(index, 1);
      },
      OpenTabrow() {
         this.TabrowModal = true;
         this.tabrow = { ...defaultTableRow };
         this.editedIndex1 = -1;
      },
      EditTabrow(item) {
         this.editedIndex1 = this.Data.values.indexOf(item);
         this.tabrow = Object.assign({}, item);
         this.TabrowModal = true;
      },
      AddTabrow() {
         this.$refs.ValidationTabrow.validate().then(success => {
            if (success) {
               if (this.tabrow.stateId) {
                  this.tabrow.state = this.StateList.find(e => e.value == this.tabrow.stateId)?.text;
               }

               if (this.editedIndex1 > -1) {
                  Object.assign(this.Data.values[this.editedIndex1], this.tabrow);
               } else {
                  this.Data.values.push(this.tabrow);
               }
               this.TabrowModal = false;
            }
         });
      },
      SaveData() {
         this.loadingButton = true;
         if (this.checkValid()) {
            FctrlFormControlRefService.Update(this.Data)
               .then(res => {
                  this.makeToast(this.$t('SaveSuccess'), 'success');
                  this.$router.push({ name: 'FctrlFormControlRef' });
               })
               .catch(err => {
                  this.makeToast(this.$t(err), 'danger');
               });
         }
      }
   }
};
</script>
<style scoped>
</style>