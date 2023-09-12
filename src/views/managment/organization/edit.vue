<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input
                        v-model="Data.inn"
                        :label="$t('inn')"
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
                  <div class="form-group">
                     <!-- <WInput rules="required" :label="$t('contractorInn')" placeholder disabled v-model="Data.contractorInn" /> -->
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
               </b-col>

               <div class="w-100"></div>

               <b-col sm="12" md="3">
                  <form-select
                     :options="CountryList"
                     v-model="Data.countryId"
                     rules="required"
                     :label="$t('Country')"
                     @input="ChangeCountry"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="RegionList"
                     v-model="Data.regionId"
                     rules="required"
                     :label="$t('region')"
                     @input="ChangeRegion"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="DistrictList"
                     v-model="Data.districtId"
                     rules="required"
                     :label="$t('Region')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.address" :label="$t('address')" />
                  </div>
               </b-col>

               <b-col sm="12" md="12">
                  <form-select
                     :options="OkedList"
                     v-model="Data.okedId"
                     rules="required"
                     :label="$t('Oked')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.director" :label="$t('Director')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.accounter" :label="$t('Accounter')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input
                        v-model="Data.phoneNumber"
                        :label="$t('phoneNumber')"
                        :mask="'(998) ## ### ## ##'"
                     />
                  </div>
               </b-col>

               <b-col sm="12" md="12">
                  <form-select
                     :options="ParentList"
                     v-model="Data.parentId"
                     :label="$t('OrgParent')"
                  ></form-select>
               </b-col>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.vatCode" :label="$t('vatCode')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.zipCode" :label="$t('zipCode')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="OrganizationLegalFormList"
                     v-model="Data.organizationLegalFormId"
                     :label="$t('OrganizationLegalForm')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="3">
                  <form-select
                     :options="SignOrganizationTypeList"
                     v-model="Data.signOrganizationTypeId"
                     :label="$t('signOrganizationType')"
                     @input="ChangeSignOrganizationType"
                  ></form-select>
               </b-col>
            </b-row>

            <b-row v-show="!!Data.signOrganizationTypeId">
               <b-col md="12">
                  <div>
                     <div class="mx-1 tabheader btn-group-pills mb-2" style="float: left">
                        <button
                           type="button"
                           @click="activeTab = 'signs'"
                           :class="
                    activeTab === 'signs' ? 'btn btn-primary active' : 'btn'
                  "
                        >{{ $t("signs") }}</button>
                        <button
                           type="button"
                           :class="
                    activeTab === 'expiredSigns'
                      ? 'btn btn-primary active'
                      : 'btn'
                  "
                           @click="activeTab = 'expiredSigns'"
                        >{{ $t("expiredSigns") }}</button>
                     </div>
                     <b-button
                        class="mt-1"
                        style="float: right"
                        @click="OpenModal"
                        v-show="!!Data.signOrganizationTypeId"
                        size="sm"
                        variant="outline-primary"
                     >
                        <feather-icon icon="PlusIcon"></feather-icon>
                        {{ $t("Add") }}
                     </b-button>
                  </div>

                  <b-table
                     style="vertical-align: middle"
                     :fields="fields"
                     :items="activeTab === 'signs' ? Data.signs : Data.expiredSigns"
                     class="bg-color-table text-center"
                     bordered
                     :responsive="true"
                     :tbody-tr-class="rowClass"
                  >
                     <template #cell(user)="{ item }">
                        {{
                        `${item.lastName} ${item.firstName} ${item.middleName}`
                        }}
                     </template>
                     <template #cell(expireOn)="{ item }" v-if="activeTab === 'signs'">
                        <custom-date-picker
                           @keyup="BindValue($event, item)"
                           style="margin-top: 5px"
                           v-model="item.expireOn"
                           format="DD.MM.YYYY"
                           type="date"
                           :clearable="false"
                           :placeholder="$t('expireOn')"
                        ></custom-date-picker>
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
         </validation-observer>
      </b-card>

      <b-modal
         v-model="TableModal"
         size="xl"
         no-close-on-backdrop
         hide-footer
         :title="$t('organization')"
      >
         <validation-observer ref="ValidationTabrow">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input
                        v-model="filter.Seria"
                        :label="$t('Seria')"
                        :mask="'AA'"
                        rules="required"
                        @input="(val) => (filter.Seria = filter.Seria.toUpperCase())"
                     />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input
                        v-model="filter.Number"
                        :mask="'#######'"
                        :label="$t('passportNumber')"
                        rules="required"
                     />
                  </div>
               </b-col>
               <b-col sm="12" md="3" class="text-left" style="margin-top: -5px">
                  <form-picker
                     v-model="filter.DateOfBirth"
                     :label="$t('dateofbirth')"
                     required
                     :placeholder="$t('dateofbirth')"
                  ></form-picker>
               </b-col>
               <b-col sm="12" md="3" class="text-left mt-2">
                  <b-button @click="GetPerson" variant="primary">
                     {{
                     $t("search")
                     }}
                  </b-button>
               </b-col>
            </b-row>
         </validation-observer>

         <b-row v-show="!!TempPerson.pinfl" class="mb-2 mt-2">
            <b-col sm="12" md="12" class="text-left">
               <h3>
                  {{
                  `${TempPerson.surnameLatin} ${TempPerson.nameLatin} ${TempPerson.patronymLatin}`
                  }}
               </h3>
            </b-col>
            <b-col sm="12" md="6" class="text-left">
               <b-list-group>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("dateofbirth") }}</b>
                        <span>{{ TempPerson.birthDate }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("nationality") }}</b>
                        <span>{{ TempPerson.nationality }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("gender") }}</b>
                        <span>{{ TempPerson.gender }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("Oblast") }}</b>
                        <span>{{ TempPerson.livingRegion }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("Region") }}</b>
                        <span>{{ TempPerson.livingDistrict }}</span>
                     </div>
                  </b-list-group-item>
               </b-list-group>
            </b-col>

            <b-col sm="12" md="6" class="text-left">
               <b-list-group>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("Seria") }}</b>
                        <span>{{ TempPerson.passportSeria }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("passportNumber") }}</b>
                        <span>{{ TempPerson.passportNumber }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("passportDate") }}</b>
                        <span>{{ TempPerson.passportDate }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("passportExpiration") }}</b>
                        <span>{{ TempPerson.passportExpiration }}</span>
                     </div>
                  </b-list-group-item>

                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("pinfl") }}</b>
                        <span>{{ TempPerson.pinfl }}</span>
                     </div>
                  </b-list-group-item>
               </b-list-group>
            </b-col>
         </b-row>
         <validation-observer ref="ValidationTabrow2">
            <b-row>
               <b-col sm="12" md="3">
                  <form-select
                     :options="TempSigns"
                     v-model="tabrow.prtnContractTypeTableId"
                     rules="required"
                     :label="$t('position')"
                  ></form-select>
               </b-col>
               <!-- <b-col sm="12" md="4">
          <label for>{{ $t("position") }}</label>
          <v-select
            :options="TempSigns"
            :reduce="(item) => item.value"
            :placeholder="$t('ChooseBelow')"
            label="text"
            v-model="tabrow.prtnContractTypeTableId"
          ></v-select>
               </b-col>-->
            </b-row>
         </validation-observer>

         <b-row class="mt-3">
            <b-col class="text-center">
               <b-button
                  class="mr-2"
                  @click="TableModal = false"
                  size="sm"
                  variant="outline-danger"
               >
                  <feather-icon icon="ArrowLeftIcon"></feather-icon>
                  {{ $t("back") }}
               </b-button>
               <b-button @click="AddRow" size="sm" variant="outline-success">
                  <feather-icon icon="CheckIcon"></feather-icon>
                  {{ $t("Save") }}
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
               <b-button @click="TranslateModal = false" variant="success">
                  {{
                  $t("Save")
                  }}
               </b-button>
            </b-col>
         </b-row>
      </b-modal>
   </div>
