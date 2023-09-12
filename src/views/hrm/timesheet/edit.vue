<template>
   <b-overlay :show="show">
      <b-row>
         <b-col sm="12" md="12" lg="12">
            <b-card>
               <validation-observer ref="ValidationDTO">
                  <b-row>
                     <b-col sm="12" md="3">
                        <form-select :options="OrganizationList" v-model="Data.organization" :label="$t('Organization')"></form-select>
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
                        <b-button @click="addTableRow1" size="sm" variant="outline-primary">
                           <feather-icon icon="PlusIcon"></feather-icon>
                           {{ $t('Add') }}
                        </b-button>
                     </b-col>
                  </b-row>

                  <b-table :fields="TablesField" :items="Data.tables" bordered responsive hover class="table1 mt-2" small>
                     <template #cell(departmentId)="data">
                        <form-select v-model="data.departmentId" :options="DepartmentList"></form-select>
                     </template>
                     <template #cell(employeeId)="data">
                        <form-select v-model="data.employeeId" :options="EmployeeList"></form-select>
                     </template>
                     <template #cell(positionId)="data">
                        <form-select v-model="data.positionId" :options="PositionList"></form-select>
                     </template>
                     <template #cell(days)="data">
                        <b-button @click="OpenTabrow" size="sm" variant="outline-primary">
                           <feather-icon icon="PlusIcon"></feather-icon>
                           {{ $t('Add') }}
                        </b-button>
                     </template>
                     <template #cell(actions)="{ item, index }">
                        <div class="text-center">
                           <b-link>
                              <feather-icon style="margin-right: 5px" @click="EditTabrow(item)" icon="EditIcon"></feather-icon>
                           </b-link>
                           <b-link>
                              <feather-icon @click="DeleteTabrow1(index)" icon="Trash2Icon"></feather-icon>
                           </b-link>
                        </div>
                     </template>
                     <template #cell(order)="{ index }">
                        <span>{{ index + 1 }}</span>
                     </template>
                  </b-table>

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
                  <form-picker v-model="tabrow.endOn" :label="$t('enddate')" required :placeholder="$t('endOn')"></form-picker>
               </b-col>
               <b-col sm="12" md="6">
                  <form-select :options="EmployeeList" v-model="tabrow.employeeId" required-star :label="$t('employee')"></form-select>
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
import TimesheetService from '@/services/hrm/timesheet.service';
import DepartmentService from '@/services/info/department.service';
import EmployeeService from '@/services/info/employee.service';
import PositionService from '@/services/info/position.service';

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

const defaultTableRow2 = {
   id: 0,
   timesheetIndicatorId: 0,
   dateOn: '',
   planDays: 0,
   planHours: 0,
   factDays: 0,
   factHours: 0,
   dayOffHours: 0,
   nightHours: 0,
   hourly: 0,
   maintenanceHours: 0
}

const defaultTableRow1 = {
   id: 0,
   departmentId: 0,
   employeeId: 0,
   positionId: 0,
   employeeManageId: 0,
   orgSettlementAccountId: 0,
   workScheduleId: 0,
   employmentTypeId: 0,
   startOn: '',
   endOn: '',
   employmentRate: 0,
   details: "",
   planDays: 0,
   planHours: 0,
   factDays: 0,
   factHours: 0,
   dayOffHours: 0,
   nightHours: 0,
   hourly: 0,
   maintenanceHours: 0,
   experiencePercentage: 0,
   documentId: 0,
   documentInfo: 0,
   documentInfo: "",
   days: []
}

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
         EmployeeList: [],
         PositionList: [],
         loadingButton: false,
         TabrowModal: false,
         saveLoading: false,
         Data: {
            id: null,
            docNumber: null,
            docOn: null,
            monthOn: null,
            details: null,
            orgSettlementAccountId: null,
            departmentId: null,
            timesheetTypeId: null,
            tables: []
         },
         tabrow: { ...defaultTableRow2 },
         TablesField: [
            {
               key: 'departmentId',
               label: this.$t('Department'),
            },
            {
               key: 'employeeId',
               label: this.$t('employee'),
            },
            {
               key: 'positionId',
               label: this.$t('position'),
            },
            {
               key: 'employeeManageId',
               label: this.$t('employeeManage'),
            },
            {
               key: 'orgSettlementAccountId',
               label: this.$t('orgSettlementAccount'),
            },
            {
               key: 'workScheduleId',
               label: this.$t('workSchedule'),
            },
            {
               key: 'employmentTypeId',
               label: this.$t('employmentType'),
            },
            {
               key: 'employmentRate',
               label: this.$t('employmentRate'),
            },
            {
               key: 'details',
               label: this.$t('details'),
            },
            {
               key: 'documentId',
               label: this.$t('Document'),
            },
            {
               key: 'documentTableId',
               label: this.$t('documentTable'),
            },
            {
               key: 'documentInfo',
               label: this.$t('documentInfo'),
            },
            {
               key: 'days',
               label: this.$t('days'),
            },
            {
               key: 'startOn',
               label: this.$t('startdate'),
            },
            {
               key: 'endOn',
               label: this.$t('enddate'),
            },
            {
               key: 'actions',
               label: this.$t('actions'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            }
         ],
      };
   },

   created() {
      if (this.$route.params.id > 0) {
         this.show = true;
         TimesheetService.Get(this.$route.params.id)
            .then((res) => {
               this.Data = res.data;
            })
            .catch((error) => {
               this.makeToast(error.response.data.errors, 'danger');
            })
            .finally(() => {
               this.show = false;
            });
      }

      DepartmentService.GetAsSelectList({})
         .then((res) => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.DepartmentList = rows
            }
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         });

      EmployeeService.GetAsSelectList({})
         .then((res) => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.EmployeeList = rows
            }
         })
         .catch((error) => {
            this.makeToast(error.response.data.errors, 'danger');
         });

      PositionService.GetAsSelectList()
         .then(res => {
            this.PositionList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, "danger");
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
      DeleteTabrow1(index) {
         this.Data.tables.splice(index, 1);
      },
      addTableRow1() {
         this.Data.tables.push(defaultTableRow1)
      },
      OpenTabrow() {
         this.TabrowModal = true;
         this.tabrow = { ...defaultTableRow2 }
         this.editedIndex1 = -1
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
                  this.tabrow.department = this.DepartmentList.find(e => e.value == this.tabrow.departmentId)?.text;
               }
               if (this.tabrow.employeeId) {
                  this.tabrow.employee = this.EmployeeList.find(e => e.value == this.tabrow.employeeId)?.text;
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
               TimesheetService.Update(this.Data)
                  .then(() => {
                     this.makeToast(this.$t('SaveSuccess'), 'success');
                     this.$router.push({ name: 'EmployeeSendTrain' });
                  })
                  .catch((err) => {
                     this.makeToast(this.$t(err), 'danger');
                  }).finally(() => {
                     this.saveLoading = false;
                  })
            }
         });
      }
   }
};
</script>

<style>
.table1 table td {
   min-width: 200px;
   max-width: 600px;
}
</style>