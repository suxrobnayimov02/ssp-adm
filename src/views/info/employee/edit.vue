divdiv<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationPersonInfo">
            <b-row>
               <b-col sm="12" md="3" class="text-left mt-2">
                  <div class="form-group">
                     <form-input
                        v-model="filter.Seria"
                        :mask="'AA'"
                        required
                        @input="(val) => (filter.Seria = filter.Seria.toUpperCase())"
                        :label="$t('Seria')"
                     />
                  </div>
               </b-col>
               <b-col sm="12" md="3" class="text-left mt-2">
                  <div class="form-group">
                     <form-input
                        v-model="filter.Number"
                        required
                        :mask="'#######'"
                        :label="$t('passportNumber')"
                     />
                  </div>
               </b-col>
               <b-col sm="12" md="3" class="text-left mt-2">
                  <form-picker
                     v-model="filter.DateOfBirth"
                     :label="$t('dateofbirth')"
                     rules="required"
                     :placeholder="$t('dateofbirth')"
                  ></form-picker>
               </b-col>
               <b-col sm="12" md="3" class="text-left mt-2">
                  <b-button @click="GetPerson" class="mt-2" variant="primary">
                     {{
                     $t("search")
                     }}
                  </b-button>
               </b-col>
            </b-row>
         </validation-observer>
      </b-card>
      <b-card v-show="!!Data.person.pinfl">
         <b-row>
            <b-col sm="12" md="12" class="text-left">
               <h3>
                  {{
                  `${Data.person.surnameLatin} ${Data.person.nameLatin} ${Data.person.patronymLatin}`
                  }}
               </h3>
            </b-col>
            <b-col sm="12" md="6" class="text-left">
               <b-list-group>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("dateofbirth") }}</b>
                        <span>{{ Data.person.birthDate }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("nationality") }}</b>
                        <span>{{ Data.person.nationality }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("gender") }}</b>
                        <span>{{ Data.person.gender }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("Oblast") }}</b>
                        <span>{{ Data.person.livingRegion }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("Region") }}</b>
                        <span>{{ Data.person.livingDistrict }}</span>
                     </div>
                  </b-list-group-item>
               </b-list-group>
            </b-col>

            <b-col sm="12" md="6" class="text-left">
               <b-list-group>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("Seria") }}</b>
                        <span>{{ Data.person.passportSeria }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("passportNumber") }}</b>
                        <span>{{ Data.person.passportNumber }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("passportDate") }}</b>
                        <span>{{ Data.person.passportDate }}</span>
                     </div>
                  </b-list-group-item>
                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("passportExpiration") }}</b>
                        <span>{{ Data.person.passportExpiration }}</span>
                     </div>
                  </b-list-group-item>

                  <b-list-group-item>
                     <div style="display: flex; justify-content: space-between">
                        <b>{{ $t("pinfl") }}</b>
                        <span>{{ Data.person.pinfl }}</span>
                     </div>
                  </b-list-group-item>
               </b-list-group>
            </b-col>
         </b-row>
      </b-card>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="12" class="text-left mt-2">
                  <form-select
                     :options="OrganizationList"
                     v-model="Data.organizationid"
                     required-star
                     :label="$t('Organization')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="4" class="text-left mt-2">
                  <form-select
                     :options="PositionList"
                     v-model="Data.positionId"
                     required-star
                     :label="$t('position')"
                  ></form-select>
               </b-col>

               <b-col sm="12" md="4" class="text-left mt-2">
                  <div class="form-group">
                     <form-input
                        v-model="Data.phoneNumber"
                        required
                        mask="(998) ## ### ## ##"
                        :label="$t('phoneNumber')"
                     />
                  </div>
               </b-col>
            </b-row>
         </validation-observer>
         <b-row class="mt-2">
            <b-col sm="12" md="12">
               <b-tabs pills>
                  <b-tab :title="$t('relatives')" active>
                     <validation-observer ref="ValidationTabrow1">
                        <b-row class="mb-2">
                           <b-col sm="12" md="3" class="text-left mt-2">
                              <div class="form-group">
                                 <form-input
                                    v-model="filterTabrow.Seria"
                                    :mask="'AA'"
                                    required
                                    @input="(val) => (filterTabrow.Seria = filterTabrow.Seria.toUpperCase())"
                                    :label="$t('Seria')"
                                 />
                              </div>
                           </b-col>
                           <b-col sm="12" md="3" class="text-left mt-2">
                              <div class="form-group">
                                 <form-input
                                    v-model="filterTabrow.Number"
                                    required
                                    :mask="'#######'"
                                    :label="$t('passportNumber')"
                                 />
                              </div>
                           </b-col>
                           <b-col sm="12" md="3" class="text-left mt-2">
                              <form-picker
                                 v-model="filterTabrow.DateOfBirth"
                                 :label="$t('dateofbirth')"
                                 required
                                 :placeholder="$t('dateofbirth')"
                              ></form-picker>
                           </b-col>
                           <b-col sm="12" md="3" class="text-left mt-2">
                              <b-button @click="GetPersonRelative" class="mt-2" variant="primary">
                                 {{
                                 $t("search")
                                 }}
                              </b-button>
                           </b-col>
                        </b-row>
                     </validation-observer>

                     <b-row v-if="!!TempTabrowPerson.pinfl" class="mb-2">
                        <b-col sm="12" md="12" class="text-left">
                           <h3>
                              {{
                              `${TempTabrowPerson.surnameLatin} ${TempTabrowPerson.nameLatin} ${TempTabrowPerson.patronymLatin}`
                              }}
                           </h3>
                        </b-col>
                        <b-col sm="12" md="6" class="text-left">
                           <b-list-group>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("dateofbirth") }}</b>
                                    <span>{{ TempTabrowPerson.birthDate }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("nationality") }}</b>
                                    <span>{{ TempTabrowPerson.nationality }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("gender") }}</b>
                                    <span>{{ TempTabrowPerson.gender }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("Oblast") }}</b>
                                    <span>{{ TempTabrowPerson.livingRegion }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("Region") }}</b>
                                    <span>{{ TempTabrowPerson.livingDistrict }}</span>
                                 </div>
                              </b-list-group-item>
                           </b-list-group>
                        </b-col>

                        <b-col sm="12" md="6" class="text-left">
                           <b-list-group>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("Seria") }}</b>
                                    <span>{{ TempTabrowPerson.passportSeria }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("passportNumber") }}</b>
                                    <span>{{ TempTabrowPerson.passportNumber }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("passportDate") }}</b>
                                    <span>{{ TempTabrowPerson.passportDate }}</span>
                                 </div>
                              </b-list-group-item>
                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("passportExpiration") }}</b>
                                    <span>{{ TempTabrowPerson.passportExpiration }}</span>
                                 </div>
                              </b-list-group-item>

                              <b-list-group-item>
                                 <div style="display: flex; justify-content: space-between">
                                    <b>{{ $t("pinfl") }}</b>
                                    <span>{{ TempTabrowPerson.pinfl }}</span>
                                 </div>
                              </b-list-group-item>
                           </b-list-group>
                        </b-col>
                     </b-row>
                     <validation-observer ref="ValidationTabrow12">
                        <b-row>
                           <b-col sm="12" md="3">
                              <form-picker v-model="tabrow1.onDate" :label="$t('onDate')" required></form-picker>
                           </b-col>

                           <b-col sm="12" md="3">
                              <form-picker
                                 v-model="tabrow1.dateOfIssue"
                                 :label="$t('dateOfIssue')"
                                 required
                              ></form-picker>
                           </b-col>

                           <b-col sm="12" md="3">
                              <form-select
                                 :options="RelativeDegreeList"
                                 v-model="tabrow1.relativeDegreeId"
                                 required-star
                                 :label="$t('relativeDegree')"
                              ></form-select>
                           </b-col>

                           <b-col sm="12" md="3">
                              <form-select
                                 :options="IdentityDocumentList"
                                 v-model="tabrow1.identityDocumentId"
                                 required-star
                                 :label="$t('identityDocument')"
                              ></form-select>
                           </b-col>

                           <b-col sm="12" md="3">
                              <div class="form-group">
                                 <form-input v-model="tabrow1.address" :label="$t('address')" />
                              </div>
                           </b-col>

                           <b-col sm="12" md="3">
                              <div class="form-group">
                                 <form-input
                                    v-model="tabrow1.issueOrganization"
                                    :label="$t('issueOrganization')"
                                 />
                              </div>
                           </b-col>

                           <b-col sm="12" md="3">
                              <div class="form-group">
                                 <form-input
                                    v-model="tabrow1.phoneNumber"
                                    :label="$t('phoneNumber')"
                                    mask="(998) ## ### ## ##"
                                 />
                              </div>
                           </b-col>

                           <b-col sm="12" md="3">
                              <b-button @click="AddRow1" class="mt-2" variant="primary">
                                 {{
                                 $t("AddRow")
                                 }}
                              </b-button>
                           </b-col>
                        </b-row>
                     </validation-observer>

                     <b-row>
                        <b-col md="12">
                           <b-table
                              style="vertical-align: middle;"
                              :fields="fieldsTabrow1"
                              :items="Data.person.relatives"
                              class="bg-color-table text-center"
                              bordered
                              :responsive="true"
                           >
                              <template
                                 #cell(user)="{ item }"
                              >{{ `${item.lastName} ${item.firstName} ${item.familyName}` }}</template>
                              <template #cell(actions)="{ item, index }">
                                 <div class="text-center">
                                    <!-- <b-link @click="Edit(item)" class="mr-1" v-c-tooltip="{ content: $t('Edit') }">
                  <feather-icon icon="EditIcon"></feather-icon>
                                    </b-link>-->
                                    <b-link
                                       class="mr-1"
                                       v-b-tooltip.hover.top="$t('Delete')"
                                       @click="Delete(index)"
                                    >
                                       <feather-icon icon="Trash2Icon"></feather-icon>
                                    </b-link>
                                 </div>
                              </template>
                           </b-table>
                        </b-col>
                     </b-row>
                  </b-tab>

                  <b-tab :title="$t('placeOfWorksImported')">
                     <b-card-text>Tab placeOfWorksImported 2</b-card-text>
                  </b-tab>

                  <b-tab :title="$t('placeOfWorksManual')">
                     <validation-observer ref="ValidationTabrow3">
                        <b-row>
                           <b-col sm="12" md="3">
                              <form-picker
                                 v-model="tabrow3.startOn"
                                 :label="$t('startOn')"
                                 required
                                 :placeholder="$t('startOn')"
                              ></form-picker>
                           </b-col>
                           <b-col sm="12" md="3">
                              <form-picker
                                 v-model="tabrow3.endOn"
                                 :label="$t('endOn')"
                                 :placeholder="$t('endOn')"
                              ></form-picker>
                           </b-col>
                           <b-col sm="12" md="3">
                              <div class="form-group">
                                 <form-input
                                    v-model="tabrow3.organizationInn"
                                    required
                                    :label="$t('organizationInn')"
                                 />
                              </div>
                           </b-col>
                           <b-col sm="12" md="3">
                              <div class="form-group">
                                 <form-input
                                    v-model="tabrow3.organizationName"
                                    required
                                    :label="$t('organizationName')"
                                 />
                              </div>
                           </b-col>
                           <b-col sm="12" md="3">
                              <form-select
                                 :options="PositionList"
                                 v-model="tabrow3.positionId"
                                 required-star
                                 :label="$t('position')"
                              ></form-select>
                           </b-col>

                           <b-col sm="12" md="3">
                              <form-select
                                 :options="EmploymentTypeList"
                                 v-model="tabrow3.employmentTypeId"
                                 required-star
                                 :label="$t('employmentType')"
                              ></form-select>
                           </b-col>
                           <b-col sm="12" md="3">
                              <b-button @click="AddRow3" class="mt-2" variant="primary">
                                 {{
                                 $t("AddRow")
                                 }}
                              </b-button>
                           </b-col>
                        </b-row>
                     </validation-observer>

                     <b-row class="mt-2">
                        <b-col md="12">
                           <b-table
                              style="vertical-align: middle;"
                              :fields="fieldsTabrow3"
                              :items="Data.person.placeOfWorksManual"
                              class="bg-color-table text-center"
                              bordered
                              :responsive="true"
                           >
                              <template #cell(actions)="{ item, index }">
                                 <div class="text-center">
                                    <!-- <b-link @click="Edit(item)" class="mr-1" v-c-tooltip="{ content: $t('Edit') }">
                            <feather-icon icon="EditIcon"></feather-icon>
                                    </b-link>-->
                                    <b-link
                                       class="mr-1"
                                       v-b-tooltip.hover.top="$t('Delete')"
                                       @click="Delete(index)"
                                    >
                                       <feather-icon icon="Trash2Icon"></feather-icon>
                                    </b-link>
                                 </div>
                              </template>
                           </b-table>
                        </b-col>
                     </b-row>
                  </b-tab>
               </b-tabs>
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
import EmployeeService from '@/services/info/employee.service';
import PersonService from '@/services/others/person.service';
import PositionService from '@/services/info/position.service';
import IdentityDocumentService from '@/services/info/identitydocument.service';
import RelativeDegreeService from '@/services/info/relativedegree.service';
import CustomDatePicker from '@/views/components/customDatePicker.vue';
import FormPicker from '@/components/forms/form-picker.vue';

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
      FormPicker,
      VBTooltip,
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

   data() {
      return {
         lang: '',
         OrganizationList: [],
         PositionList: [],
         EmploymentTypeList: [],
         loadingButton: false,

         Data: {
            translates: [],
            person: {
               relatives: [],
               placeOfWorksImported: [],
               placeOfWorksManual: []
            }
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
         TempTabrowPerson: {},
         filter: {
            Seria: '',
            Number: '',
            DateOfBirth: ''
         },
         filterTabrow: {
            Seria: '',
            Number: '',
            DateOfBirth: ''
         },
         personLoading: false,
         fieldsTabrow1: [
            {
               key: 'user',
               label: this.$t('user'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'dateOfBirth',
               label: this.$t('dateOfBirth'),
               tdClass: 'text-left',
               thClass: 'text-center'
            },

            {
               key: 'relativeDegree',
               label: this.$t('relativeDegree'),
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'identityDocument',
               label: this.$t('identityDocument'),
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'pinfl',
               label: this.$t('pinfl'),
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'onDate',
               label: this.$t('onDate'),
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            { key: 'actions', label: this.$t('actions') }
         ],
         RelativeDegreeList: [],
         IdentityDocumentList: [],
         tabrow1: {
            id: 0,
            onDate: '',
            relativeDegreeId: 0,
            relativeDegree: '',
            familyName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            pinfl: '',
            hasDied: false,
            dateOfDeath: '',
            countryId: 0,
            regionId: 0,
            districtId: 0,
            address: '',
            phoneNumber: '',
            identityDocumentId: 0,
            identityDocument: '',
            documentSeries: '',
            documentNumber: '',
            dateOfIssue: '',
            dateOfExpire: '',
            issueOrganization: '',
            nationalityId: 0,
            citizenshipId: 0
         },
         tabrow3: {
            id: 0,
            organizationName: '',
            organizationInn: '',
            positionId: 0,
            positionName: '',
            employmentTypeId: 0,
            employmentTypeName: 0,
            startOn: '',
            endOn: ''
         },
         fieldsTabrow3: [
            {
               key: 'organizationName',
               label: this.$t('organizationName'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'organizationInn',
               label: this.$t('organizationInn'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'startOn',
               label: this.$t('startOn'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'endOn',
               label: this.$t('endOn'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'organizationName',
               label: this.$t('organizationName'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'employmentTypeName',
               label: this.$t('employmentTypeName'),
               // sortable: true,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            { key: 'actions', label: this.$t('actions') }
         ]
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      EmployeeService.Get(this.$route.params.id).then(res => {
         this.Data = res.data;
      });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
      ManualService.EmploymentTypeSelectList()
         .then(res => {
            this.EmploymentTypeList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      PositionService.GetAsSelectList()
         .then(res => {
            this.PositionList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      RelativeDegreeService.GetAsSelectList()
         .then(res => {
            this.RelativeDegreeList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      IdentityDocumentService.GetAsSelectList()
         .then(res => {
            this.IdentityDocumentList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      OrganizationService.GetAsSelectList()
         .then(res => {
            this.OrganizationList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      AddRow1() {
         var self = this;
         this.$refs.ValidationTabrow1.validate().then(res => {
            if (res) {
               this.$refs.ValidationTabrow12.validate().then(success => {
                  if (success) {
                     this.tabrow1.relativeDegree = this.tabrow1.relativeDegreeId ? this.RelativeDegreeList.filter(item => item.value === this.tabrow1.relativeDegreeId)[0].text : '';

                     this.tabrow1.identityDocument = this.tabrow1.identityDocumentId ? this.IdentityDocumentList.filter(item => item.value === this.tabrow1.identityDocumentId)[0].text : '';

                     if (self.editedIndex > -1) {
                        Object.assign(self.Data.person.relatives[self.editedIndex], self.tabrow1);
                     } else {
                        self.Data.person.relatives.push(self.tabrow1);
                     }
                     self.tabrow1 = {
                        id: 0,
                        onDate: '',
                        relativeDegreeId: 0,
                        relativeDegree: '',
                        familyName: '',
                        firstName: '',
                        lastName: '',
                        dateOfBirth: '',
                        pinfl: '',
                        hasDied: false,
                        dateOfDeath: '',
                        countryId: 0,
                        regionId: 0,
                        districtId: 0,
                        address: '',
                        phoneNumber: '',
                        identityDocumentId: 0,
                        identityDocument: '',
                        documentSeries: '',
                        documentNumber: '',
                        dateOfIssue: '',
                        dateOfExpire: '',
                        issueOrganization: '',
                        nationalityId: 0,
                        citizenshipId: 0
                     };

                     self.TempTabrowPerson = {};
                     self.filterTabrow = {
                        Seria: '',
                        Number: '',
                        DateOfBirth: ''
                     };
                  }
               });
            }
         });
      },
      AddRow3() {
         var self = this;
         this.$refs.ValidationTabrow3.validate().then(res => {
            if (res) {
               this.$refs.ValidationTabrow3.validate().then(success => {
                  if (success) {
                     this.tabrow3.employmentTypeName = this.tabrow3.employmentTypeId ? this.EmploymentTypeList.filter(item => item.value === this.tabrow3.employmentTypeId)[0].text : '';

                     this.tabrow3.positionName = this.tabrow3.positionId ? this.PositionList.filter(item => item.value === this.tabrow3.positionId)[0].text : '';

                     if (self.editedIndex > -1) {
                        Object.assign(self.Data.person.placeOfWorksManual[self.editedIndex], self.tabrow3);
                     } else {
                        self.Data.person.placeOfWorksManual.push(self.tabrow3);
                     }
                     self.tabrow3 = {
                        id: 0,
                        organizationName: '',
                        organizationInn: '',
                        positionId: 0,
                        positionName: '',
                        employmentTypeId: 0,
                        employmentTypeName: 0,
                        startOn: '',
                        endOn: ''
                     };
                  }
               });
            }
         });
      },
      BindValue(value) {
         this.filter.DateOfBirth = value;
      },
      GetPerson() {
         this.$refs.ValidationPersonInfo.validate().then(success => {
            if (success) {
               this.personLoading = true;
               EmployeeService.GetByPassportData(this.filter.Seria, this.filter.Number, this.filter.DateOfBirth)
                  .then(res => {
                     this.Data.person = res.data.person;
                     this.personLoading = false;
                  })
                  .catch(error => {
                     this.makeToast(error.response.data.error, 'danger');
                     this.personLoading = false;
                  });
            }
         });
      },
      GetPersonRelative() {
         this.$refs.ValidationTabrow1.validate().then(success => {
            if (success) {
               PersonService.GetByPassportData(this.filterTabrow.Seria, this.filterTabrow.Number, this.filterTabrow.DateOfBirth)
                  .then(res => {
                     this.TempTabrowPerson = res.data;

                     this.tabrow1.familyName = res.data.patronymLatin;
                     this.tabrow1.firstName = res.data.nameLatin;
                     this.tabrow1.lastName = res.data.surnameLatin;
                     this.tabrow1.dateOfBirth = res.data.birthDate;
                     this.tabrow1.pinfl = res.data.pinfl;
                     this.tabrow1.countryId = res.data.birthCountryId;
                     this.tabrow1.regionId = res.data.livingRegionId;
                     this.tabrow1.districtId = res.data.livingDistrictId;
                     this.tabrow1.documentSeries = res.data.passportSeria;
                     this.tabrow1.documentNumber = res.data.passportNumber;
                     this.tabrow1.nationalityId = res.data.nationalityId;
                     this.tabrow1.citizenshipId = res.data.citizenshipId;
                     this.tabrow1.dateOfExpire = res.data.passportExpiration;
                  })
                  .catch(error => {
                     this.makeToast(error.response.data.errors, 'danger');
                  });
            }
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
      onChangeCheckbox(id) {
         console.log();
      },

      SaveData() {
         this.loadingButton = true;
         EmployeeService.Update(this.Data)
            .then(res => {
               this.makeToast(this.$t('SaveSuccess'), 'success');
               this.$router.push({ name: 'Employee' });
            })
            .catch(err => {
               this.makeToast(this.$t(err), 'danger');
            });

         // this.$refs.ValidationPersonInfo.validate().then(success => {
         //   if (success) {
         //     this.$refs.ValidationDTO.validate().then(result => {
         //       if (result) {

         //       }
         //     });
         //   }
         // });
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
@/services/info/position.service