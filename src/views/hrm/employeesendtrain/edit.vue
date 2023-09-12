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
                        <form-picker v-model="Data.docOn" :label="$t('docOn')" :placeholder="$t('docOn')"></form-picker>
                     </b-col>
                     <b-col sm="12" md="12">
                        <b-form-textarea id="textarea" v-model="Data.details" :placeholder="$t('detailinfo')" rows="2" max-rows="6"></b-form-textarea>
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
                        <b-table :fields="TablesField" small responsive="sm" :items="Data.tables" hover show-empty bordered  :empty-text="$t('NotFound')">
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
                  <form-picker v-model="tabrow.endOn" :label="$t('enddate')" required :placeholder="$t('endOn')"></form-picker>
               </b-col>
               <b-col sm="12" md="6">
                  <EmployeeSelect2  v-model="tabrow.employeeId" @update:data="onUpdateEmployee" required-star />
               </b-col>
               <b-col sm="12" md="6">
                  <form-select :options="DepartmentList" v-model="tabrow.departmentId" :label="$t('Department')"></form-select>
               </b-col>
               <b-col sm="12" md="12">
                  <b-form-textarea v-model="tabrow.details" :placeholder="$t('detailinfo')" rows="2" max-rows="6"></b-form-textarea>
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
import EmployeeSendTrainService from '@/services/hrm/employeesendtrain.service';
import DepartmentService from '@/services/info/department.service';
import EmployeeService from '@/services/info/employee.service';
// components
import EmployeeSelect2 from '@/views/components/employee/EmployeeSelect2.vue';
import {
   BOverlay,
   BCard,
   BRow,
   BCol,
   BFormInput,
   BTable,
   BButton,
   BLink,
   BFormGroup,
   BModal,
   BInputGroup,
   BInputGroupAppend,
   BFormTextarea
} from 'bootstrap-vue';

const defaultTableRow = {
   id: 0,
   department: '',
   departmentId: null,
   employee: '',
   employeeId: null,
   details: '',
   startOn: '',
   endOn: '',
}

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
      BFormTextarea,
      EmployeeSelect2
   },
   name: 'Edit',
   data() {
      return {
         show: false,
         DepartmentList: [],
         EmployeeList: [],
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
               key: 'department',
               label: this.$t('Department'),
               sortable: true
            },
            {
               key: 'employee',
               label: this.$t('employee'),
               sortable: true
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
      this.show = true;
      EmployeeSendTrainService.Get(this.$route.params.id)
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
   },
   methods: {
      onUpdateEmployee(e) {
         this.tabrow.employee = e?.fullName;
      },
      DeleteTabrow(index) {
         this.Data.tables.splice(index, 1);
      },
      OpenTabrow() {
         this.TabrowModal = true;
         this.tabrow = { ...defaultTableRow }
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
               if(this.tabrow.departmentId){
                  this.tabrow.department=this.DepartmentList.find(e=>e.value==this.tabrow.departmentId)?.text;
               }
               if(this.tabrow.employeeId){
                  this.tabrow.employee=this.EmployeeList.find(e=>e.value==this.tabrow.employeeId)?.text;
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
               EmployeeSendTrainService.Update(this.Data)
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