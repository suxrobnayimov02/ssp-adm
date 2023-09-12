<template>
   <b-overlay :show="show">
      <b-row>
         <b-col sm="12" md="12" lg="12">
            <b-card>
               <validation-observer ref="ValidationDTO">
                  <b-row>
                     <b-col sm="12" md="4">
                        <div class="form-group">
                           <form-input v-model="Data.docNumber" required :label="$t('docnumber')" />
                        </div>
                     </b-col>
                     <b-col sm="12" md="4">
                        <form-picker
                           v-model="Data.docOn"
                           rules="required"
                           :label="$t('docOn')"
                           :placeholder="$t('docOn')"
                        ></form-picker>
                     </b-col>
                     <b-col sm="12" md="12">
                        <b-form-textarea
                           id="textarea"
                           v-model="Data.details"
                           :placeholder="$t('detailinfo')"
                           rows="2"
                           max-rows="6"
                        ></b-form-textarea>
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
                        <b-table
                           :fields="TablesField"
                           bordered
                           small
                           responsive
                           :items="Data.tables"
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
                  <b-row>
                     <b-col sm="12" md="6" lg="6" class="text-left"></b-col>
                     <b-col sm="12" md="6" lg="6" class="text-right">
                        <b-button
                           :disabled="saveLoading"
                           @click="SaveData"
                           size="sm"
                           variant="outline-success"
                        >
                           <feather-icon icon="CheckIcon"></feather-icon>
                           {{ $t('Save') }}
                        </b-button>
                     </b-col>
                  </b-row>
               </validation-observer>
            </b-card>
         </b-col>
      </b-row>
      <b-modal size="lg" v-model="TabrowModal" no-close-on-backdrop hide-footer>
         <validation-observer ref="ValidationTabrow">
            <b-row>
               <b-col sm="12" md="6">
                  <form-select
                     :options="EmpAppointOrderTypeList"
                     v-model="tabrow.empAppointOrderTypeId"
                     required-star
                     :label="$t('empAppointOrderType')"
                  ></form-select>
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <EmployeeManageSelect
                     v-if="[3, 2, 4].includes(tabrow.empAppointOrderTypeId)"
                     :employee="tabrow.employee"
                     v-model="tabrow.employeeManageId"
                     :label="$t('employeeManage')"
                     @update:data="onUpdateEmployeeManage"
                  />
               </b-col>
               <b-col sm="12" md="6">
                  <EmployeeSelect2
                     v-if="[1].includes(tabrow.empAppointOrderTypeId)"
                     v-model="tabrow.employeeId"
                     @update:data="onUpdateEmployee"
                     required-star
                  />
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <form-input v-model="tabrow.orderNumber" required :label="$t('code')" />
               </b-col>
               <b-col sm="12" md="6">
                  <form-picker
                     v-model="tabrow.startOn"
                     :label="$t('startdate')"
                     rules="required"
                     :placeholder="$t('startdate')"
                  ></form-picker>
               </b-col>
               <b-col sm="12" md="6">
                  <form-picker
                     v-if="[1, 2, 4].includes(tabrow.empAppointOrderTypeId)"
                     v-model="tabrow.endOn"
                     :label="$t('enddate')"
                     :placeholder="$t('enddate')"
                  ></form-picker>
               </b-col>

               <template v-if="[1, 2, 4].includes(tabrow.empAppointOrderTypeId)">
                  <b-col sm="12" md="6">
                     <form-select
                        :disabled="[4].includes(tabrow.empAppointOrderTypeId)"
                        :options="EmploymentTypeList"
                        v-model="tabrow.employmentTypeId"
                        required-star
                        :label="$t('employmentType')"
                     ></form-select>
                  </b-col>
                  <b-col sm="12" md="6">
                     <form-select
                        :disabled="[4].includes(tabrow.empAppointOrderTypeId)"
                        :options="WorkScheduleList"
                        v-model="tabrow.workScheduleId"
                        required-star
                        :label="$t('workSchedule')"
                     ></form-select>
                  </b-col>
               </template>

               <b-col sm="12" md="6">
                  <form-select
                     v-if="[2, 3, 4].includes(tabrow.empAppointOrderTypeId)"
                     disabled
                     :options="DepartmentList"
                     v-model="tabrow.fromDepartmentId"
                     :label="$t('fromDepartment')"
                  ></form-select>
               </b-col>
               <b-col sm="12" md="6">
                  <form-select
                     v-if="[1, 2, 4].includes(tabrow.empAppointOrderTypeId)"
                     :options="DepartmentList"
                     v-model="tabrow.departmentId"
                     :label="$t('Department')"
                  ></form-select>
               </b-col>
               <b-col sm="12" md="6">
                  <form-select
                     v-if="[2, 3, 4].includes(tabrow.empAppointOrderTypeId)"
                     disabled
                     :options="PositionList"
                     v-model="tabrow.fromPositionId"
                     :label="$t('fromPosition')"
                  ></form-select>
               </b-col>
               <b-col sm="12" md="6">
                  <form-select
                     v-if="[1, 2, 4].includes(tabrow.empAppointOrderTypeId)"
                     :options="PositionList"
                     v-model="tabrow.positionId"
                     :label="$t('position')"
                  ></form-select>
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <form-input
                     v-if="[2, 3, 4].includes(tabrow.empAppointOrderTypeId)"
                     disabled
                     v-model="tabrow.fromEmployeeRate"
                     required
                     type="number"
                     :label="$t('fromEmployeeRate')"
                  />
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <form-input
                     v-if="[1, 2, 4].includes(tabrow.empAppointOrderTypeId)"
                     v-model="tabrow.employeeRate"
                     required
                     type="number"
                     :label="$t('employeeRate')"
                  />
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <EmployeeManageSelect
                     v-if="[2, 3, 4].includes(tabrow.empAppointOrderTypeId)"
                     v-model="tabrow.fromEmployeeManageId"
                     :label="$t('fromEmployeeManage')"
                  />
               </b-col>
               <b-col sm="12" md="12">
                  <b-form-textarea
                     v-model="tabrow.details"
                     :placeholder="$t('detailinfo')"
                     rows="2"
                     max-rows="6"
                  ></b-form-textarea>
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
   </b-overlay>
