<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-row class="justify-content-end">
          <b-col sm="12" md="3" lg="3" class="text-center">
            <b-card>
             <b-row>
              <b-col class="text-left" sm="12" md="12" lg="12">
                <p class="mb-0 pb-0"><span>{{ SoliqData.company.tin }}</span> - {{ SoliqData.company.name }}</p>
              </b-col>
              <b-col class="text-left" sm="12" md="12" lg="12">
                <p class="mb-0 pb-0"><span><b>{{ $t('registrationNumber')}}</b></span> - {{ SoliqData.company.registrationNumber }}</p>
              </b-col>
              <b-col class="text-left" sm="12" md="12" lg="12">
                <p class="mb-0 pb-0"><span><b>{{ $t('registrationDate')}}</b></span> - {{ SoliqData.company.registrationDate }}</p>
              </b-col>
              <b-col class="text-left" sm="12" md="12" lg="12">
                <p class="mb-0 pb-0"><span><b>{{ $t('director')}}</b></span> - {{ SoliqData.director.lastName }} {{ SoliqData.director.firstName }} {{ SoliqData.director.middleName }}</p>
              </b-col>
              <b-col class="text-left" sm="12" md="12" lg="12">
                <p class="mb-0 pb-0"><span><b>{{ $t('avgNumberEmployees')}}</b></span> - {{ SoliqData.companyExtraInfo.avgNumberEmployees }}</p>
              </b-col>
             </b-row>
            </b-card>
          </b-col>
          <b-col sm="12" md="6" lg="6" class="text-center">
            <b-card>
              <div style="max-height: 80vh; overflow-y: auto">
                <div  v-if="Data.id == 0" style="min-height: 80vh" v-html="HtmlData" class="pl-2 pr-3"></div>
                <!-- <iframe
                  v-if="Data.id == 0"
                  style="width: 80vh; height: 100vh"
                  :src="
                    axios.defaults.baseURL +
                    `/PrtnCertificate/GetPdfTemplateByPrtnContractId/${Data.id2}?lang=${lang}`
                  "
                  frameborder="0"
                ></iframe> -->
                <iframe
                  v-if="Data.id != 0"
                  style="width: 80vh; height: 100vh"
                  :src="
                   axios.defaults.baseURL+ `/PrtnCertificate/PrintCertificatePdf?Id2=${Data.id2}&lang=${lang}`
                  "
                  frameborder="0"
                ></iframe>
              </div>
            </b-card>
          </b-col>
          <b-col sm="6" md="3" lg="3" class="text-center">
            <div class>
              <b-button
                v-if="Data.canCancel"
                class="mr-2 mb-1"
                @click="OpenCancel"
                style="width: 100%"
                size="xl"
                variant="danger"
              >
                <feather-icon icon="XCircleIcon"></feather-icon>
                {{ $t("Cancel") }}
              </b-button>
              <!-- <b-button
                class="mr-2"
                @click="Print(Data.id2)"
                style="width: 100%"
                size="xl"
                variant="primary"
              >
                <feather-icon icon="PrinterIcon"></feather-icon>
                {{ $t("Print") }}
              </b-button> -->
              <b-button
                v-if="Data.id ==0"
                class="mr-2 mt-1"
                @click="SaveData"
                style="width: 100%"
                size="xl"
                variant="success"
              >
                <feather-icon icon="CheckCircleIcon"></feather-icon>
                {{ $t("create") }}
              </b-button>
              <b-button
              v-if="Data.id ==0"
                class="mr-2 mt-1"
                @click="GoBack"
                style="width: 100%"
                size="xl"
                variant="danger"
              >
                <feather-icon icon="ArrowLeftIcon"></feather-icon>
                {{ $t("goBack") }}
              </b-button>
              <b-modal v-model="cancelModal" :title="$t('Cancel')" hide-footer>
                <b-card-text>
                  <h5>{{ $t("WantCancel") }}</h5>
                </b-card-text>
                <div>
                  <b-col sm="12" md="12" class="text-left">
                    <label for>{{ $t("message") }}</label>
                    <b-form-input
                      v-model="filter.message"
                      :placeholder="$t('message')"
                    ></b-form-input>
                  </b-col>
                </div>
                <div class="d-flex justify-content-end mt-1">
                  <b-button
                    class="mr-1"
                    @click="cancelModal != cancelModal"
                    size="xl"
                    variant="danger"
                    >{{ $t("no") }}</b-button
                  >
                  <b-button @click="Cancel" size="xl" variant="success">{{
                    $t("yes")
                  }}</b-button>
                </div>
              </b-modal>
            </div>
          </b-col>
        </b-row>
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
  BBadge,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import Cleave from "vue-cleave-component";
