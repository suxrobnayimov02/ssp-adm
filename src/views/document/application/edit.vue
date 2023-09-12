<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input
                        v-model="Data.contractorInn"
                        :label="$t('contractorInn')"
                        :mask="'#########'"
                        :disabled="$route.params.id != 0"
                     >
                        <b-input-group-append>
                           <b-button
                              variant="primary"
                              @click="GetByInn"
                              :disabled="$route.params.id != 0"
                           >
                              <feather-icon icon="SearchIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <form-input v-model="Data.contractor" :label="$t('contractor')" disabled />
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     disabled
                     :options="ApplicationFormingTypeList"
                     v-model="Data.applicationFormingTypeId"
                     :label="$t('applicationFormingType')"
                  ></form-select>
               </b-col>
            </b-row>
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.docNumber" :label="$t('docnumber')" />
                  </div>
               </b-col>
               <b-col sm="12" md="3">
                  <form-picker
                     v-model="Data.docOn"
                     rules="required"
                     :label="$t('docOn')"
                     :placeholder="$t('docOn')"
                  ></form-picker>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="BusinessSectorList"
                     v-model="Data.businessSectorId"
                     :label="$t('businessSector')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="ApplicationTypeList"
                     v-model="Data.applicationTypeId"
                     :label="$t('applicationType')"
                  ></form-select>
               </b-col>
            </b-row>

            <div v-if="loadingApp">
               <div>
                  <b-spinner variant="primary" />
               </div>
            </div>

            <div class="btn-items__content" v-else>
               <template v-for="(value, propertyName, index) in ApplicationClassificationList">
                  <div
                     class="btn-items"
                     :key="index + Number(propertyName) + 'ajk'"
                     v-if="ApplicationClassificationList[propertyName].length > 0"
                  >
                     <div
                        class="btn-item"
                        v-for="AppItem in value"
                        :key="AppItem.value + 'ui'"
                        @click="GetApplicationClassificationChild(AppItem, propertyName)"
                        :class="{active: AppItem.isChecked}"
                     >
                        <!-- <pre>

                        {{ AppItem }}
                        </pre>-->
                        <div class="btn-item__text">{{ AppItem.text }}</div>
                        <div
                           class="btn-item__count"
                           v-if="AppItem.childCount"
                        >{{ AppItem.childCount }}</div>
                     </div>
                  </div>
               </template>
            </div>

            <b-row v-if="FormControlList.length > 0">
               <template v-for="(ITEM, idx) in FormControlList">
                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 1"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-input
                           v-model="ITEM.info.defaultValue"
                           :label="ITEM.formControl"
                           :required="ITEM.info.formControlTypeId.isRequired"
                        />
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 2"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-input
                           v-model="ITEM.info.defaultValue"
                           type="number"
                           :label="ITEM.formControl"
                           :required="ITEM.info.formControlTypeId.isRequired"
                        />
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 3"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-picker
                           v-model="ITEM.info.defaultValue"
                           :required="ITEM.info.formControlTypeId.isRequired"
                           :label="ITEM.formControl"
                        ></form-picker>
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 4"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-picker
                           v-model="ITEM.info.defaultValue"
                           :required="ITEM.info.formControlTypeId.isRequired"
                           type="time"
                           format="HH:mm"
                           :label="ITEM.formControl"
                        ></form-picker>
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 5"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-picker
                           v-model="ITEM.info.defaultValue"
                           :required="ITEM.info.formControlTypeId.isRequired"
                           type="datetime"
                           format="DD.MM.YYYY HH:mm"
                           :label="ITEM.formControl"
                        ></form-picker>
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 6"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-input
                           v-model="ITEM.info.defaultValue"
                           type="password"
                           autocomplete="new-password"
                           :label="ITEM.formControl"
                           :required="ITEM.info.formControlTypeId.isRequired"
                        />
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 7"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <div>
                           <input
                              v-model="ITEM.info.defaultValue"
                              type="radio"
                              value="yes"
                              name="defaultValue"
                           /> yes
                        </div>
                        <div>
                           <input
                              v-model="ITEM.info.defaultValue"
                              type="radio"
                              value="no"
                              name="defaultValue"
                           /> no
                        </div>
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 8"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <label for>{{ ITEM.formControl }}</label>
                        <br />

                        <b-form-checkbox v-model="ITEM.info.defaultValue" inline />
                     </div>
                  </b-col>

                  <b-col
                     sm="12"
                     md="3"
                     v-if="ITEM.info.formControlTypeId == 9"
                     :key="ITEM.formControl + idx"
                  >
                     <div class="form-group">
                        <form-select
                           :options="ITEM.values"
                           v-model="ITEM.info.defaultValue"
                           :label="ITEM.formControl"
                           :required-star="ITEM.info.formControlTypeId.isRequired"
                           :multiple="ITEM.info.formControlTypeId.isMultiple"
                        ></form-select>
                     </div>
                  </b-col>
               </template>
            </b-row>

            <b-row>
               <b-col sm="12" md="12">
                  <b-form-textarea
                     id="textarea"
                     v-model="Data.detail"
                     :placeholder="$t('detail')"
                     rows="3"
                     max-rows="6"
                  ></b-form-textarea>
               </b-col>
            </b-row>
         </validation-observer>

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
// import FctrlFormControlService from '@/services/info/fctrlformcontrol.service';
// import FctrlFormControlRefService from '@/services/info/fctrlformcontrolref.service';
// import FctrlManualService from '@/services/others/fctrlmanual.service';
import ApplicationService from '@/services/document/application.service';
import ApplicationClassificationService from '@/services/info/applicationclassification.service';
import ContractorService from '@/services/info/contractor.service';

