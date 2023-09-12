<template>
   <b-overlay :show="show">
      <b-row>
         <b-col sm="12" md="12" lg="12">
            <b-card>
               <validation-observer ref="ValidationDTO">
                  <b-row>
                     <b-col sm="12" md="4">
                        <div class="form-group">
                           <form-input
                              v-model="Data.docNumber"
                              rules="required"
                              :label="$t('docnumber')"
                           />
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
                           small
                           responsive="sm"
                           :items="Data.tables"
                           hover
                           show-empty
                           bordered
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
            <b-row align-v="center">
               <b-col sm="12" md="6">
                  <form-select
                     :options="DepartmentList"
                     v-model="tabrow.departmentId"
                     :label="$t('Department')"
                  />
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <EmployeeManageSelect
                     v-model="tabrow.employeeManageId"
                     :employee="tabrow.employee"
                     :label="$t('employeeManage')"
                     @update:data="onUpdateEmployeeManage"
                  />
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
                     v-model="tabrow.endOn"
                     :label="$t('enddate')"
                     :placeholder="$t('enddate')"
                  ></form-picker>
               </b-col>
               <b-col sm="12" md="6">
                  <b-form-checkbox v-model="tabrow.isWithOutPay">{{ $t('isWithOutPay') }}</b-form-checkbox>
               </b-col>
               <b-col sm="12" md="6">
                  <form-input disabled v-model="tabrow.days" :label="$t('days')" />
               </b-col>
               <b-col sm="12" md="6">
                  <form-input
                     :disabled="tabrow.isWithOutPay"
                     v-model="tabrow.addPayDays"
                     :label="$t('addPayDays')"
                  />
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <form-picker
                     v-model="tabrow.forPeriodStartOn"
                     :disabled="tabrow.isWithOutPay"
                     :label="$t('forPeriodStartOn')"
                     :placeholder="$t('forPeriodStartOn')"
                  ></form-picker>
               </b-col>
               <b-col sm="12" md="6" class="mb-1">
                  <form-picker
                     v-model="tabrow.forPeriodEndOn"
                     :disabled="tabrow.isWithOutPay"
                     :label="$t('forPeriodEndOn')"
                     :placeholder="$t('forPeriodEndOn')"
                  ></form-picker>
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
import EmployeeLeaveOrderService from '@/services/hrm/employeeleaveorder.service';
import DepartmentService from '@/services/info/department.service';
// components
import { BOverlay, BCard, BRow, BCol, BFormInput, BTable, BButton, BLink, BFormGroup, BModal, BInputGroup, BInputGroupAppend, BFormCheckbox, BFormTextarea } from 'bootstrap-vue';
import EmployeeManageSelect from '@/views/components/hrm/EmployeeManageSelect.vue';

const defaultTableRow = {
   id: 0,
   startOn: '',
   endOn: '',
   details: '',
   departmentId: null,
   positionId: null,
   employeeId: null,
   employeeManageId: null,
   tempEmployeeManageId: null,
   isWithOutPay: true,
   days: 0,
   addPayDays: 0,
   forPeriodStartOn: '',
   forPeriodEndOn: ''
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
      BFormTextarea
   },
   name: 'Edit',
   data() {
      return {
         show: false,
         DepartmentList: [],
         loadingButton: false,
         TabrowModal: false,
         saveLoading: false,
         Data: {
            id: null,
            docNumber: null,
            docOn: null,
            details: null,
            tables: []
         },
         tabrow: { ...defaultTableRow },
         TablesField: [
            {
               key: 'department',
               label: this.$t('Department')
            },
            {
               key: 'employee',
               label: this.$t('employee'),
               sortable: true
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
               key: 'isWithOutPay',
               label: this.$t('isWithOutPay')
            },
            {
               key: 'days',
               label: this.$t('days')
            },
            {
               key: 'addPayDays',
               label: this.$t('addPayDays')
            },
            {
               key: 'forPeriodStartOn',
               label: this.$t('forPeriodStartOn')
            },
            {
               key: 'forPeriodEndOn',
               label: this.$t('forPeriodEndOn')
            },
            {
               key: 'details',
               label: this.$t('details')
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
      EmployeeLeaveOrderService.Get(this.$route.params.id)
         .then(res => {
            this.Data = res.data;
            if (!Array.isArray(res.data?.tables)) {
               this.Data.tables = [];
            }
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
   },
   watch: {
      'tabrow.startOn': function() {
         this.calcDays();
      },
      'tabrow.endOn': function() {
         this.calcDays();
      }
   },
   methods: {
      calcDays() {
         if (this.tabrow.startOn && this.tabrow.endOn) {
            // EmployeeLeaveOrder/GetCalculatedDays?employeeManageId=5&startDate=01.07.2023&endDate=22.07.2023
            // api bilan boglash kerak
            let date1 = this.tabrow.endOn;
            date1 = new Date(date1.split('.')[2], date1.split('.')[1] - 1, date1.split('.')[0]);
            let date2 = this.tabrow.startOn;
            date2 = new Date(date2.split('.')[2], date2.split('.')[1] - 1, date2.split('.')[0]);
            const timeDiff = Math.abs(date2.getTime() - date1.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            this.tabrow.days = diffDays;
         } else {
            this.tabrow.days = 0;
         }
      },
      onUpdateEmployeeManage(e) {
         this.tabrow.employeeId = e?.employeeId;
         this.tabrow.employee = e?.employee;
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

               if (this.tabrow.positionId) {
                  this.tabrow.position = this.PositionList.find(e => e.value == this.tabrow.positionId)?.text;
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
               EmployeeLeaveOrderService.Update(this.Data)
                  .then(res => {
                     this.makeToast(this.$t('SaveSuccess'), 'success');
                     this.$router.push({ name: 'EmployeeLeaveOrder' });
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
