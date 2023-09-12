<template>
   <b-overlay :show="show">
      <b-row>
         <b-col sm="12" md="12" lg="12">
            <b-card>
               <validation-observer ref="ValidationDTO">
                  <b-row>
                     <b-col sm="12" md="3">
                        <form-select :options="OrganizationList" v-model="Data.organizationId" :label="$t('Organization')"></form-select>
                     </b-col>
                     <b-col sm="12" md="6">
                        <form-select :options="DepartmentList" v-model="Data.departmentId" :label="$t('Department')"></form-select>
                     </b-col>
                     <b-col sm="12" md="6">
                        <form-select :options="CalculationKindList" v-model="Data.calculationKindId" :label="$t('calculationKind')"></form-select>
                     </b-col>
                     <b-col sm="12" md="6">
                        <form-select :options="RoundingTypeList" v-model="Data.roundingTypeId" :label="$t('roundingType')"></form-select>
                     </b-col>
                     <b-col sm="12" md="3">
                        <div class="form-group">
                           <form-input v-model="Data.docNumber" required :label="$t('code')" />
                        </div>
                     </b-col>
                     <b-col sm="12" md="3">
                        <form-picker v-model="Data.docOn" :label="$t('docOn')" :placeholder="$t('docOn')"></form-picker>
                     </b-col>
                     <b-col sm="12" md="3">
                        <form-select :options="StateList" v-model="Data.status" :label="$t('Status')"></form-select>
                     </b-col>
                     <b-col sm="12" md="12">
                        <b-form-textarea id="textarea" v-model="Data.details" :placeholder="$t('detailinfo')" rows="3" max-rows="6"></b-form-textarea>
                     </b-col>
                  </b-row>
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
                        <b-table :fields="TablesField" small responsive="sm" :items="Data.tables">
                           <template #cell(status)="{ item }">
                              <b-badge :variant="item.stateId == '1' ? 'light-danger' : 'light-success'">{{ item.state }}</b-badge>
                           </template>
                           <template #cell(actions)="{ item, index }">
                              <div class="text-center">
                                 <b-link>
                                    <feather-icon style="margin-right: 5px" @click="EditTabrow(item)" icon="EditIcon"></feather-icon>
                                 </b-link>
                                 <b-link>
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
                        <b-button :disabled="saveLoading" @click="SaveData" size="sm" variant="outline-success">
                           <feather-icon icon="CheckIcon"></feather-icon>
                           {{ $t('Save') }}
                        </b-button>
                     </b-col>
                  </b-row>
               </validation-observer>
            </b-card>
         </b-col>
      </b-row>
      <!-- table modal -->
      <b-modal size="lg" v-model="TabrowModal" no-close-on-backdrop hide-footer :title="$t('Tables')">
         <validation-observer ref="ValidationTabrow">
            <b-row>
               <b-col sm="12" md="6">
                  <form-picker v-model="tabrow.startOn" :label="$t('startdate')" required :placeholder="$t('startOn')"></form-picker>
               </b-col>
               <b-col sm="12" md="6">
                  <form-picker v-model="tabrow.endDate" :label="$t('enddate')" required :placeholder="$t('endOn')"></form-picker>
               </b-col>
               <b-col sm="12" md="6">
                  <form-select :options="EmployeeManageList" v-model="tabrow.employeeManageId" required-star :label="$t('employee')"></form-select>
               </b-col>
               <b-col sm="12" md="6">
                  <form-select :options="DepartmentList" v-model="tabrow.departmentId" :label="$t('Department')"></form-select>
               </b-col>
               <b-col sm="12" md="12">
                  <b-form-textarea v-model="tabrow.details" :placeholder="$t('detailinfo')" rows="3" max-rows="6"></b-form-textarea>
               </b-col>
            </b-row>
         </validation-observer>
         <b-row>
            <b-col class="text-center mt-1">
               <b-button variant="outline-danger" @click="TabrowModal = false" class="mr-1" size="sm">
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
   </b-overlay>
</template>
<script>
// service
import ManualService from '@/services/others/manual.service';
import OrganizationService from '@/services/managment/organization.service';
import PlannedCalculationService from '@/services/hrm/employeesendtrain.service';
import CalculationKindService from '@/services/hrm/calculationkind.service';
import DepartmentService from '@/services/info/department.service';
import EmployeeManageService from '@/services/hrm/employeemanage.service';

