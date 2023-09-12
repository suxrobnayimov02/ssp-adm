<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12" class="text-center">
        <b-row :class="!Application.prtnContractId && 'justify-content-center'">
          <!-- <b-col sm="12" md="12" lg="12" class="text-center"> -->
          <b-card style="width: 50%">
            <!-- <div style="min-height: 80vh;" v-html="HtmlData" class="pl-2 pr-3"></div> -->
            <!-- <iframe style="width: 100%;" :src="axios.defaults.baseURL+ `/Application/PrintApplicationPdf?Id=${Application.id}`" frameborder="0"></iframe> -->
            <!-- <pdf :src="axios.defaults.baseURL+ `Application/PrintApplicationPdf?Id=${$route.params.id}`"></pdf> -->
            <iframe
              v-if="Application.id2"
              style="width: 80vh; height: 100vh"
              :src="
                axios.defaults.baseURL +
                `/Application/PrintApplicationPdf?Id=${Application.id2}`
              "
              frameborder="0"
            ></iframe>
            <div class="d-flex">
              <b-button
                v-if="Application.canReject"
                class="mt-2 mr-2"
                @click="OpenReject"
                style="width: 100%"
                size="xl"
                variant="outline-danger"
              >
                <feather-icon icon="XCircleIcon"></feather-icon>
                {{ $t("Reject") }}
              </b-button>
              <b-button
                v-if="Application.canAccept"
                class="mt-2"
                @click="GetContract"
                style="width: 100%"
                size="xl"
                variant="outline-primary"
              >
                <feather-icon icon="CheckIcon"></feather-icon>
                {{ $t("getAndCreateContract") }}
              </b-button>
            </div>
          </b-card>
          <!-- </b-col> -->
          <!-- <b-col sm="12" md="6" lg="6" class="text-center" v-if="HtmlDataContract.length>0"> -->
          <b-card style="width: 49%; margin-left: 5px" v-if="Data.id2">
            <!-- <div
                style="height: 81vh; overflow-y: scroll;"
                v-html="HtmlDataContract"
                class="pl-2 pr-3"
            ></div>-->
            <!-- <pdf :src="HtmlDataContract"></pdf> -->
            <!-- <div >
                <pdf  :src="axios.defaults.baseURL+ `PrtnContract/GetPdfTemplate?applicationId=${$route.params.id}`"></pdf>
            </div>-->
            <div>
              <iframe
                style="width: 80vh; height: 100vh"
                :src="
                  axios.defaults.baseURL +
                  `/PrtnContract/GetPdfTemplate?applicationId=${$route.params.id}`
                "
                frameborder="0"
              ></iframe>
            </div>
            <div class="d-flex">
              <b-button
                v-if="Application.canAccept"
                class="mt-2 mr-2"
                @click="$router.go(-1)"
                style="width: 100%"
                size="xl"
                variant="outline-danger"
              >
                <feather-icon icon="ArrowLeftIcon"></feather-icon>
                {{ $t("back") }}
              </b-button>
              <b-button
                v-if="Application.canAccept"
                class="mt-2"
                @click="SaveData"
                style="width: 100%"
                size="xl"
                variant="outline-success"
              >
                <feather-icon icon="CheckIcon"></feather-icon>
                {{ $t("createContract") }}
              </b-button>
            </div>
          </b-card>
          <!-- </b-col> -->
        </b-row>
        <b-modal v-model="RejectModal" :title="$t('Reject')" hide-footer>
          <b-card-text>
            <h5 class="mb-2">{{ $t("WantReject") }}</h5>

            <div class="form-group">
              <form-input v-model="filter.message" :label="$t('message')" />
            </div>
            <div class="form-group">
              <form-select
                :options="PrtnRejectReasonList"
                v-model="filter.prtnRejectReasonId"
                :label="$t('prtnRejectReason')"
              ></form-select>
            </div>

            <div class="d-flex justify-content-end">
              <b-button
                class="mt-2 mr-2"
                @click="RejectModal = !RejectModal"
                style="width: 100%"
                size="xl"
                variant="danger"
              >{{ $t("no") }}</b-button>
              <b-button
                class="mt-2"
                @click="CancelApproval"
                style="width: 100%"
                size="xl"
                variant="success"
              >{{ $t("yes") }}</b-button>
            </div>
          </b-card-text>
        </b-modal>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
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
  BFormTextarea,
  BFormCheckbox,
  BIcon,
  BBadge
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import Cleave from "vue-cleave-component";
import PrtnRejectReasonService from "@/services/info/prtnrejectreason.service";
import PrtnContractService from "@/services/document/prtncontract.service";
import ApplicationService from "@/services/document/application.service";
import pdf from "vue-pdf";
import axios from "axios";

