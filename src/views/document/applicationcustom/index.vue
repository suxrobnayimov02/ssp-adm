<template>
  <div>
    <b-card no-body>
      <div class="m-2">
        <b-row align-h="between">
          <!-- <b-col
          cols="12"
          md="2"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
            v-if="$can('ApplicationEdit', 'permissions')"
            variant="primary"
            @click="Create()"
          >
            <feather-icon icon="PlusIcon"></feather-icon>
            {{ $t("create") }}
          </b-button>
          </b-col>-->

          <b-col sm="12" md="3">
            <div>
              <form-select
                :options="RegionList"
                v-model="filter.regionId"
                @input="ChangeRegion"
                :label="$t('Oblast')"
                @change="ChangeRegion"
                :disabled="!$can('ApplicationViewByRegion', 'permissions')"
              ></form-select>
              <!-- <label for>{{ $t("Oblast") }}</label>
              <v-select
                :options="RegionList"
                :reduce="(item) => item.value"
                :placeholder="$t('ChooseBelow')"
                label="text"
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
                @input="Refresh"
                class="w-100"
              ></v-select>
            </div>
          </b-col>
          <b-col sm="12" md="2">
            <div>
              <label for>{{ $t("inn") }}</label>
              <b-form-input
                v-model="filter.contractorInn"
                :placeholder="$t('inn')"
              ></b-form-input>
            </div>
          </b-col>

          <b-col sm="12" md="3">
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

          <b-col class="mt-2" md="2">
            <b-button variant="outline-primary" @click="Refresh" class="mr-2">
              <feather-icon icon="RefreshCwIcon" />
            </b-button>
            <b-button @click="Print" variant="primary">
              <feather-icon icon="PrinterIcon"></feather-icon>
              {{ $t("Print") }}
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="between" align-v="center">
          <b-col cols="12" md="8" class="mt-2">
            <!-- <div>
              <b-button-group @click="Refresh" size="sm">
                <b-button
                  @click="filter.statusId = 0"
                  :variant="filter.statusId == 0 ? 'primary' : 'outline-primary'"
                >{{ $t("all") }}</b-button>
                <b-button
                  @click="filter.statusId = 8"
                  :variant="filter.statusId == 8 ? 'primary' : 'outline-primary'"
                >{{ $t("new") }}</b-button>
                <b-button
                  @click="filter.statusId = 30"
                  :variant="filter.statusId == 30 ? 'primary' : 'outline-primary'"
                >{{ $t("appcount_23") }}</b-button>
                <b-button
                  @click="filter.statusId = 2"
                  :variant="filter.statusId == 2 ? 'primary' : 'outline-primary'"
                >{{ $t("Accepted") }}</b-button>
                <b-button
                  @click="filter.statusId = 23"
                  :variant="filter.statusId == 23 ? 'primary' : 'outline-primary'"
                >{{ $t("revoke") }}</b-button>
              </b-button-group>
            </div>-->
          </b-col>
          <b-col cols="12" lg="3" class="text-right mt-2">
            <!-- <label>{{ $t("search") }}</label> -->
            <b-input-group class="text-right">
              <b-form-input
                v-model="filter.search"
                :placeholder="$t('search')"
              />
              <b-input-group-append>
                <b-button @click="Refresh" variant="primary">
                  <feather-icon icon="SearchIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </div>

      <form-table
        ref="myChild"
        :service="ApplicationService"
        :router="'Application'"
        :fields="fields"
        :actions="actions"
        :filter="filter"
        :permission="'Application'"
      ></form-table>
    </b-card>
    <b-card no-body v-if="show">
      <div class="m-2">
        <b-row align-h="between">
          <!-- <b-col
          cols="12"
          md="2"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
            v-if="$can('ApplicationEdit', 'permissions')"
            variant="primary"
            @click="Create()"
          >
            <feather-icon icon="PlusIcon"></feather-icon>
            {{ $t("create") }}
          </b-button>
          </b-col>-->

          <b-col sm="12" md="3">
            <div>
              <label for>{{ $t("Oblast") }}</label>
              <v-select
                :options="RegionList"
                :reduce="(item) => item.value"
                :placeholder="$t('ChooseBelow')"
                label="text"
                v-model="filter.regionId"
                @input="ChangeRegion"
                class="w-100"
              ></v-select>
            </div>
          </b-col>
          <b-col sm="12" md="3">
            <div>
              <label for>{{ $t("Region") }}</label>
              <v-select
                :options="DistrictList"
                :reduce="(item) => item.value"
                :placeholder="$t('ChooseBelow')"
                label="text"
                v-model="filter.districtId"
                class="w-100"
              ></v-select>
            </div>
          </b-col>
          <b-col sm="12" md="2">
            <div>
              <label for>{{ $t("inn") }}</label>
              <b-form-input
                v-model="filter.contractorInn"
                :placeholder="$t('inn')"
              ></b-form-input>
            </div>
          </b-col>

          <b-col sm="12" md="3">
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
          <b-col class="mt-2" md="1">
            <b-button variant="outline-primary" @click="Refresh">
              <feather-icon icon="RefreshCwIcon" />
            </b-button>
          </b-col>
        </b-row>
        <b-row align-h="between" align-v="center">
          <b-col cols="12" md="8" class="mt-2">
            <div>
              <b-button-group @click="Refresh" size="sm">
                <b-button
                  @click="filter.statusId = 0"
                  :variant="
                    filter.statusId == 0 ? 'primary' : 'outline-primary'
                  "
                  >{{ $t("all") }}</b-button
                >
                <b-button
                  @click="filter.statusId = 8"
                  :variant="
                    filter.statusId == 8 ? 'primary' : 'outline-primary'
                  "
                  >{{ $t("new") }}</b-button
                >
                <b-button
                  @click="filter.statusId = 2"
                  :variant="
                    filter.statusId == 2 ? 'primary' : 'outline-primary'
                  "
                  >{{ $t("accept") }}</b-button
                >
                <b-button
                  @click="filter.statusId = 23"
                  :variant="
                    filter.statusId == 23 ? 'primary' : 'outline-primary'
                  "
                  >{{ $t("revoke") }}</b-button
                >
              </b-button-group>
            </div>
          </b-col>
          <b-col cols="12" lg="3" class="text-right mt-2">
            <!-- <label>{{ $t("search") }}</label> -->
            <b-input-group class="text-right">
              <b-form-input
                v-model="filter.search"
                :placeholder="$t('search')"
              />
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
        <template #cell(prtnContractStatus)="{ item }">
          <b-badge :variant="getColorStatus(item)">{{
            item.prtnContractStatus
          }}</b-badge>
        </template>
        <template #cell(contractor)="{ item }"
          >{{ item.contractorInn }} - {{ item.contractor }}</template
        >
        <template #cell(actions)="{ item }">
          <b-link
            v-if="item.statusid == 2"
            :to="{ name: 'ViewApplication', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('View')"
            style="margin-right: 5px"
          >
            <feather-icon icon="EyeIcon"></feather-icon>
          </b-link>
          <!-- v-if="item.statusid != 2 && $can('ApplicationEdit', 'permissions')" -->
          <b-link
            v-b-tooltip.hover.top="$t('seeinfo')"
            @click="Edit(item)"
            style="margin-right: 5px"
          >
            <!-- <feather-icon icon="FileIcon"></feather-icon> -->
            <feather-icon icon="EyeIcon"></feather-icon>
          </b-link>
          <!-- <b-link
          v-if="
            item.statusid != 2 && $can('ApplicationApprove', 'permissions')
          "
          @click="$refs['ApproveModal' + item.id].show()"
          v-b-tooltip.hover.top="$t('Approve')"
          style="margin-right: 5px"
        >
          <feather-icon icon="CheckIcon"></feather-icon>
          </b-link>-->
          <b-link
            v-if="
              $can('ApplicationReject', 'permissions') && item.statusid == 8
            "
            @click="$refs['CancelModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Reject')"
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

          <b-modal
            :ref="'CancelModal' + item.id"
            :title="$t('Reject')"
            :cancel-title="$t('Cancel')"
            :ok-title="$t('Accept')"
            cancel-variant="danger"
            ok-variant="success"
            @ok="CancelApproval(item)"
          >
            <b-card-text>
              <!-- <h5>{{ $t("admissiontype") }} : {{ item.admissiontypename }}</h5> -->
              <h5>{{ $t("WantReject") }}</h5>
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
          <b-modal
            size="xl"
            :ref="'HistoryModal' + item.id"
            hide-footer
            :title="$t('history')"
          >
            <b-table
              :items="historyData"
              :fields="historyFields"
              responsive
              no-border-collapse
              :busy="isBusy"
              show-empty
              :empty-text="$t('NotFound')"
            >
              <template #cell(status)="{ item }">
                <b-badge :variant="getColor(item)">{{ item.status }}</b-badge>
              </template>
            </b-table>
          </b-modal>
        </template>
        <template v-slot:table-busy>
          <div
            class="text-center text-primary my-2"
            style="vertical-align: middle"
          >
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
  </div>
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
  BIconClockHistory,
  BInputGroupAppend,
  BLink,
  BModal,
  BCardText,
  BButtonGroup,
  BIcon,
} from "bootstrap-vue";
import ApplicationService from "@/services/document/application.service";
import RegionService from "@/services/info/region.service";
import DistrictService from "@/services/info/district.service";
import ManualService from "@/services/others/manual.service";
import PrtnContractTypeService from "@/services/info/prtncontracttype.service";
import JustSign from "@/components/justSign.vue";
import FormTable from "@/components/forms/form-table.vue";
export default {
  components: {
    BButton,
    BPagination,
    FormTable,
    BTable,
    BCol,
    BIconClockHistory,
    BRow,
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
    BIcon,
    JustSign,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      data: [],
      ContractTypeList: [],
      ApplicationService,
      RegionList: [],
      DistrictList: [],
      actions: {
        edit: true,
        view: true,
        delete: true,
        history: true,
        mfyApplication: true,
      },
      historyFields: [
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "dateAt",
          label: this.$t("docdate"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "ipAddress",
          label: this.$t("ipAddress"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "message",
          label: this.$t("message"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
      ],

      fields: [
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "docNumber",
          label: this.$t("docnumber"),
          sortable: true,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "docOn",
          label: this.$t("docOn"),
          sortable: true,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "contractorRegion",
          label: this.$t("oblast"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "contractorDistrict",
          label: this.$t("region"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "mfy",
          label: this.$t("mfy"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "prtnContractType",
          label: this.$t("prtnContractType"),
          sortable: false,
        },
        {
          key: "contractorInn",
          label: this.$t("inn"),
          sortable: false,
        },
        {
          key: "contractor",
          label: this.$t("contractorT"),
          sortable: false,
        },
        {
          key: "organization",
          label: this.$t("organizationT"),
          sortable: false,
        },
        // {
        //   key: "contractorInn",
        //   label: this.$t("contractorInn"),
        //   sortable: false,
        //   tdClass: "text-center",
        //   thClass: "text-center"
        // },

        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        {
          key: "prtnContractStatus",
          label: this.$t("prtnContractStatus"),
          sortable: false,
          tdClass: "text-center",
          thClass: "text-center",
        },
        // {
        //   key: "actions",
        //   tdClass: "text-center",
        //   thClass: "text-center",
        //   label: this.$t("actions"),
        // },
      ],
      historyData: [],
      filter: {
        regionId: null,
        districtId: null,
        contractorInn: "",
        prtnContractTypeId: null,
        search: "",
        sortBy: "",
        orderType: "asc",
        page: 1,
        pageSize: 20,
        statusId: 14,
        statusIds: [14],
        pageOptions: [10, 20, 50, 100],
        total: 0,
      },
      isBusy: false,
      DeleteLoading: false,
      lang: "",
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
    },
  },
  created() {
    this.GetFilter();
    if (this.$can("ApplicationViewByRegion", "permissions")) {
      this.filter.regionId = JSON.parse(
        localStorage.getItem("user_info")
      ).organizationRegionId;
      this.GetFilter();

      this.GetDistrict(this.filter.regionId);
    }

    this.lang = localStorage.getItem("locale") || "ru";
    // this.Refresh();
    RegionService.GetAsSelectList(211)
      .then((res) => {
        this.RegionList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    PrtnContractTypeService.GetAsSelectList()
      .then((res) => {
        this.ContractTypeList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
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
      };
      localStorage.setItem(
        "applicationcustom_filters",
        JSON.stringify(tempFilter)
      );
    },

    GetFilter() {
      const filter = localStorage.getItem("applicationcustom_filters");
      if (filter) {
        this.filter = { ...this.filter, ...JSON.parse(filter) };
      }
    },
    Print() {
      ApplicationService.SaveAsExecel(this.filter).then((res) => {
        this.forceFileDownload(res, this.$t("application"));
      });
    },
    OpenHistory(item) {
      this.$refs["HistoryModal" + item.id].show();
      ManualService.GetListByDocumentId(item.tableId, item.id)
        .then((res) => {
          this.historyData = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });
    },
    ChangeRegion(id) {
      if (id) {
        this.filter.districtId = null;

        this.Refresh();
        this.GetDistrict(id);
      } else {
        this.filter.districtId = null;

        this.Refresh();
      }
    },
    GetDistrict(id) {
      DistrictService.GetAsSelectList(id)
        .then((res) => {
          this.DistrictList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
        });
    },
    rowclicked() {},
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },

    Edit(item) {
      // if (item.statusid == 2) {
      //   this.$router.push({
      //     name: "ViewApplication",
      //     params: {
      //       id: item.id
      //     }
      //   });
      // } else {
      //   this.$router.push({
      //     name: "EditPrtnContract",
      //     params: {
      //       id: item.id
      //     }
      //   });
      // }
      this.$router.push({
        name: "EditApplicationCustom",
        params: {
          id: item.id,
        },
      });
    },
    Create() {
      this.$router.push({
        name: "EditApplication",
        params: {
          id: 0,
        },
      });
    },

    CancelApproval(item) {
      var self = this;
      // ApplicationService.Reject(item.id)
      //   .then((res) => {
      //     self.makeToast(self.$t("RejectMessage"), "success");
      //     this.Refresh();
      //   })
      //   .catch((error) => {
      //     self.makeToast(error.response.data.errors, "danger");
      //   });
    },
    Refresh() {
      this.isBusy = true;
      // if (this.filter.statusId == 0) {
      //   this.filter.statusIds = [];
      // } else {
      //   this.filter.statusIds = [this.filter.statusId];
      // }
      this.SetFilter();
      this.$refs.myChild.refresh();
      // ApplicationService.GetList(this.filter)
      //   .then((res) => {
      //     this.items = res.data.rows;
      //     this.filter.total = res.data.total;
      //     this.isBusy = false;
      //   })
      //   .catch((error) => {
      //     this.isBusy = false;
      //     this.makeToast(error.response.data, "danger");
      //   });
    },
  },
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
@import "@core/scss/vue/libs/vue-select.scss";
</style>