// components
import {
   BOverlay,
   BCard,
   BCardBody,
   BRow,
   BCol,
   BFormInput,
   BTabs,
   BTable,
   BTab,
   BButton,
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
import CustomDatePicker from '@/views/components/customDatePicker.vue';

const defaultTableRow = {
   id: 0,
   department: '',
   departmentId: null,
   employee: '',
   employeeManageId: null,
   details: '',
   startOn: '',
   endDate: ''
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
      BFormCheckbox,
      CustomDatePicker,
      BFormTextarea
   },
   name: 'Edit',
   data() {
      return {
         show: false,
         OrganizationList: [],
         StateList: [],
         DepartmentList: [],
         RoundingTypeList: [],
         CalculationKindList: [],
         EmployeeManageList: [],
         loadingButton: false,
         TabrowModal: false,
         saveLoading: false,
         Data: {
            id: null,
            docNumber: null,
            docOn: null,
            details: null,
            organization: null,
            status: null
         },
         tabrow: { ...defaultTableRow },
         TablesField: [
            {
               key: 'employee',
               label: this.$t('employee'),
               sortable: true
            },
            {
               key: 'position',
               label: this.$t('position'),
               sortable: true
            },

            {
               key: 'startOn',
               label: this.$t('startdate')
            },
            {
               key: 'endDate',
               label: this.$t('endDate')
            },
            {
               key: 'percentage',
               label: this.$t('percentage')
            },
            {
               key: 'amount',
               label: this.$t('amount')
            },
            {
               key: 'actions',
               label: this.$t('actions'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            }
         ]
      };
   },

   created() {
      this.show = true;
      PlannedCalculationService.Get(this.$route.params.id)
         .then((res) => {
            this.Data = res.data;
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         })
         .finally(() => {
            this.show = false;
         });

      DepartmentService.GetAsSelectList({})
         .then((res) => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.DepartmentList = rows;
            }
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         });
      CalculationKindService.GetAsSelectList({})
         .then((res) => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.CalculationKindList = rows;
            }
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         });
      ManualService.RoundingTypeSelectList({})
         .then((res) => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.RoundingTypeList = rows;
            }
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         });

      EmployeeManageService.GetList({})
         .then((res) => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.EmployeeManageList = rows;
            }
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         });

      ManualService.StateSelectList()
         .then((res) => {
            this.StateList = res.data;
         })
         .catch((error) => {
            this.makeToast(error.response.data.error, 'danger');
         });

      OrganizationService.GetAsSelectList()
         .then((res) => {
            this.OrganizationList = res.data;
         })
         .catch((error) => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      DeleteTabrow(index) {
         this.Data.tables.splice(index, 1);
      },
      OpenTabrow() {
         this.TabrowModal = true;
         this.tabrow = { ...defaultTableRow };
         this.editedIndex1 = -1;
      },
      EditTabrow(item) {
         this.editedIndex1 = this.Data.tables.indexOf(item);
         this.tabrow = Object.assign({}, item);
         this.TabrowModal = true;
      },
      AddTabrow() {
         this.$refs.ValidationTabrow.validate().then((success) => {
            if (success) {
               if (this.tabrow.departmentId) {
                  this.tabrow.department = this.DepartmentList.find((e) => e.value == this.tabrow.departmentId)?.text;
               }
               if (this.tabrow.employeeManageId) {
                  this.tabrow.employee = this.EmployeeManageList.find((e) => e.value == this.tabrow.employeeManageId)?.text;
               }

               if (this.editedIndex1 > -1) {
                  Object.assign(this.Data.tables[this.editedIndex1], this.tabrow);
               } else {
                  this.Data.tables.push(this.tabrow);
               }
               this.TabrowModal = false;
            }
         });
      },
      SaveData() {
         this.$refs.ValidationDTO.validate().then((success) => {
            if (success) {
               this.saveLoading = true;
               PlannedCalculationService.Update(this.Data)
                  .then(() => {
                     this.makeToast(this.$t('SaveSuccess'), 'success');
                     this.$router.push({ name: 'EmployeeSendTrain' });
                  })
                  .catch((err) => {
                     this.makeToast(this.$t(err), 'danger');
                  })
                  .finally(() => {
                     this.saveLoading = false;
                  });
            }
         });
      }
   }
};
</script>