import PrtnCertificateService from "@/services/document/prtncertificate.service";

export default {
  components: {
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
    Cleave,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      axios,
      HtmlData: {},
      SoliqData: {},
      DavAktivData:{},
      show: false,
      Data: {},
      filter: {
        id: 0,
        message: "",
      },
      cancelModal: false,
      lang: "ru",
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
    if (this.lang == "uz_cyrl") {
      this.lang = "uz-cyrl";
    }
    if (this.lang == "uz_latn") {
      this.lang = "uz-latn";
    }
    this.show = true;
    
    if (this.$route.query.isList) {
      PrtnCertificateService.GetByPrtnContractId(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Data = res.data;
         
          PrtnCertificateService.GetFromSoliq(res.data.contractorInn)
            .then((res1) => {
              this.SoliqData = res1.data;
            })
            .catch((err) => {
              this.makeToast(this.$t(err), "danger");
            });
            PrtnCertificateService.GetFromDavAkiv(res.data.contractorInn)
            .then((res1) => {
              this.DavAktivData = res1.data;
            })
            .catch((err) => {
              this.makeToast(this.$t(err), "danger");
            });
          this.getHtml(this.Data);
        })
        .catch((err) => {
          this.makeToast(this.$t(err), "danger");
        });
    } else {
      PrtnCertificateService.Get(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Data = res.data;
          PrtnCertificateService.GetPdf(res.data.id2,'ru')
            .then((res1) => {
              this.SoliqData = res1.data;
            })
            .catch((err) => {
              this.makeToast(this.$t(err), "danger");
            });
          PrtnCertificateService.GetFromSoliq(res.data.contractorInn)
            .then((res1) => {
              this.SoliqData = res1.data;
            })
            .catch((err) => {
              this.makeToast(this.$t(err), "danger");
            });
            PrtnCertificateService.GetFromDavAkiv(res.data.contractorInn)
            .then((res1) => {
              this.DavAktivData = res1.data;
            })
            .catch((err) => {
              this.makeToast(this.$t(err), "danger");
            });
          // this.getHtml(this.Data);
        })
        .catch((err) => {
          this.makeToast(this.$t(err), "danger");
        });
    }
  },
  directives: {
    Ripple,
  },
  methods: {
    OpenCancel() {
      this.cancelModal = true;
      this.filter = {
        id: this.Data.id,
        message: "",
      };
    },
    Cancel() {
      PrtnCertificateService.Cancel({
        id: this.Data.id,
        message: this.filter.message,
      })
        .then((res) => {
          this.makeToast(this.$t("CancelSuccess"), "success");
          this.$router.push({ name: "PrtnCertificate" });
        })
        .catch((err) => {
          this.makeToast(this.$t(err.response.data), "danger");
        })
        .finally(() => {
          this.cancelModal = false;
        });
    },
    Print(id) {
      PrtnCertificateService.PrintCertificatePdf(id).then((res) => {
        this.forceFileDownload(res, this.$t("prtncertificate"));
      });
    },
    forceFileDownload(response, name) {
      var { headers } = response;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    getHtml(data) {
      PrtnCertificateService.GetHtmlTemplate(data)
        .then((res) => {
          this.HtmlData = res.data;
        })
        .catch((err) => {
          this.makeToast(this.$t(err), "danger");
        });
    },
    GoBack(){
      this.$router.push({ name: "PrtnCertificate" });
    },
    SaveData() {
      PrtnCertificateService.Create(this.Data)
        .then((res) => {
          this.makeToast(this.$t("SaveSuccess"), "success");
          // this.$router.push({ name: "PrtnCertificate" });
          this.$router.go(-1)
        })
        .catch((err) => {
          this.makeToast(this.$t(err), "danger");
        });
    },
  },
  watch: {},
  computed: {},
};
</script>
    
  <style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>