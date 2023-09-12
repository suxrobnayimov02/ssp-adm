<template>
   <b-card no-body>
      <div class="m-2">
         <b-row>
            <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
               <v-select v-model="filter.pageSize" :options="filter.perPageOptions" :clearable="false" @input="Refresh" />
            </b-col>
            <b-col md="2"></b-col>
            <b-col cols="12" md="4">
               <b-input-group class="text-right">
                  <b-form-input v-model="filter.search" :placeholder="$t('search')" />
                  <b-input-group-append>
                     <b-button @click="Refresh" variant="primary">
                        <feather-icon icon="SearchIcon" />
                     </b-button>
                  </b-input-group-append>
               </b-input-group>
            </b-col>
         </b-row>
      </div>

      <b-table
         ref="refInvoiceListTable"
         :items="items"
         responsive
         :fields="fields"
         primary-key="id"
         sticky-header="65vh"
         no-border-collapse
         :busy="isBusy"
         select-mode="single"
         :selectable="selectable"
         show-empty
         :empty-text="$t('NotFound')"
         class="position-relative"
         @sort-changed="SortChange"
         @row-dblclicked="(e) => $emit('row-selected', e)"
         @row-selected="(e) => (selectedRows = e)"
      >
         <template #cell(status)="{ item }">
            <b-badge :variant="getColor(item)">{{ item.status }}</b-badge>
         </template>
         <template v-slot:table-busy>
            <div class="text-center text-primary my-2" style="vertical-align: middle">
               <b-spinner class="align-middle mr-2"></b-spinner>
               <strong>{{ $t('Loading') }}</strong>
            </div>
         </template>
      </b-table>
      <div class="mx-2 mb-2">
         <b-row>
            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
               <span class="text-muted"> {{ $t('Showing') }} {{ firstNumber }} {{ $t('to') }} {{ lastNumber }} {{ $t('of') }} {{ filter.total }} {{ $t('entries') }} </span>
            </b-col>
            <!-- Pagination -->
            <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
               <b-pagination
                  v-model="filter.page"
                  :total-rows="filter.total"
                  :per-page="filter.pageSize"
                  first-number
                  last-number
                  @input="Refresh"
                  class="mb-0 mt-1 mt-sm-0"
                  prev-class="prev-item"
                  next-class="next-item"
               >
                  <template #prev-text>
                     <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                     <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
               </b-pagination>
            </b-col>
         </b-row>
         <b-row v-if="selectable">
            <b-col cols="12" class="text-center" >
               <b-button :disabled="selectedRows.length < 1" variant="outline-success" @click="(e) => $emit('row-selected', selectedRows[0])">
                  <feather-icon icon="PlusIcon"></feather-icon> {{ $t('Add') }}
               </b-button>
            </b-col>
         </b-row>
      </div>
   </b-card>
</template>

<script>
import { BSpinner, BButton, BPagination, BTable, BCol, BRow, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend, VBTooltip, BModal, BLink, BCardText } from 'bootstrap-vue';

import EmployeeManageService from '@/services/hrm/employeemanage.service';

export default {
   components: {
      BButton,
      BPagination,
      BTable,
      BCol,
      BRow,
      BSpinner,
      BCard,
      BTooltip,
      BBadge,
      BInputGroup,
      BFormInput,
      BInputGroupAppend,
      BModal,
      BLink,
      BCardText
   },
   emits: ['row-selected'],
   props: ['selectable'],
   directives: {
      'b-tooltip': VBTooltip
   },
   data() {
      return {
         selectedRows: [],
         items: [],
         fields: [
            {
               key: 'id',
               label: this.$t('id'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            },
            {
               key: 'empAppointOrderType',
               label: this.$t('empAppointOrderType'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'department',
               label: this.$t('Department'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            },
            {
               key: 'employmentType',
               label: this.$t('employmentType'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            },
            {
               key: 'employee',
               label: this.$t('employee'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'organization',
               label: this.$t('organization'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'position',
               label: this.$t('position'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'workSchedule',
               label: this.$t('workSchedule'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'employeeRate',
               label: this.$t('employeeRate'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'startOn',
               label: this.$t('startOn'),
               thClass: 'text-center',
               tdClass: 'text-center'
            },
            {
               key: 'endOn',
               label: this.$t('endOn'),
               thClass: 'text-center',
               tdClass: 'text-center'
            }
         ],
         filter: {
            search: '',
            sortBy: '',
            orderType: 'asc',
            page: 1,
            pageSize: 20,
            perPageOptions: [10, 20, 50, 100],
            total: 0,
            organizationId: 0
         },
         isBusy: false
      };
   },
   computed: {
      firstNumber() {
         return (this.filter.page - 1) * this.filter.pageSize + 1;
      },
      lastNumber() {
         if (this.filter.total < this.filter.pageSize) {
            return this.filter.total;
         } else {
            if (this.filter.page * this.filter.pageSize > this.filter.total) {
               return this.filter.total;
            } else {
               return this.filter.page * this.filter.pageSize;
            }
         }
      }
   },
   created() {
      this.Refresh();
   },
   methods: {
      SortChange(data) {
         this.filter.sortBy = data.sortBy;
         this.filter.orderType = data.sortDesc ? 'desc' : 'asc';
         this.Refresh();
      },
      Refresh() {
         this.isBusy = true;
         EmployeeManageService.GetList(this.filter)
            .then((res) => {
               this.items = res.data.rows;
               this.filter.total = res.data.total;
            })
            .finally(() => {
               this.isBusy = false;
            });
      }
   }
};
</script>

<style>
.table.b-table > tbody .b-table-row-selected.table-active td {
   background-color: #8effc3 !important
}
</style>
