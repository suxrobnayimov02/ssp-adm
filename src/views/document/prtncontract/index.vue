<template>
   <b-card no-body>
      <div class="m-2">
         <b-row align-h="between">
            <!-- <b-col
          cols="12"
          md="2"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
            v-if="$can('PrtnContractEdit', 'permissions')"
            variant="primary"
            @click="Create()"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
          </b-button>
            </b-col>-->
            <b-col sm="12" md="2">
               <div>
                  <form-select
                     :options="RegionList"
                     v-model="filter.regionId"
                     @input="ChangeRegion"
                     :label="$t('Oblast')"
                  ></form-select>
                  <!-- :disabled="!$can('PrtnContractViewByRegion', 'permissions')" -->

                  <!-- <label for>{{ $t("Oblast") }}</label>
            <v-select
              :options="RegionList"
              :reduce="(item) => item.value"
              :placeholder="$t('ChooseBelow')"
              label="text"
              :disabled="$can("PrtnContractViewByRegion", "permissions") ? true: false"
              v-model="filter.regionId"
              @input="ChangeRegion"
              class="w-100"
                  ></v-select>-->
               </div>
            </b-col>
            <b-col sm="12" md="2">
               <div>
                  <label for>{{ $t("Region") }}</label>
                  <v-select
                     :options="DistrictList"
                     :reduce="(item) => item.value"
                     :placeholder="$t('ChooseBelow')"
                     label="text"
                     v-model="filter.districtId"
                     @input="ChangeDistrict"
                     class="w-100"
                  ></v-select>
               </div>
            </b-col>
            <b-col sm="12" md="2">
               <div>
                  <label for>{{ $t("mfy") }}</label>
                  <v-select
                     :options="MfyList"
                     :reduce="(item) => item.value"
                     :placeholder="$t('ChooseBelow')"
                     label="text"
                     v-model="filter.mfyId"
                     @input="Refresh"
                     class="w-100"
                  ></v-select>
               </div>
            </b-col>
            <b-col sm="12" md="2">
               <div>
                  <label for>{{ $t("inn") }}</label>
                  <b-form-input v-model="filter.contractorInn" :placeholder="$t('inn')"></b-form-input>
               </div>
            </b-col>
            <b-col sm="12" md="2">
               <div>
                  <form-input v-model="filter.okedCode" :label="$t('Oked')" mask="#####" />
                  <!-- <form-select
                        :options="OkedList"
                        v-model="filter.okedId"
                        @input="Refresh"

                        :label="$t('oked')"
                  ></form-select>-->
                  <!-- :disabled="!$can('ApplicationViewByRegion', 'permissions')" -->
               </div>
            </b-col>
            <b-col sm="12" md="2">
               <div>
                  <label for>{{ $t("prtnContractType") }}</label>
                  <v-select
                     :options="ContractTypeList"
                     :reduce="(item) => item.value"
                     :placeholder="$t('ChooseBelow')"
                     label="text"
                     v-model="filter.prtnContractTypeId"
                     class="w-100"
                  ></v-select>
               </div>
            </b-col>
         </b-row>
         <b-row align-h="between" align-v="center">
            <b-col cols="12" md="7" class="mt-2">
               <div>
                  <b-button-group @click="Refresh" size="sm">
                     <b-button
                        @click="filter.statusId = null"
                        :variant="
                  filter.statusId == null ? 'primary' : 'outline-primary'
                "
                     >{{ $t("all") }}</b-button>
                     <b-button
                        @click="filter.statusId = 31"
                        :variant="filter.statusId == 31 ? 'primary' : 'outline-primary'"
                     >{{ $t("sendToExpertise") }}</b-button>
                     <b-button
                        @click="filter.statusId = 28"
                        :variant="filter.statusId == 28 ? 'primary' : 'outline-primary'"
                     >{{ $t("PassExpertise") }}</b-button>
                     <b-button
                        @click="filter.statusId = 29"
                        :variant="filter.statusId == 29 ? 'primary' : 'outline-primary'"
                     >{{ $t("NotPassExpertise") }}</b-button>
                     <b-button
                        @click="filter.statusId = 27"
                        :variant="filter.statusId == 27 ? 'primary' : 'outline-primary'"
                     >{{ $t("totalPrtnApplicationSignningCount") }}</b-button>
                     <b-button
                        @click="filter.statusId = 21"
                        :variant="filter.statusId == 21 ? 'primary' : 'outline-primary'"
                     >{{ $t("totalPrtnApplicationSignedCount") }}</b-button>
                     <!-- <b-button
                @click="filter.statusId = 2"
                :variant="filter.statusId == 2 ? 'primary' : 'outline-primary'"
                     >{{ $t("accept") }}</b-button>-->
                     <b-button
                        @click="filter.statusId = 25"
                        :variant="filter.statusId == 25 ? 'primary' : 'outline-primary'"
                     >{{ $t("rejects") }}</b-button>
                  </b-button-group>
               </div>
            </b-col>

            <b-col cols="12" lg="3" md="3" class="text-right mt-2">
               <!-- <label>{{ $t("search") }}</label> -->
               <b-input-group class="text-right">
                  <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
                  <b-input-group-append>
                     <b-button @click="Refresh" variant="primary">
                        <feather-icon icon="SearchIcon" />
                     </b-button>
                     <b-button @click="Print" variant="primary" class="ml-1">
                        <feather-icon icon="PrinterIcon"></feather-icon>
                        <!-- {{ $t("Print") }} -->
                     </b-button>
                  </b-input-group-append>
               </b-input-group>
            </b-col>
            <!-- <b-col class="mt-2" md="1">
         
            </b-col>-->
         </b-row>
         <b-row v-if="filter.statusId ==21 || filter.statusId ==0">
            <b-col cols="12" md="7" class="mt-2">
               <div>
                  <b-button-group @click="Refresh" size="sm">
                     <b-button
                        @click="filter.hasCertificate = null"
                        :variant="
                  filter.hasCertificate == null ? 'primary' : 'outline-primary'
                "
                     >{{ $t("all") }}</b-button>
                     <b-button
                        @click="filter.hasCertificate= true"
                        :variant="filter.hasCertificate == true ? 'primary' : 'outline-primary'"
                     >{{ $t("hasCertificate") }}</b-button>
                     <b-button
                        @click="filter.hasCertificate = false"
                        :variant="filter.hasCertificate == false ? 'primary' : 'outline-primary'"
                     >{{ $t("hasNotCertificate") }}</b-button>
                  </b-button-group>
               </div>
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
         show-empty
         :empty-text="$t('NotFound')"
         class="position-relative"
         @row-dblclicked="Edit"
         @row-clicked="rowclicked"
         @sort-changed="SortChange"
      >
         <template #cell(status)="{ item }">
            <b-badge :variant="getColor(item)">{{ item.status }}</b-badge>
         </template>

         <template #cell(oked)="{ item }">{{ item.okedCode }} - {{ item.oked }}</template>
         <template #cell(prtnCertificateStatus)="{ item }">
            <b-badge :variant="getColorStatus(item)">
               {{
               item.prtnCertificateStatus
               }}
            </b-badge>
         </template>
         <template #cell(signed)="{ item }">
            <div v-for="(el, index) in item.signed" :key="index">
               <!-- <b-badge variant="primary"> -->
               {{ el.fullName }},
               <!-- </b-badge> -->
            </div>
         </template>
         <template #cell(notSigned)="{ item }">
            <div v-for="(el, index) in item.notSigned" :key="index">
               <!-- <b-badge variant="primary"> -->
               {{ el.fullName }},
               <!-- </b-badge> -->
            </div>
         </template>
         <!-- <template #cell(contractor)="{ item }">{{ item.contractorInn }} - {{ item.contractor }}</template> -->
         <template #cell(actions)="{ item }">
            <b-link
               :to="{ name: 'ViewPrtnContract', params: { id: item.id } }"
               v-b-tooltip.hover.top="$t('View')"
               style="margin-right: 5px"
            >
               <feather-icon icon="EyeIcon"></feather-icon>
            </b-link>

            <!-- <b-link
          v-b-tooltip.hover.top="$t('AplicationEdit')"
          @click="Edit(item)"
          style="margin-right: 5px"
        >
          <feather-icon icon="EyeIcon"></feather-icon>
            </b-link>-->

            <!-- <b-link
          v-if="item.statusid != 2 && $can('PrtnContractEdit', 'permissions')"
          v-b-tooltip.hover.top="$t('Edit')"
          @click="Edit(item)"
          style="margin-right: 5px"
        >
          <feather-icon icon="EditIcon"></feather-icon>
            </b-link>-->
            <b-link
               v-if="
            item.statusId == 21 &&
            $can('PrtnCertificateCreate', 'permissions') &&
            item.prtnCertificateStatusId != 26
          "
               v-b-tooltip.hover.top="$t('GetSertificate')"
               @click="CertificateGet(item)"
               style="margin-right: 5px"
            >
               <feather-icon icon="FileIcon"></feather-icon>
            </b-link>
            <b-link
               v-if="
            item.statusId != 2 && $can('PrtnContractApprove', 'permissions')
          "
               @click="$refs['ApproveModal' + item.id].show()"
               v-b-tooltip.hover.top="$t('Approve')"
               style="margin-right: 5px"
            >
               <feather-icon icon="CheckIcon"></feather-icon>
            </b-link>
            <b-link
               v-if="
            item.statusid != 3 &&
            item.statusid != 1 &&
            item.statusid != 4 &&
            $can('PrtnContractCancelApproval', 'permissions')
          "
               @click="$refs['CancelModal' + item.id].show()"
               v-b-tooltip.hover.top="$t('CancelApproval')"
               style="margin-right: 5px"
            >
               <feather-icon icon="XCircleIcon"></feather-icon>
            </b-link>
            <b-link
               @click="OpenHistory(item)"
               style="margin-right: 5px"
               v-b-tooltip.hover.top="$t('history')"
            >
               <b-icon-clock-history></b-icon-clock-history>
            </b-link>
            <!-- <b-link
          v-if="item.statusId == 2 || item.statusId == 25"
          @click="GetMfyApplication(item)"
          style="margin-right: 5px"
          v-b-tooltip.hover.top="$t('mfyApplication')"
        >
          <feather-icon icon="FolderIcon"></feather-icon>
            </b-link>-->
            <!-- <b-link
          v-if="item.statusid != 2 && $can('PrtnContractDelete', 'permissions')"
          @click="$refs['DeleteModal' + item.id].show()"
          style="margin-right: 5px"
          v-b-tooltip.hover.top="$t('Delete')"
        >
          <feather-icon icon="Trash2Icon"></feather-icon>
            </b-link>-->
            <b-modal size="xl" v-model="mfyApplication" hide-footer :title="$t('mfyApplication')">
               <b-row>
                  <b-col md="6" sm="6" lg="6">
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("id") }}:</label>
                        <span>{{ MfyApplicationData.id }}</span>
                     </b-col>
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("applicationId") }}:</label>
                        <span>{{ MfyApplicationData.applicationId }}</span>
                     </b-col>
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("createdAt") }}:</label>
                        <span>{{ MfyApplicationData.createdAt }}</span>
                     </b-col>
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("conclusingPersonFio") }}:</label>
                        <span>{{ MfyApplicationData.conclusingPersonFio }}</span>
                     </b-col>
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("conclusingPersonPosition") }}:</label>
                        <span>{{ MfyApplicationData.conclusingPersonPosition }}</span>
                     </b-col>

                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("conclusingPersonInn") }}:</label>
                        <span>{{ MfyApplicationData.conclusingPersonInn }}</span>
                     </b-col>
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("conclusingPersonPhone") }}:</label>
                        <span>{{ MfyApplicationData.conclusingPersonPhone }}</span>
                     </b-col>

                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("details") }}:</label>
                        <span>{{ MfyApplicationData.details }}</span>
                     </b-col>
                     <b-col md="12" sm="12" lg="12" class="mb-1">
                        <label style="font-weight: bold">{{ $t("isAccepted") }}:</label>
                        <span>{{ MfyApplicationData.isAccepted ? $t("yes") : $t("no") }}</span>
                     </b-col>
                  </b-col>
                  <b-col md="6" sm="6" lg="6">
                     <img :src="MfyApplicationData.fileUrl" />
                  </b-col>
               </b-row>
            </b-modal>
            <b-modal
               :ref="'ApproveModal' + item.id"
               :cancel-title="$t('Approve')"
               :ok-title="$t('Approve')"
               cancel-variant="danger"
               ok-variant="success"
               @ok="Approve(item)"
            >
               <template #modal-title>
                  {{ $t("Approve") }}
                  <b-spinner v-if="ApproveLoading" small></b-spinner>
               </template>
               <b-card-text>
                  <h5>ID : {{ item.id }}</h5>
                  <h5>{{ $t("WantApprove") }}</h5>
               </b-card-text>
            </b-modal>
            <b-modal size="xl" :ref="'HistoryModal' + item.id" hide-footer :title="$t('history')">
               <b-table
                  :items="historyData"
                  :fields="historyFields"
                  responsive
                  no-border-collapse
                  :busy="isBusy"
                  show-empty
                  :empty-text="$t('NotFound')"
               >
                  <template #cell(FullName)="{ item }">{{ JSON.parse(item.userInfo).FullName }}</template>
                  <template #cell(status)="{ item }">
                     <b-badge :variant="getColor(item)">{{ item.status }}</b-badge>
                  </template>
               </b-table>
            </b-modal>
            <b-modal
               :ref="'CancelModal' + item.id"
               :title="$t('Approve')"
               :cancel-title="$t('Cancel')"
               :ok-title="$t('Accept')"
               cancel-variant="danger"
               ok-variant="success"
               @ok="CancelApproval(item)"
            >
               <b-card-text>
                  <h5>{{ $t("admissiontype") }} : {{ item.admissiontypename }}</h5>
                  <h5>{{ $t("WantCancel") }}</h5>
               </b-card-text>
            </b-modal>
            <b-modal
               :ref="'DeleteModal' + item.id"
               :cancel-title="$t('Cancel')"
               :ok-title="$t('Accept')"
               cancel-variant="danger"
               ok-variant="success"
               @ok="Delete(item)"
            >
               <template #modal-title>
                  {{ $t("Delete") }}
                  <b-spinner v-if="DeleteLoading" small></b-spinner>
               </template>
               <b-card-text>
                  <h5>ID : {{ item.id }}</h5>
                  <h5>{{ $t("WantDelete") }}</h5>
               </b-card-text>
            </b-modal>
         </template>
         <template v-slot:table-busy>
            <div class="text-center text-primary my-2" style="vertical-align: middle">
               <b-spinner class="align-middle mr-2"></b-spinner>
               <strong>{{ $t("Loading") }}</strong>
            </div>
         </template>
      </b-table>

      <div class="mx-2 mb-2">
         <b-row>
            <b-col
               cols="12"
               sm="6"
               class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
               <span class="text-muted">
                  {{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
                  {{ lastNumber }} {{ $t("of") }} {{ filter.total }}
                  {{ $t("entries") }}
               </span>
               <v-select
                  v-model="filter.pageSize"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="filter.pageOptions"
                  :clearable="false"
                  @input="Refresh"
                  class="per-page-selector d-inline-block ml-50 mr-1"
               />
            </b-col>
            <!-- Pagination -->
            <b-col
               cols="12"
               sm="6"
               class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
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
      </div>
   </b-card>
</template>

<script>
import {
   BButton,
   BPagination,
   BTable,
   BCol,
   VBTooltip,
   VBModal,
   BRow,
   BSpinner,
   BCard,
   BTooltip,
   BBadge,
   BInputGroup,
   BFormInput,
   BInputGroupAppend,
   BIconClockHistory,
   BLink,
   BModal,
   BCardText,
   BButtonGroup,
   BIcon
} from 'bootstrap-vue';
import PrtnContractService from '@/services/document/prtncontract.service';
import RegionService from '@/services/info/region.service';
import DistrictService from '@/services/info/district.service';
import ManualService from '@/services/others/manual.service';
import MfyService from '@/services/info/mfy.service';
import PrtnContractTypeService from '@/services/info/prtncontracttype.service';

export default {
   components: {
      BButton,
      BPagination,
      BTable,
      BCol,
      BRow,
      BIconClockHistory,
      BSpinner,
      BCard,
      BTooltip,
      BBadge,
      BInputGroup,
      BFormInput,
      BInputGroupAppend,
      BLink,
      BModal,
      BCardText,
      BButtonGroup,
      BIcon
   },
   name: 'Index',
   directives: {
      'b-tooltip': VBTooltip,
      'b-modal': VBModal
   },
   data() {
      return {
         items: [],
         ContractTypeList: [],
         RegionList: [],
         DistrictList: [],
         historyData: [],
         MfyList: [],
         MfyApplicationData: {},
         mfyApplication: false,
         historyFields: [
            {
               key: 'id',
               label: this.$t('id'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'FullName',
               label: this.$t('fullname'),
               sortable: false,
               tdClass: 'text-left',
               thClass: 'text-center'
            },
            {
               key: 'dateAt',
               label: this.$t('docdate'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'ipAddress',
               label: this.$t('ipAddress'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'message',
               label: this.$t('message'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'status',
               label: this.$t('status'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            }
         ],
         fields: [
            {
               key: 'id',
               label: this.$t('id'),
               sortable: true,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'docNumber',
               label: this.$t('docnumber'),
               sortable: true,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'docOn',
               label: this.$t('docOn'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'contractorRegion',
               label: this.$t('oblast'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'contractorDistrict',
               label: this.$t('region'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'prtnContractType',
               label: this.$t('prtnContractType'),
               sortable: false
            },
            {
               key: 'contractorInn',
               label: this.$t('inn'),
               sortable: false
            },
            {
               key: 'contractor',
               label: this.$t('contractorT'),
               sortable: false
            },
            {
               key: 'oked',
               label: this.$t('Oked'),
               sortable: false
            },
            {
               key: 'organization',
               label: this.$t('organizationT'),
               sortable: false
            },
            {
               key: 'signed',
               label: this.$t('signed'),
               sortable: false
            },
            {
               key: 'notSigned',
               label: this.$t('notSigned'),
               sortable: false
            },

            {
               key: 'status',
               label: this.$t('status'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'prtnCertificateStatus',
               label: this.$t('prtnCertificateStatus'),
               sortable: false,
               tdClass: 'text-center',
               thClass: 'text-center'
            },
            {
               key: 'actions',
               tdClass: 'text-center',
               thClass: 'text-center',
               label: this.$t('actions')
            }
         ],
         filter: {
            regionId: null,
            districtId: null,
            mfyId: null,
            hasCertificate: null,
            contractorInn: '',
            prtnContractTypeId: null,
            search: '',
            sortBy: '',
            orderType: 'asc',
            page: 1,
            pageSize: 20,
            statusId: null,
            okedCode: null,
            statusIds: [],
            pageOptions: [10, 20, 50, 100],
            total: 0
         },
         isBusy: false,
         DeleteLoading: false,
         lang: ''
      };
   },
   props: {
      // isOtm : {
      //   type :Boolean,
      //   default : false
      // }
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
      // console.log("AAA", this.$can("PrtnContractViewByRegion", "permissions"));
      if (this.$can('PrtnContractViewByRegion', 'permissions')) {
         this.filter.regionId = JSON.parse(localStorage.getItem('user_info')).organizationRegionId;
         this.GetFilter();
         this.GetDistrict();
      }
      this.lang = localStorage.getItem('locale') || 'ru';
      this.GetFilter();
      this.Refresh();
      RegionService.GetAsSelectList(211)
         .then(res => {
            this.RegionList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.errors, 'danger');
         });
      PrtnContractTypeService.GetAsSelectList()
         .then(res => {
            this.ContractTypeList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.errors, 'danger');
         });
   },
   methods: {
      SetFilter() {
         const tempFilter = {
            regionId: this.filter.regionId,
            mfyId: this.filter.mfyId,
            districtId: this.filter.districtId,
            contractorInn: this.filter.contractorInn,
            prtnContractTypeId: this.filter.prtnContractTypeId,
            search: this.filter.search,
            statusIds: this.filter.statusIds,
            statusId: this.filter.statusId,
            hasCertificate: this.filter.hasCertificate
         };
         localStorage.setItem('prtncontract_filters', JSON.stringify(tempFilter));
      },

      GetFilter() {
         const filter = localStorage.getItem('prtncontract_filters');
         if (filter) {
            this.filter = { ...this.filter, ...JSON.parse(filter) };
         }
      },

      GetMfyApplication(item) {
         this.mfyApplication = true;
         ApplicationService.GetMfyApplication(item.id2)
            .then(res => {
               console.log(res.data);
               this.MfyApplicationData = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });
      },
      Print() {
         PrtnContractService.SaveAsExecel(this.filter).then(res => {
            this.forceFileDownload(res, this.$t('prtncontract'));
         });
      },
      OpenHistory(item) {
         this.$refs['HistoryModal' + item.id].show();
         ManualService.GetListByDocumentId(item.tableId, item.id)
            .then(res => {
               this.historyData = res.data;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
            });
      },
      ChangeRegion() {
         if (this.filter.regionId) {
            this.filter.districtId = null;
            this.filter.mfyId = null;

            this.GetDistrict();
            this.GetMfy();
         } else {
            this.filter.districtId = null;
            this.filter.mfyId = null;
            this.MfyList = [];
            this.DistrictList = [];
            this.Refresh();
         }
      },
      GetDistrict() {
         if (this.filter.regionId) {
            this.filter.districtId = null;
            DistrictService.GetAsSelectList(this.filter.regionId)
               .then(res => {
                  this.DistrictList = res.data;
                  this.GetMfy();
               })
               .catch(error => {
                  this.makeToast(error.response.data.error, 'danger');
               });
         } else {
            this.filter.districtId = null;
            this.filter.mfyId = null;
            this.DistrictList = [];
            this.MfyList = [];
            this.Refresh();
         }
      },
      ChangeDistrict() {
         this.filter.mfyId = null;
         this.filter.MfyList = [];

         this.GetMfy();
         this.Refresh();
      },
      GetMfy() {
         if (this.filter.regionId || this.filter.districtId) {
            MfyService.GetAsSelectList(this.filter.regionId, this.filter.districtId)
               .then(res => {
                  this.MfyList = res.data;
                  this.Refresh();
               })
               .catch(error => {
                  this.makeToast(error.response.data.error, 'danger');
               });
         } else {
            this.filter.mfyId = null;
            this.MfyList = [];
            this.Refresh();
         }
      },

      rowclicked() {},
      SortChange(data) {
         this.filter.SortColumn = data.sortBy;
         this.filter.OrderType = data.sortDesc ? 'desc' : 'asc';
         this.Refresh();
      },

      Delete(item) {
         this.DeleteLoading = true;
         PrtnContractService.Delete(item.id)
            .then(res => {
               this.DeleteLoading = false;
               this.Refresh();
               this.makeToast(this.$t('DeleteSuccess'), 'success');
            })
            .catch(error => {
               this.DeleteLoading = false;
               this.makeToast(error.response.data.error, 'danger');
            });
      },
      CertificateGet(item) {
         this.$router.push({
            name: 'EditPrtnCertificate',
            params: {
               id: item.id
            },
            query: {
               isList: true
            }
         });
      },
      Edit(item) {
         this.$router.push({
            name: 'ViewPrtnContract',
            params: {
               id: item.id
            }
         });
      },
      Create() {
         this.$router.push({
            name: 'EditPrtnContract',
            params: {
               id: 0
            }
         });
      },

      Approve(item) {
         var self = this;
         PrtnContractService.Approve(item.id)
            .then(res => {
               self.makeToast(self.$t('ApproveSuccess'), 'success');
               this.Refresh();
            })
            .catch(error => {
               self.makeToast(
                  error.response.data.error,

                  'danger'
               );
            });
      },
      CancelApproval(item) {
         var self = this;
         PrtnContractService.CancelApproval(item.id)
            .then(res => {
               self.makeToast(
                  self.$t('CancelMessage'),

                  'success'
               );
               this.Refresh();
            })
            .catch(error => {
               self.makeToast(
                  error.response.data.error,

                  'danger'
               );
            });
      },
      Refresh() {
         this.isBusy = true;
         if (this.filter.statusId == null) {
            this.filter.statusIds = [];
         } else {
            this.filter.statusIds = [this.filter.statusId];
         }

         this.SetFilter();

         PrtnContractService.GetList(this.filter)
            .then(res => {
               this.items = res.data.rows;
               this.filter.total = res.data.total;
               this.isBusy = false;
            })
            .catch(error => {
               this.makeToast(error.response.data, 'danger');
               this.isBusy = false;
            });
      }
   }
};
</script>

<style lang="scss" scoped>
.per-page-selector {
   width: 90px;
}

.invoice-filter-select {
   min-width: 190px;

   ::v-deep .vs__selected-options {
      flex-wrap: nowrap;
   }

   ::v-deep .vs__selected {
      width: 100px;
   }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
