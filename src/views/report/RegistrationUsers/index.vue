<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col sm="12" md="7" class="mt-2">
          <div class="d-flex">
            <div class="mr-2">
              <b-button-group @click="Refresh">
                <b-button
                  @click="changeTotal"
                  :variant="
                    filter.isParij == null ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("Total") }}
                </b-button>
                <b-button
                  @click="filter.isParij = true"
                  :variant="
                    filter.isParij == true ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("isParij") }}
                </b-button>
              </b-button-group>
            </div>
            <div class="mr-2" style="margin-top: 12px">
              <b-form-checkbox
                v-model="filter.haslocation"
                @change="Refresh"
                name="check-button1"
                switch
              >
                {{ $t("haslocation") }}
              </b-form-checkbox>
              <!-- <b-button-group @click="Refresh">
            <b-button
              @click="filter.haslocation = false"
              :variant="
                filter.haslocation == false ? 'primary' : 'outline-primary'
              "
            >
              {{ $t("hasnotlocation") }}
            </b-button>
            <b-button
              @click="filter.haslocation = true"
              :variant="
                filter.haslocation == true  ? 'primary' : 'outline-primary'
              "
            >
              {{ $t("haslocation") }}
            </b-button>
          </b-button-group> -->
            </div>
          </div>
        </b-col>

        <b-col cols="12" md="5" class="mt-2">
          <b-input-group class="text-right">
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- <b-col sm="12" md="2" class="mt-2">
          <b-button @click="Print" variant="primary" class="ml-1">
            <feather-icon icon="PrinterIcon"> </feather-icon>
            {{ $t("Print") }}
          </b-button>
        </b-col> -->
      </b-row>
    </div>
    <b-table-simple bordered striped responsive sticky-header="70vh" small>
      <b-thead>
        <b-tr>
          <b-th sticky-column>
            {{ $t("index") }}
          </b-th>
          <b-th sticky-column>
            {{ $t("Fullname") }}
          </b-th>
          <b-th sticky-column>
            {{ $t("documentseries") }}
          </b-th>
          <b-th sticky-column>
            {{ $t("documentnumber") }}
          </b-th>
          <b-th sticky-column>
            {{ $t("dateofbirth") }}
          </b-th>
          <b-th sticky-column>
            {{ $t("pinfl") }}
          </b-th>
          <b-th sticky-column>
            {{ $t("mobilenumber") }}
          </b-th>
          <b-th sticky-column v-if="filter.haslocation">
            {{ $t("dateofcreated2") }}
          </b-th>
        </b-tr>
        <b-tr>
          <b-th sticky-column style="top: 29px"></b-th>
          <b-th sticky-column style="top: 29px">
            <b-form-input
              v-model="filter.personName"
              @input="Refresh"
              :placeholder="$t('Fullname')"
            />
          </b-th>
          <b-th sticky-column style="top: 29px">
            <b-form-input
              v-model="filter.documentseries"
              @input="Refresh"
              type="text"
              :placeholder="$t('documentseries')"
            />
          </b-th>
          <b-th sticky-column style="top: 29px">
            <b-form-input
              v-model="filter.documentnumber"
              @input="Refresh"
              type="number"
              :placeholder="$t('documentnumber')"
            />
          </b-th>
          <b-th sticky-column style="top: 29px">
            <custom-date-picker
              v-model="filter.dateofbirth"
              @keyup="BindValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('dateofbirth')"
            >
            </custom-date-picker>
          </b-th>
          <b-th sticky-column style="top: 29px">
            <b-form-input
              v-model="filter.pinfl"
              @input="Refresh"
              type="number"
              :placeholder="$t('pinfl')"
            />
          </b-th>
          <b-th sticky-column style="top: 29px">
            <b-form-input
              v-model="filter.mobileNumber"
              @input="Refresh"
              type="number"
              :placeholder="$t('mobilenumber')"
            />
          </b-th>
          <b-th
            sticky-column
            style="top: 29px"
            v-if="filter.haslocation"
          ></b-th>
        </b-tr>
      </b-thead>
      <b-tbody
        v-for="(item, index) in items"
        :key="index"
        v-show="items.length > 0 && !isBusy"
      >
        <b-tr>
          <b-td class="text-center">
            {{ index + 1 }}
          </b-td>
          <b-td>
            {{ item.fullname }}
          </b-td>
          <b-td class="text-center">
            {{ item.documentseries }}
          </b-td>
          <b-td class="text-center">
            {{ item.documentnumber }}
          </b-td>
          <b-td class="text-center">
            {{ item.dateofbirth }}
          </b-td>
          <b-td class="text-center">
            {{ item.pinfl }}
          </b-td>
          <b-td class="text-center">
            {{ item.mobilenumber }}
          </b-td>
          <b-td v-if="filter.haslocation" class="text-center">
            {{ item.dateofcreated }}
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tbody v-if="items.length == 0 && !isBusy">
        <b-tr>
          <b-td colspan="8">
            <div
              class="text-center text-primary my-2"
              style="vertical-align: middle"
            >
              {{ $t("NotFound") }}
            </div>
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tbody v-if="isBusy">
        <b-tr>
          <b-td colspan="8">
            <div
              class="text-center text-primary my-2"
              style="vertical-align: middle"
            >
              <b-spinner class="align-middle mr-2"></b-spinner>
              <strong>{{ $t("Loading") }}</strong>
            </div>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <!-- <b-table
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
      @sort-changed="SortChange"
    >
      <template #cell(statusname)="{ item }">
        <b-badge
          :variant="
            item.statusname == 'Пассив' ? 'light-danger' : 'light-success'
          "
        >
          {{ item.statusname }}
        </b-badge>
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
    </b-table> -->

    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
            {{ lastNumber }} {{ $t("of") }} {{ filter.totalRows }}
            {{ $t("entries") }}</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="filter.currentPage"
            :total-rows="filter.totalRows"
            :per-page="filter.perPage"
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
  BLink,
  BModal,
  BCardText,
  BTableSimple,
  BThead,
  BTbody,
  BTr,
  BTd,
  BTh,
  BButtonGroup,
  BFormCheckbox,
} from "bootstrap-vue";
import RegistrationOfAthleteService from "@/services/report/registrationofathlete.service";
import ReportService from "@/services/report/report.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
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
    BLink,
    BModal,
    BCardText,
    BTableSimple,
    BThead,
    BTbody,
    BTr,
    BTd,
    BTh,
    CustomDatePicker,
    BButtonGroup,
    BFormCheckbox,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      items: [],
      OblastList: [],
      RegionList: [],
      RegionSectorList: [],
      GenderList: [],
      MfyList: [],
      fields: [
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "regionsectorname",
          label: this.$t("regionsectorname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "mfyname",
          label: this.$t("mfyname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "fullname",
          label: this.$t("Fullname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "agecategoryname",
          label: this.$t("agecategoryname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "sporttypename",
          label: this.$t("sporttypename"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      SportTypeList: [],
      lang: "ru",
      AgeCategoryList: [],
      filter: {
        personId: 0,
        pinfl: "",
        personName: "",
        mobileNumber: "",
        documentseria: "",
        documentnumber: "",
        dateofbirth: "",
        haslocation: false,
        isParij: null,
        Search: "",
        Sort: "",
        Order: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      isBusy: false,
      DeleteLoading: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.perPage) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.currentPage * this.filter.perPage >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.Refresh();
  },
  methods: {
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    BindValue(value) {
      this.filter.dateofbirth = value;
    },
    Print() {
      RegistrationOfAthleteService.PrintRegistrationofathlete(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.regionsectorid,
        this.filter.mfyid,
        this.filter.personname,
        this.filter.genderid,
        this.filter.sporttypeid,
        this.filter.agecategoryid,
        this.filter.Search,
        this.filter.Sort,
        this.filter.Order,
        this.filter.currentPage,
        0
      ).then((res) => {
        this.forceFileDownload(res, "PrintRegistrationofathlete");
      });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    changeTotal() {
      this.filter.haslocation = null;
      this.filter.isParij = null;
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      ReportService.GetRegistrationUsers(
        this.filter.personId,
        this.filter.pinfl,
        this.filter.personName,
        this.filter.mobileNumber,
        this.filter.documentseria,
        this.filter.documentnumber,
        this.filter.dateofbirth,
        this.filter.haslocation,
        this.filter.isParij,
        this.filter.Search,
        this.filter.Sort,
        this.filter.Order,
        this.filter.currentPage,
        this.filter.perPage
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
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
