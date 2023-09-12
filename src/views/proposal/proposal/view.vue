<template>
  <b-card no-body>
    <b-row class="d-flex justify-content-end">
      <b-col lg="3" class="mt-2" style="text-align: end; margin-right: 35px;">
        <b-button variant="primary" @click="DownloadWord">
          <feather-icon icon="PrinterIcon"></feather-icon>
          {{ $t('DownloadWord') }}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="m-2" style="justify-content: center">
      <b-col xs="12" sm="4" md="4" lg="6">
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("docnumber") }} : </span>
            <span class="font-weight-bold">
             {{ Proposal.docNumber }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("docdate") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.docOn }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("proposalType") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.proposalTypeName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("businessSector") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.businessSectorName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            v-if="Proposal.companyInn != null && Proposal.companyInn != ''"
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("companyInn") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.companyInn }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            v-if="Proposal.companyName != null && Proposal.companyName != ''"
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("companyName") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.companyName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("companyType") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.companyTypeName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("fio") }} </span>
            <span class="font-weight-bold">
              {{ Proposal.surnameLatin }} {{ Proposal.nameLatin }} {{ Proposal.patronymLatin }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("gender") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.genderName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("phoneNumber") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.phoneNumber }}
            </span>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col xs="12" sm="4" md="4" lg="6">
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("email") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.email }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("region") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.regionName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("District") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.districtName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("mfy") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.mfyName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("address") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.addressName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("employementType") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.employementTypeName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("proposalSubject") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.proposalSubjectName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("proposalDisclosure") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.proposalDisclosureName }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("proposalText") }} : </span>
            <span class="font-weight-bold">
              {{ Proposal.proposalText }}
            </span>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <span> {{ $t("status") }} : </span>
            <b-badge :variant="Proposal.statusId == 1 ? 'success' : 'danger'">
              <span class="font-weight-bold">
                {{ Proposal.status }}
              </span>
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
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
  BIcon,
  BModal,
  BCardText,
  BTableSimple,
  BTbody,
  BFormCheckbox,
  BListGroup,
  BListGroupItem,
  
} from "bootstrap-vue";
import ProposalService from "@/services/document/proposal.service";

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
    BIcon,
    BModal,
    BCardText,
    BTableSimple,
    BTbody,
    BIcon,
    BFormCheckbox,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      items: [],
      totalRows: "",
      Proposal: {},
      isBusy: true,
      filter: {
        id: 0,
        Search: "",
        Sort: "",
        Order: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        SortIcon: "arrow-up",
      },
      lang : '',
      AssessmentCriteriaModal : false
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
    
    ProposalService.Get(this.$route.params.id)
      .then((res) => {
        this.Proposal = res.data;
        this.show = false;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
  },
  methods: {
    DownloadWord(){
      ProposalService.GenerateWord(this.$route.params.id)
      .then((res) => {
        this.forceFileDownload(res,this.Proposal.surnameLatin + this.Proposal.nameLatin + this.Proposal.patronymLatin + '.docx')
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
    },
    forceFileDownload(response, name) {
      var {headers} = response;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
    },
    getItemColor(text) {
      return text === true ? "success" : text === false ? "danger" : "primary";
    },
    makeToast(message, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: variant == "success" ? "CheckSquareIcon" : "AlertTriangleIcon",
          variant: variant,
        },
      });
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