</template>
<script>
// service
import ManualService from '@/services/others/manual.service';
import AppointEmployeeService from '@/services/hrm/appointemployee.service';
import PositionService from '@/services/info/position.service';
import DepartmentService from '@/services/info/department.service';
import WorkScheduleService from '@/services/info/workschedule.service';
// components
import { BOverlay, BCard, BRow, BCol, BFormInput, BTable, BButton, BLink, BFormGroup, BModal, BInputGroup, BInputGroupAppend, BFormCheckbox, BFormTextarea } from 'bootstrap-vue';
import EmployeeManageSelect from '@/views/components/hrm/EmployeeManageSelect.vue';
import EmployeeSelect2 from '@/views/components/employee/EmployeeSelect2.vue';

const defaultTableRow = {
   id: 0,
   orderNumber: null,
   startOn: '',
   endOn: '',
   empAppointOrderTypeId: 1,
   details: '',
   departmentId: null,
   positionId: null,
   employeeId: null,
   employmentTypeId: null,
   employeeRate: null,
   workScheduleId: null,
   employeeManageId: 0,
   fromDepartmentId: null,
   fromPositionId: null,
   fromEmployeeManageId: null,
   fromEmployeeRate: null
};

export default {
   components: {
      BOverlay,
      BCard,
      BRow,
      BCol,
      BFormInput,
      BButton,
      BTable,
      BLink,
      BFormGroup,
      BModal,
      BInputGroup,
      BInputGroupAppend,
      BFormCheckbox,
      EmployeeManageSelect,
      BFormTextarea,
      EmployeeSelect2
   },
   name: 'Edit',
   data() {
      return {
         show: false,
         PositionList: [],
         DepartmentList: [],
         EmploymentTypeList: [],
         WorkScheduleList: [],
         EmpAppointOrderTypeList: [],
         loadingButton: false,
         TabrowModal: false,
         saveLoading: false,
         Data: {
            id: null,
            docNumber: null,
            docOn: null,
            details: null
         },
         tabrow: { ...defaultTableRow },
         TablesField: [
            {
               key: 'orderNumber',
               label: this.$t('code'),
               sortable: true
            },
            {
               key: 'employee',
               label: this.$t('employee'),
               sortable: true
            },
            {
               key: 'empAppointOrderType',
               label: this.$t('empAppointOrderType'),
               sortable: true
            },
            {
               key: 'department',
               label: this.$t('Department'),
               sortable: true
            },
            {
               key: 'employmentType',
               label: this.$t('employmentType'),
               sortable: true
            },
            {
               key: 'position',
               label: this.$t('position'),
               sortable: true
            },
            {
               key: 'workSchedule',
               label: this.$t('workSchedule')
            },
            {
               key: 'startOn',
               label: this.$t('startdate')
            },
            {
               key: 'endOn',
               label: this.$t('enddate')
            },
            {
               key: 'employeeRate',
               label: this.$t('employeeRate'),
               sortable: true
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
      AppointEmployeeService.Get(this.$route.params.id)
         .then(res => {
            this.Data = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.errors, 'danger');
         })
         .finally(() => {
            this.show = false;
         });

      DepartmentService.GetAsSelectList({})
         .then(res => {
            const { rows } = res.data;
            if (Array.isArray(rows)) {
               this.DepartmentList = rows;
            }
         })
         .catch(error => {
            this.makeToast(error.response.data.errors, 'danger');
         });

      WorkScheduleService.GetAsSelectList()
         .then(res => {
            this.WorkScheduleList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.errors, 'danger');
         });

      ManualService.EmpAppointOrderTypeSelectList()
         .then(res => {
            this.EmpAppointOrderTypeList = res.data;
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
   },
   watch: {
      'tabrow.empAppointOrderTypeId': function(newVal) {
         this.tabrow = { ...defaultTableRow, empAppointOrderTypeId: newVal };
      }
   },
   methods: {
      onUpdateEmployeeManage(e) {
         this.tabrow.employeeId = e?.employeeId;
         this.tabrow.employee = e?.employee;
         this.tabrow.fromEmployeeRate = e?.employmentRate;
         this.tabrow.fromPositionId = e?.positionId;
         this.tabrow.fromPosition = e?.position;
         this.tabrow.fromDepartmentId = e?.departmentId;
         this.tabrow.fromDepartment = e?.department;
      },
      onUpdateEmployee(e) {
         this.tabrow.employee = e?.fullName;
      },
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
         this.$refs.ValidationTabrow.validate().then(success => {
            if (success) {
               if (this.tabrow.departmentId) {
                  this.tabrow.department = this.DepartmentList.find(e => e.value == this.tabrow.departmentId)?.text;
               }
               if (this.tabrow.empAppointOrderTypeId) {
                  this.tabrow.empAppointOrderType = this.EmpAppointOrderTypeList.find(e => e.value == this.tabrow.empAppointOrderTypeId)?.text;
               }
               if (this.tabrow.employmentTypeId) {
                  this.tabrow.employmentType = this.EmploymentTypeList.find(e => e.value == this.tabrow.employmentTypeId)?.text;
               }
               if (this.tabrow.positionId) {
                  this.tabrow.position = this.PositionList.find(e => e.value == this.tabrow.positionId)?.text;
               }
               if (this.tabrow.workScheduleId) {
                  this.tabrow.workSchedule = this.WorkScheduleList.find(e => e.value == this.tabrow.workScheduleId)?.text;
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
         this.$refs.ValidationDTO.validate().then(success => {
            if (success) {
               this.saveLoading = true;
               AppointEmployeeService.Update(this.Data)
                  .then(res => {
                     this.makeToast(this.$t('SaveSuccess'), 'success');
                     this.$router.push({ name: 'AppointEmployee' });
                  })
                  .catch(err => {
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
<style scoped>
input {
   margin: 0.4rem;
}
</style>