export default {
  components: {
    pdf,
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTabs,
    BTab,
    BButton,
    BTable,
    BLink,
    flatPickr,
    BFormGroup,
    BModal,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BTr,
    BTd,
    BFormTextarea,
    BFormCheckbox,
    BIcon,
    BBadge,
    Cleave
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal
  },
  data() {
    return {
      axios,
      PrtnContractModal: false,
      ContractorList: [],
      PdfData: {},
      RejectModal: false,
      closeButton: false,
      ApplicationList: [],
      PDFDataUrl: "",
      PrtnRejectReasonList: [],
      PrtnContractTypeList: [],
      show: false,
      Data: {},
      filter: {
        message: "",
        id: 0,
        prtnRejectReasonId: 0
      },
      HtmlData: {},
      Application: {},
      HtmlDataContract: "",
      lang: "ru",
      config: {
        dateFormat: "d.m.Y"
      }
    };
  },
  props: {
    // isOtm : {
    //   type : Boolean,
    //   default : false
    // }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ApplicationService.Get(this.$route.params.id).then(res => {
      this.Application = res.data;
      if (this.Application.prtnContractId) {
        this.GetContract();
      }
    });

    PrtnRejectReasonService.GetAsSelectList()
      .then(res => {
        this.PrtnRejectReasonList = res.data;
      })
      .catch(error => {
        this.makeToast(error.response.data.error, "danger");
      });
    // ApplicationService.PrintApplicationPdf(this.$route.params.id).then(res =>{
    //   this.PdfData = res.data
    // })
    ApplicationService.GetApplicationAsHtml(this.$route.params.id)
      .then(res => {
        this.HtmlData = res.data;
        this.show = false;
      })
      .catch(error => {
        this.makeToast(
          error.response.data,

          "danger"
        );
      });
    this.show = false;
  },
  directives: {
    Ripple
  },
  methods: {
    OpenReject() {
      this.RejectModal = true;
      this.filter = {
        message: "",
        id: this.Application.id,
        prtnRejectReasonId: 0
      };
    },
    CancelApproval(item) {
      var self = this;
      ApplicationService.Reject(this.filter)
        .then(res => {
          self.makeToast(self.$t("RejectMessage"), "success");
          this.Refresh();
        })
        .catch(error => {
          self.makeToast(error.response.data.errors, "danger");
        })
        .finally(() => {
          this.RejectModal = false;
        });
    },
    GetContract() {
      PrtnContractService.GetByApplicationId(this.$route.params.id)
        .then(res => {
          this.show = false;
          this.Data = res.data;
          PrtnContractService.GetPdfTemplate(this.$route.params.id)
            .then(res1 => {
              this.HtmlDataContract = res1.data;
              // this.PDFDataUrl = URL.createObjectURL(new Blob([HtmlDataContract], { type: 'application/pdf' }));
              ApplicationService.Get(this.$route.params.id).then(res2 => {
                this.Application = res2.data;
                // if (this.Application.prtnContractId) {
                // this.GetContract();
                // }
              });
            })
            .catch(error => {
              this.makeToast(error.response.data, "danger");
            });
          // this.GetPDF()
          // ApplicationService.Get(this.$route.params.id).then(res2 => {
          //       this.Application = res2.data;
          //       // if (this.Application.prtnContractId) {
          //       // this.GetContract();
          //       // }
          //     });
        })
        .catch(error => {
          this.makeToast(
            error.response.data,

            "danger"
          );
        });
      //   }
    },
    GetPDF() {
      PrtnContractService.GetPdfTemplate(this.Data)
        .then(res1 => {
          this.HtmlDataContract = res1.data;
        })
        .catch(error => {
          this.makeToast(error.response.data, "danger");
        });
    },
    SaveData() {
      PrtnContractService.Update(this.Data)
        .then(res => {
          this.makeToast(this.$t("SaveSuccess"), "success");

          //   PrtnContractService.GetApplicationAsHtml(this.Data.id)
          //     .then((res) => {
          //       //   this.HtmlDataContract = res.data;

          //     })
          //     .catch((error) => {
          //       this.makeToast(
          //         error.response.data,

          //         "danger"
          //       );
          //     });
          this.$router.push({ name: "PrtnContract" });
        })
        .catch(err => {
          this.makeToast(err.response.data.errors, "danger");
        });
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