import {
   BSpinner,
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
   BFormCheckbox,
   BFormTextarea
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
      BSpinner,
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
      BFormCheckbox,
      BFormTextarea
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
            { key: 'action', label: this.$t('actions'), thClass: 'text-center' }
         ],

         TranslateItem: {
            language: '',
            languageId: 0,
            columnName: '',
            translateText: ''
         },
         TranslateItems: [],
         LanguageList: [],
         ApplicationTypeList: [],
         ApplicationFormingTypeList: [],
         ApplicationClassificationList: {},
         ContractorList: [],
         FormControlList: [],
         BusinessSectorList: [],

         TabrowModal: false,
         editedIndex1: -1,
         tabrow: { ...defaultTableRow },
         loadingApp: false
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      ApplicationService.Get(this.$route.params.id, this.$route.query.applicationFormingTypeId).then(res => {
         this.Data = res.data;

         if (this.$route.params.id != 0) {
            this.GetForMap(res.data.applicationClassificationId);

            ApplicationClassificationService.GetInfo(res.data.applicationClassificationId)
               .then(result => {
                  // const tempTables = result.data.infoTables;
                  // res.data.properties.map((item, idx) => {
                  //    console.log('AAAAAAAA', tempTables[idx]);
                  //    // tempTables[idx].info.defaultValue = item.value;
                  // });
                  this.FormControlList = result.data.infoTables;
                  this.loadingApp = false;
               })
               .catch(error => {
                  this.makeToast(error.response.data.error, 'danger');
                  this.loadingApp = false;
               });
         }
      });

      this.loadingApp = true;
      ApplicationClassificationService.GetAsSelectList({ parentId: 0 })
         .then(res => {
            this.ApplicationClassificationList['1'] = res.data;
            this.loadingApp = false;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
            this.loadingApp = false;
         });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ManualService.BusinessSectorSelectList()
         .then(res => {
            this.BusinessSectorList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ManualService.ApplicationTypeSelectList()
         .then(res => {
            this.ApplicationTypeList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ManualService.ApplicationFormingTypeSelectList()
         .then(res => {
            this.ApplicationFormingTypeList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      GetForMap(id) {
         ApplicationClassificationService.GetForMap(id)
            .then(res => {
               console.log('AA', res);
               this.ApplicationClassificationList = res.data.items;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });
      },
      GetByInn() {
         ContractorService.SelectContractor(this.Data.contractorInn)
            .then(res => {
               // console.log('AAA', res);
               this.Data.contractorId = res.data.id;
               this.Data.contractor = res.data.fullName;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });
      },
      GetApplicationClassificationChild(item, index) {
         Object.keys(this.ApplicationClassificationList).forEach(key => {
            if (key > index) {
               delete this.ApplicationClassificationList[key];
            }
         });

         this.ApplicationClassificationList[index].forEach(data => {
            if (data.value == item.value) {
               data.isChecked = true;
            } else {
               data.isChecked = false;
            }
         });

         this.loadingApp = true;
         if (item.isGroup) {
            ApplicationClassificationService.GetAsSelectList({ parentId: item.value })
               .then(res => {
                  this.ApplicationClassificationList[Number(index) + 1] = res.data;
                  this.loadingApp = false;
               })
               .catch(error => {
                  this.makeToast(error.response.data.error, 'danger');
                  this.loadingApp = false;
               });
         } else {
            this.Data.applicationClassificationId = item.value;

            ApplicationClassificationService.GetInfo(item.value)
               .then(res => {
                  this.FormControlList = res.data.infoTables;
                  this.loadingApp = false;
               })
               .catch(error => {
                  this.makeToast(error.response.data.error, 'danger');
                  this.loadingApp = false;
               });
         }
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

      SaveData() {
         this.loadingButton = true;

         const tempPropertis = [];

         this.FormControlList.map(item => {
            const tempObj = {
               id: 0,
               formControlId: item.formControlId,
               value: item.info.defaultValue
            };
            tempPropertis.push(tempObj);
         });

         this.Data.properties = tempPropertis;
         if (this.checkValid()) {
            ApplicationService.Update(this.Data)
               .then(res => {
                  this.makeToast(this.$t('SaveSuccess'), 'success');
                  this.$router.push({ name: 'Application' });
               })
               .catch(err => {
                  this.makeToast(this.$t(err), 'danger');
               });
         }
      }
   }
};
</script>
<style lang="scss">
.btn-items__content {
   overflow: hidden;
   // border: 1px solid red;
}
.btn-items {
   display: flex;
   overflow-x: scroll;
   padding-bottom: 1rem;
}
.btn-item {
   border: 2px solid #d8d6de;
   border-radius: 27px;
   padding: 15px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: all 0.3s ease-in-out;
   margin-right: 1rem;
   width: 300px !important;
   min-width: fit-content;
   &:last-child {
      margin-right: 0;
   }

   &__count {
      background-color: #d8d6de;
      color: #fff;
      border-radius: 50%;
      padding: 2px 10px;
      transition: all 0.3s ease-in-out;
      margin-left: 1rem;
   }

   &:hover {
      border-color: #246bfd;
      cursor: pointer;
      color: #6e6b7b;
      .btn-item__count {
         background-color: #246bfd;
      }
   }
}
.btn-item.active {
   border-color: #246bfd;
   color: #6e6b7b;
   .btn-item__count {
      background-color: #246bfd;
   }
}
</style>