</template>
<script>
import ManualService from '@/services/others/manual.service';
import OrganizationService from '@/services/managment/organization.service';
import CountryService from '@/services/info/country.service';
import OkedService from '@/services/info/oked.service';
import RegionService from '@/services/info/region.service';
import OrganizationLegalFormService from '@/services/info/organizationlegalform.service';
import DistrictService from '@/services/info/district.service';
import PrtnContractTypeService from '@/services/info/prtncontracttype.service';
import CustomDatePicker from '@/views/components/customDatePicker.vue';
import EmployeeService from '@/services/info/employee.service';

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
   BFormCheckbox,
   BListGroup,
   BListGroupItem
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
      BModal,
      VBModal,
      BCardText,
      BInputGroup,
      BInputGroupAppend,
      BTr,
      BTd,
      BFormCheckbox,
      CustomDatePicker,
      BListGroup,
      BListGroupItem
   },
   name: 'Edit',
   directives: {
      'b-tooltip': VBTooltip
   },

   data() {
      return {
         lang: '',
         activeTab: 'signs',
         loadingButton: false,
         SignOrganizationLoading: false,
         Data: {
            translates: [],
            person: {},
            signs: []
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
         ParentList: [],
         CountryList: [],
         RegionList: [],
         DistrictList: [],
         OkedList: [],
         SignOrganizationTypeList: [],
         TempSigns: [],
         OrganizationLegalFormList: [],
         innLoading: false,
         TableModal: false,
         StateList: [],
         TempPerson: {},
         tabrow: {
            prtnContractTypeTablePosition: '',
            id: 0,
            prtnContractTypeTableId: 0,
            expireOn: '',
            pinfl: '',
            firstName: '',
            lastName: '',
            middleName: '',
            passportSeria: '',
            passportNumber: '',
            birthOn: ''
         },
         filter: {
            Seria: '',
            Number: '',
            DateOfBirth: ''
         },
         editedIndex: -1,
         fields: [
            {
               key: 'prtnContractTypeTablePosition',
               label: this.$t('prtnContractTypeTablePosition'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'user',
               label: this.$t('user'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'expireOn',
               label: this.$t('expireOn'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            }
            // { key: "actions", label: this.$t("actions") },
         ]
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      OrganizationService.Get(this.$route.params.id).then(res => {
         this.Data = res.data;

         this.GetRegion(this.Data.countryId);
         if (this.$route.params.id != 0) {
            this.GetDistrict(this.Data.regionId);
            if (this.Data.signOrganizationTypeId) {
               this.ChangeSignOrganizationType(this.Data.signOrganizationTypeId);
            }
         }
      });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ManualService.StatusSelectList()
         .then(res => {
            this.StateList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      OrganizationService.GetAsSelectList()
         .then(res => {
            this.ParentList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      OrganizationLegalFormService.GetAsSelectList()
         .then(res => {
            this.OrganizationLegalFormList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
      CountryService.GetAsSelectList()
         .then(res => {
            this.CountryList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      OkedService.GetAsSelectList()
         .then(res => {
            this.OkedList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      // ManualService.SignOrganizationTypeSelectList({
      //   incluceBusinessman: false,
      // })
      //   .then((res) => {
      //     this.SignOrganizationTypeList = res.data;
      //   })
      //   .catch((error) => {
      //     this.makeToast(error.response.data.error, "danger");
      //   });
   },
   methods: {
      BindValueTabrow(value) {
         this.filter.DateOfBirth = value;
      },
      GetPerson() {
         this.$refs.ValidationTabrow.validate().then(success => {
            if (success) {
               this.personLoading = true;
               EmployeeService.GetByPassportData(this.filter.Seria, this.filter.Number, this.filter.DateOfBirth)
                  .then(res => {
                     this.TempPerson = res.data.person;
                     this.personLoading = false;
                  })
                  .catch(error => {
                     this.makeToast(error.response.data.error, 'danger');
                     this.personLoading = false;
                  });
            }
         });
      },
      OpenModal() {
         this.TableModal = true;
         // this.tabrow = {
         //   prtnContractTypeTablePosition: "",
         //   id: 0,
         //   prtnContractTypeTableId: 0,
         //   expireOn: "",
         //   pinfl: "",
         //   firstName: "",
         //   lastName: "",
         //   middleName: "",
         //   passportSeria: "",
         //   passportNumber: "",
         //   birthOn: ""
         // };
         // (this.filter = {
         //   Seria: "",
         //   Number: "",
         //   DateOfBirth: ""
         // }),
         //   (this.TempPerson = {});
         this.editedIndex = -1;
      },
      AddRow() {
         var self = this;
         this.$refs.ValidationTabrow.validate().then(res => {
            if (res) {
               this.$refs.ValidationTabrow2.validate().then(success => {
                  if (success) {
                     if (Object.keys(this.TempPerson).length === 0 && this.TempPerson.constructor === Object) {
                        this.makeToast(this.$t('NotFildUser'), 'danger');
                        return false;
                     }
                     this.tabrow.prtnContractTypeTablePosition = this.tabrow.prtnContractTypeTableId ? this.TempSigns.filter(item => item.value === this.tabrow.prtnContractTypeTableId)[0].text : '';

                     this.tabrow.pinfl = this.TempPerson.pinfl;
                     this.tabrow.firstName = this.TempPerson.nameLatin;
                     this.tabrow.lastName = this.TempPerson.surnameLatin;
                     this.tabrow.middleName = this.TempPerson.patronymLatin;
                     this.tabrow.passportSeria = this.TempPerson.passportSeria;
                     this.tabrow.passportNumber = this.TempPerson.passportNumber;
                     this.tabrow.birthOn = this.TempPerson.birthDate;

                     if (self.editedIndex > -1) {
                        Object.assign(self.Data.signs[self.editedIndex], self.tabrow);
                     } else {
                        self.Data.signs.push(self.tabrow);
                     }
                     self.tabrow = {
                        prtnContractTypeTablePosition: '',
                        id: 0,
                        prtnContractTypeTableId: 0,
                        expireOn: '',
                        pinfl: '',
                        firstName: '',
                        lastName: '',
                        middleName: '',
                        passportSeria: '',
                        passportNumber: '',
                        birthOn: ''
                     };
                     this.filter = {
                        Seria: '',
                        Number: '',
                        DateOfBirth: ''
                     };
                     self.TempPerson = {};
                     self.TableModal = false;
                  }
               });
            }
         });
      },
      // Delete(index) {
      //   this.Data.signs.splice(index, 1);
      // },
      BindValue(value, item) {
         item.expireOn = value;
      },

      ChangeSignOrganizationType(id = 0) {
         if (id) {
            const tempOrganizationId = this.Data.signOrganizationTypeId == 4 && this.$route.params.id != 0 ? this.$route.params.id : null;
            this.SignOrganizationLoading = true;
            PrtnContractTypeService.GetTablesBySignOrganizationType({
               SignOrganizationTypeId: id,
               includeBusinessman: false,
               regionId: this.Data.regionId,
               organizationId: tempOrganizationId
            })
               .then(res => {
                  this.TempSigns = res.data;
                  this.SignOrganizationLoading = false;
               })
               .catch(error => {
                  this.SignOrganizationLoading = false;

                  this.makeToast(error.response.data.error, 'danger');
               });
         }
      },
      rowClass(item, type) {
         if (item.Status === 3) {
            return 'd-none';
         }
      },
      GetByInn() {
         this.innLoading = true;
         OrganizationService.GetByInn(this.Data.inn)
            .then(res => {
               this.Data = res.data;

               this.GetDistrict(res.data.regionId);
            })
            .catch(error => {
               this.makeToast(error.response.data.errors, 'danger');
            });
      },

      ChangeCountry(id) {
         this.Data.regionId = 0;
         this.Data.region = null;

         this.Data.districtId = 0;
         this.Data.district = null;
         if (id) {
            this.GetRegion(id);
         } else {
            this.RegionList = [];
         }
      },
      GetRegion(id) {
         RegionService.GetAsSelectList(id)
            .then(res => {
               this.RegionList = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });
      },
      ChangeRegion(id) {
         this.Data.districtId = 0;
         this.Data.district = null;
         if (id) {
            this.GetDistrict(id);
         } else {
            this.DistrictList = [];
         }
      },
      GetDistrict(id) {
         DistrictService.GetAsSelectList(id)
            .then(res => {
               this.DistrictList = res.data;
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
      SaveData() {
         this.$refs.ValidationDTO.validate().then(success => {
            if (success) {
               OrganizationService.Update(this.Data)
                  .then(res => {
                     this.makeToast(this.$t('SaveSuccess'), 'success');
                     this.$router.push({ name: 'Organization' });
                  })
                  .catch(err => {
                     for (const key in err.response.data.errors) {
                        this.makeToast(err.response.data.errors[key][0], 'danger');
                     }
                  });
            }
         });
         this.loadingButton = true;
      }
   }
};
</script>
<style scoped>
legend {
   background-color: #000;
   color: #fff;
   padding: 3px 6px;
}

.output {
   font: 1rem 'Fira Sans', sans-serif;
}

input {
   margin: 0.4rem;
}
</style>
<style lang="scss">
.tabheader {
   background: #f3f2f7;
   padding: 10px 15px;
   width: fit-content;
   font-weight: bold;
   border-radius: 5px;
}
</style>
