<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <validation-observer ref="ValidationDTO">
            <b-row>
              <b-col sm="12" md="3">
                <div class="form-group">
                  <form-input
                    v-model="Data.code"
                    :label="$t('code')"
                    required
                    type="number"
                  />
                </div>
              </b-col>
              <b-col sm="12" md="3">
                <div class="form-group">
                  <form-input
                    v-model="Data.shortName"
                    required
                    :label="$t('shortname')"
                  >
                  </form-input>
                </div>
              </b-col>
              <b-col sm="12" md="3">
                <div class="form-group">
                  <form-input
                    v-model="Data.fullName"
                    required
                    :label="$t('fullname')"
                  >
                  </form-input>
                </div>
              </b-col>
              <b-col sm="12" md="3">
                <label>{{ $t("Organization") }}</label>
                <v-select
                  :options="OrganizationList"
                  :reduce="(item) => item.value"
                  :placeholder="$t('ChooseBelow')"
                  label="text"
                  v-model="Data.organizationId"
                  @input="ChangeOrganization"
                ></v-select>
              </b-col>
              <b-col sm="12" md="3">
                <label>{{ $t("Department") }}</label>
                <v-select
                  :options="DepartmentList"
                  :reduce="(item) => item.value"
                  :placeholder="$t('ChooseBelow')"
                  label="text"
                  v-model="Data.parentId"
                ></v-select>
              </b-col>

              <b-col sm="12" md="3">
                <form-select
                  :options="StateList"
                  v-model="Data.stateId"
                  required-star
                  :label="$t('Status')"
                ></form-select>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col sm="12" md="6" lg="6" class="text-left"></b-col>
              <b-col sm="12" md="6" lg="6" class="text-right">
                <b-button
                  :disabled="saveLoading"
                  @click="SaveData"
                  size="sm"
                  variant="outline-success"
                >
                  <feather-icon icon="CheckIcon"></feather-icon>
                  {{ $t("Save") }}
                </b-button>
              </b-col>
            </b-row>
          </validation-observer>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>
<script>
import ManualService from "@/services/others/manual.service";
import DepartmentService from "@/services/info/department.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import { ValidationObserver } from "vee-validate";
import OrganizationService from "@/services/managment/organization.service";

import {
  BOverlay,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormGroup,
  BModal,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BTable,
  BTd,
  BTr,
} from "bootstrap-vue";

// import FormSelect from "@/components/forms/form-select.vue";
// import FormInput from "@/components/forms/form-input.vue";

export default {
  components: {
    BOverlay,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BFormGroup,
    BModal,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    CustomDatePicker,
    ValidationObserver,
    BTable,
    BTd,
    BTr,
  },
  name: "Edit",

  data() {
    return {
      lang: "",
      show: false,
      StateList: [],
      saveLoading: false,
      Data: {},

      DepartmentList: [],
      OrganizationList: [],
      filter: {
        organizationId: 0,
        search: "",
        sortBy: "",
        orderType: "",
        page: 1,
        pageSize: 900,
      },
    };
  },

  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    DepartmentService.Get(this.$route.params.id).then((res) => {
      this.show = false;
      this.Data = res.data;
    });

    OrganizationService.GetAsSelectList()
      .then((res) => {
        this.OrganizationList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });

    ManualService.StateSelectList()
      .then((res) => {
        this.StateList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
  },
  methods: {
    ChangeOrganization() {
      this.filter.organizationId = this.Data.organizationId;
      DepartmentService.GetAsSelectList(this.filter).then((res) => {
        this.show = false;

        this.DepartmentList = res.data.rows;
      });
    },
    SaveData() {
      this.$refs.ValidationDTO.validate().then((success) => {
        console.log(success);
        if (success) {
          this.saveLoading = true;

          DepartmentService.Update(this.Data)
            .then((res) => {
              this.makeToast(this.$t("SaveSuccess"), "success");
              this.$router.push({ name: "Department" });
              this.saveLoading = false;
            })
            .catch((err) => {
              this.makeToast(this.$t(err), "danger");
              this.saveLoading = false;
            });
        }
      });
    },
  },
};
</script>
<style scoped>
legend {
  background-color: #000;
  color: #fff;
  padding: 3px 6px;
}

.output {
  font: 1rem "Fira Sans", sans-serif;
}

input {
  margin: 0.4rem;
}
</style>
@/services/info/position.service
