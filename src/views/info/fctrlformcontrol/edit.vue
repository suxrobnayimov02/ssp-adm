<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="3">
                  <form-select
                     :options="FormControlTypeList"
                     v-model="Data.formControlTypeId"
                     required-star
                     :label="$t('formControlType')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.code" required :label="$t('code')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.shortName" required :label="$t('shortname')">
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
                     <form-input v-model="Data.fullName" required :label="$t('fullname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('full_name')">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>

               <b-col sm="12" md="3" v-if="false">
                  <div class="form-group">
                     <form-input v-model="Data.precision" type="number" :label="$t('precision')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3" v-if="false">
                  <div class="form-group">
                     <form-input v-model="Data.scale" type="number" :label="$t('scale')" />
                  </div>
               </b-col>

               <b-col
                  sm="12"
                  md="3"
                  v-if="Data.formControlTypeId == 1 || Data.formControlTypeId == 2 || Data.formControlTypeId == 6"
               >
                  <div class="form-group">
                     <form-input v-model="Data.length" type="number" :label="$t('length')" />
                  </div>
               </b-col>

               <b-col
                  sm="12"
                  md="3"
                  v-if="Data.formControlTypeId == 1 || Data.formControlTypeId == 2 || Data.formControlTypeId == 6"
               >
                  <div class="form-group">
                     <form-input v-model="Data.regex" :label="$t('regex')" />
                  </div>
               </b-col>

               <b-col
                  sm="12"
                  md="3"
                  v-if="Data.formControlTypeId == 1 || Data.formControlTypeId == 2 "
               >
                  <div class="form-group">
                     <form-input v-model="Data.mask" :label="$t('mask')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3" v-if="Data.formControlTypeId == 9">
                  <div class="form-group">
                     <form-select
                        :options="FormControlRefList"
                        required-star
                        :label="$t('formControlRef')"
                        :cslot="true"
                        @input="SelectRef"
                        v-model="TempFctrlFormControl"
                     ></form-select>
                  </div>
               </b-col>

               <b-col
                  sm="12"
                  md="3"
                  v-if="Data.formControlTypeId == 1 || 
                        Data.formControlTypeId == 2 || 
                        Data.formControlTypeId == 3 || 
                        Data.formControlTypeId == 4 || 
                        Data.formControlTypeId == 5 || 
                        Data.formControlTypeId == 6 || 
                        Data.formControlTypeId == 7 ||
                        Data.formControlTypeId == 8 ||
                        Data.formControlTypeId == 9"
               >
                  <div class="form-group" v-if="Data.formControlTypeId == 1">
                     <form-input v-model="Data.defaultValue" :label="$t('defaultValue')" />
                  </div>

                  <div class="form-group" v-if="Data.formControlTypeId == 2">
                     <form-input
                        v-model="Data.defaultValue"
                        type="number"
                        :label="$t('defaultValue')"
                     />
                  </div>

                  <div class="form-group" v-if="Data.formControlTypeId == 3">
                     <form-picker
                        v-model="Data.defaultValue"
                        required
                        :label="$t('defaultValue')"
                        :placeholder="$t('defaultValue')"
                     ></form-picker>
                  </div>

                  <div class="form-group" v-if="Data.formControlTypeId == 4">
                     <form-picker
                        v-model="Data.defaultValue"
                        required
                        type="time"
                        format="HH:mm"
                        :label="$t('defaultValue')"
                        :placeholder="$t('defaultValue')"
                     ></form-picker>
                  </div>

                  <div class="form-group" v-if="Data.formControlTypeId == 5">
                     <form-picker
                        v-model="Data.defaultValue"
                        required
                        type="datetime"
                        format="DD.MM.YYYY HH:mm"
                        :label="$t('defaultValue')"
                        :placeholder="$t('defaultValue')"
                     ></form-picker>
                  </div>

                  <div class="form-group" v-if="Data.formControlTypeId == 6">
                     <form-input
                        v-model="Data.defaultValue"
                        type="password"
                        autocomplete="new-password"
                        :label="$t('defaultValue')"
                     />
                  </div>
                  <div class="form-group" v-if="Data.formControlTypeId == 7">
                     <div>
                        <input
                           v-model="Data.defaultValue"
                           type="radio"
                           value="yes"
                           name="defaultValue"
                        /> yes
                     </div>
                     <div>
                        <input
                           v-model="Data.defaultValue"
                           type="radio"
                           value="no"
                           name="defaultValue"
                        /> no
                     </div>
                  </div>
                  <div class="form-group" v-if="Data.formControlTypeId == 8">
                     <label for>
                        {{ $t('defaultValue') }}
                        <!-- <span v-show="required" style="color: red">*</span> -->
                     </label>
                     <br />
                     <b-form-checkbox v-model="Data.defaultValue" inline />
                  </div>

                  <div class="form-group" v-if="Data.formControlTypeId == 9">
                     <form-select
                        :options="DefaultValueList"
                        v-model="Data.defaultValue"
                        :label="$t('defaultValue')"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="2" class="mt-2">
                  <div class="form-group">
                     <b-form-checkbox v-model="Data.isRequired">{{ $t('isRequired') }}</b-form-checkbox>
                  </div>
               </b-col>

               <b-col sm="12" md="2" class="mt-2" v-if="Data.formControlTypeId == 9">
                  <div class="form-group">
                     <b-form-checkbox v-model="Data.isMultiple">{{ $t('isMultiple') }}</b-form-checkbox>
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
                  :items="Data.rules"
                  hover
                  show-empty
                  :empty-text="$t('NotFound')"
               >
                  <template #cell(action)="{ item, index }">
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
                     <form-input v-model="tabrow.orderNumber" :label="$t('code')" />
                  </div>
               </b-col>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-select
                        :options="FormControlList"
                        v-model="tabrow.formControlId"
                        :label="$t('formControl')"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-select
                        :options="RuleModeList"
                        v-model="tabrow.ruleModeId"
                        :label="$t('ruleMode')"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-select
                        :options="RuleTypeList"
                        v-model="tabrow.ruleTypeId"
                        :label="$t('ruleType')"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="tabrow.formControlValue" :label="$t('formControlValue')" />
                  </div>
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
         :title="$t('fctrlformcontrol')"
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
   orderNumber: null,
   formControlId: null,
   formControl: '',
   ruleModeId: null,
   ruleMode: '',
   ruleTypeId: null,
   ruleType: '',
   formControlValue: ''
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
         TempFctrlFormControl: null,
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
            { key: 'action', label: this.$t('actions'), thClass: 'text-center' }
         ],
         TablesField: [
            {
               key: 'orderNumber',
               label: this.$t('code'),
               sortable: true
            },
            {
               key: 'formControl',
               label: this.$t('formControl'),
               sortable: true
            },
            {
               key: 'ruleMode',
               label: this.$t('ruleMode'),
               sortable: true
            },
            {
               key: 'ruleType',
               label: this.$t('ruleType'),
               sortable: true
            },
            {
               key: 'formControlValue',
               label: this.$t('formControlValue'),
               sortable: true
            },
            {
               key: 'action',
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
         FormControlTypeList: [],
         FormControlRefList: [],
         FormControlList: [],
         RuleModeList: [],
         RuleTypeList: [],
         DefaultValueList: [],
         TabrowModal: false,
         editedIndex1: -1,
         tabrow: { ...defaultTableRow }
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      FctrlFormControlService.Get(this.$route.params.id).then(res => {
         this.Data = res.data;
      });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      FctrlManualService.EmploymentTypeSelectList()
         .then(res => {
            this.FormControlTypeList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      FctrlFormControlRefService.GetAsSelectList()
         .then(res => {
            this.FormControlRefList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      SelectRef() {
         const tempFct = this.FormControlRefList.filter(item => item.value == this.TempFctrlFormControl)[0];

         console.log('AA', tempFct);
         if (tempFct.isSystemTable) {
            this.Data.refTableId = tempFct.value;
            this.GetDefaultList(tempFct.value);
            this.Data.formControlRefId = null;
         } else {
            this.Data.formControlRefId = tempFct.value;
            this.GetDefaultList(tempFct.value);
            this.Data.refTableId = null;
         }
      },

      GetDefaultList(id) {
         FctrlFormControlRefService.GetSysReferenceValues(id)
            .then(res => {
               this.DefaultValueList = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });
      },
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
         this.Data.rules.splice(index, 1);
      },
      OpenTabrow() {
         FctrlFormControlService.GetAsSelectList()
            .then(res => {
               this.FormControlList = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });

         FctrlManualService.FormControlRuleModeSelectList()
            .then(res => {
               this.RuleModeList = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });

         FctrlManualService.FormControlRuleTypeSelectList()
            .then(res => {
               this.RuleTypeList = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });

         this.TabrowModal = true;
         this.tabrow = { ...defaultTableRow };
         this.editedIndex1 = -1;
      },
      EditTabrow(item) {
         this.editedIndex1 = this.Data.rules.indexOf(item);
         this.tabrow = Object.assign({}, item);
         this.TabrowModal = true;
      },
      AddTabrow() {
         this.$refs.ValidationTabrow.validate().then(success => {
            if (success) {
               if (this.tabrow.ruleModeId) {
                  this.tabrow.ruleMode = this.RuleModeList.find(e => e.value == this.tabrow.ruleModeId)?.text;
               }
               if (this.tabrow.ruleTypeId) {
                  this.tabrow.ruleType = this.RuleTypeList.find(e => e.value == this.tabrow.ruleTypeId)?.text;
               }
               if (this.tabrow.formControlId) {
                  this.tabrow.formControl = this.FormControlList.find(e => e.value == this.tabrow.formControlId)?.text;
               }

               if (this.editedIndex1 > -1) {
                  Object.assign(this.Data.rules[this.editedIndex1], this.tabrow);
               } else {
                  this.Data.rules.push(this.tabrow);
               }
               this.TabrowModal = false;
            }
         });
      },
      SaveData() {
         this.loadingButton = true;
         if (this.checkValid()) {
            FctrlFormControlService.Update(this.Data)
               .then(res => {
                  this.makeToast(this.$t('SaveSuccess'), 'success');
                  this.$router.push({ name: 'FctrlFormControl' });
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