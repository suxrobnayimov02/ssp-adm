<template>
  <div>
    <b-card v-if="Data.id ==0">
      <b-row>
        <b-col sm="12" md="3" class="text-left mt-2">
          <label for>{{ $t("Seria") }}</label>
          <b-form-input
            v-model="filter.Seria"
            v-mask="'AA'"
            @input="(val) => (filter.Seria = filter.Seria.toUpperCase())"
            :placeholder="$t('Seria')"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="3" class="text-left mt-2">
          <label for>{{ $t("passportNumber") }}</label>
          <b-form-input
            v-model="filter.Number"
            v-mask="'#######'"
            :placeholder="$t('passportNumber')"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="3" class="text-left mt-2">
          <label for>{{ $t("dateofbirth") }}</label>
          <custom-date-picker
            style="margin-top: 5px"
            v-model="filter.DateOfBirth"
            @keyup="BindValue"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('dateofbirth')"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="text-left mt-2">
          <b-button @click="GetPerson" class="mt-2" variant="primary">{{
            $t("search")
          }}</b-button>
        </b-col>
      </b-row>
    </b-card>

    <b-card v-show="!!Data.person.pinfl">
      <b-row>
        <b-col sm="12" md="12" class="text-left">
          <h3>
            {{
              `${Data.person.surnameLatin} ${Data.person.nameLatin} ${Data.person.patronymLatin}`
            }}
          </h3>
        </b-col>
        <b-col sm="12" md="6" class="text-left">
          <b-list-group>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("dateofbirth") }}</b>
                <span>{{ Data.person.birthDate }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("nationality") }}</b>
                <span>{{ Data.person.nationality }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("gender") }}</b>
                <span>{{ Data.person.gender }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("region") }}</b>
                <span>{{ Data.person.livingRegion }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("Region") }}</b>
                <span>{{ Data.person.livingDistrict }}</span>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col sm="12" md="6" class="text-left">
          <b-list-group>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("Seria") }}</b>
                <span>{{ Data.person.passportSeria }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("passportNumber") }}</b>
                <span>{{ Data.person.passportNumber }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("passportDate") }}</b>
                <span>{{ Data.person.passportDate }}</span>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("passportExpiration") }}</b>
                <span>{{ Data.person.passportExpiration }}</span>
              </div>
            </b-list-group-item>

            <b-list-group-item>
              <div style="display: flex; justify-content: space-between">
                <b>{{ $t("pinfl") }}</b>
                <span>{{ Data.person.pinfl }}</span>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <b-row>
        <b-col sm="12" md="4" class="text-left mt-2">
          <label for>{{ $t("userName") }}</label>
          <b-form-input
            v-model="Data.userName"
            :placeholder="$t('userName')"
          ></b-form-input>
        </b-col>

        <!-- <b-col sm="12" md="4" class="text-left mt-2">
          <div class="form-group">
            <label for>{{ $t("person") }}</label>
            <div>
              <b-input-group>
                <b-form-input :placeholder="$t('person')" v-model="Data.surnameLatin" disabled />
                <b-input-group-append>
                  <b-button variant="primary" @click="OpenTranslateModal('short_name')">
                    <feather-icon icon="SearchIcon"></feather-icon>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
        </b-col>-->

        <b-col sm="12" md="4" class="text-left mt-2">
          <label for>{{ $t("email") }}</label>
          <b-form-input
            v-model="Data.email"
            :placeholder="$t('email')"
          ></b-form-input>
        </b-col>

        <b-col sm="12" md="4" class="text-left mt-2">
          <label>{{ $t("Organization") }}</label>

          <v-select
            :options="OrganizationList"
            :reduce="(item) => item.value"
            :placeholder="$t('ChooseBelow')"
            label="text"
            v-model="Data.organizationId"
          ></v-select>
        </b-col>

        <b-col sm="12" md="4" class="text-left mt-2">
          <label for>{{ $t("Password") }}</label>
          <b-form-input
            v-model="Data.password"
            type="password"
            :placeholder="$t('Password')"
            autocomplete="new-password"
          ></b-form-input>
        </b-col>

        <b-col sm="12" md="4" class="text-left mt-2">
          <label for>{{ $t("phoneNumber") }}</label>
          <b-form-input
            v-model="Data.phoneNumber"
            v-mask="'(998) ## ### ## ##'"
            :placeholder="$t('phoneNumber')"
          ></b-form-input>
        </b-col>

        <b-col sm="12" md="4" class="text-left mt-2">
          <label>{{ $t("role") }}</label>

          <v-select
            multiple
            :options="RoleList"
            :reduce="(item) => item.value"
            :placeholder="$t('ChooseBelow')"
            label="text"
            v-model="Data.roles"
          ></v-select>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" md="6" lg="6" class="text-left"></b-col>
        <b-col sm="12" md="6" lg="6" class="text-right">
          <b-button @click="SaveData" size="sm" variant="outline-success">
            <feather-icon icon="CheckIcon"></feather-icon>
            {{ $t("Save") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      size="lg"
      :title="$t('Translates')"
      v-model="TranslateModal"
      hide-footer
      no-close-on-backdrop
    >
      <b-table
        :fields="TranslateFields"
        :items="TranslateItems"
        responsive="sm"
        striped
        bordered
        small
      >
        <template v-slot:thead-top>
          <b-tr>
            <b-td>
              <v-select
                :options="LanguageList"
                :reduce="(item) => item.value"
                :placeholder="$t('ChooseBelow')"
                label="text"
                v-model="TranslateItem.languageId"
                @input="ChangeTranslate"
              ></v-select>
            </b-td>
            <b-td>
              <b-form-input
                :placeholder="$t('fullname')"
                v-model="TranslateItem.translateText"
              />
            </b-td>
            <b-td class="text-center">
              <b-button variant="primary" @click="AddTranslate">
                <feather-icon icon="PlusIcon"></feather-icon>
              </b-button>
            </b-td>
          </b-tr>
        </template>
        <template #cell(translateText)="{ item }">
          <b-form-input
            :placeholder="$t('fullname')"
            v-model="item.translateText"
          />
        </template>
      </b-table>
      <b-row>
        <b-col class="text-right">
          <b-button @click="TranslateModal = false" variant="success">{{
            $t("Save")
          }}</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
<script>
import ManualService from "@/services/others/manual.service";
import UserService from "@/services/managment/user.service";
import RoleService from "@/services/managment/role.service";
import OrganizationService from "@/services/managment/organization.service";
import PersonService from "@/services/others/person.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";

import {
  BOverlay,
  BCard,
  BCardBody,
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
  BFormCheckbox,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";

export default {
  components: {
    BOverlay,
    BCard,
    BCardBody,
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
    BFormCheckbox,
    CustomDatePicker,
    BListGroup,
    BListGroupItem,
  },
  name: "Edit",

  data() {
    return {
      lang: "",
      OrganizationList: [],
      RoleList: [],
      loadingButton: false,
      Data: {
        translates: [],
      },
      TranslateModal: false,
      TranslateFields: [
        {
          key: "language",
          label: this.$t("languagename"),
          class: "text-center",
        },
        {
          key: "translateText",
          label: this.$t("translatetext"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), thClass: "text-center" },
      ],
      TranslateItem: {
        language: "",
        languageId: 0,
        columnName: "",
        translateText: "",
      },
      TranslateItems: [],
      LanguageList: [],
      filter: {
        Seria: "",
        Number: "",
        DateOfBirth: "",
      },
      personLoading: false,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    UserService.Get(this.$route.params.id).then((res) => {
      this.Data = res.data;
    });

    ManualService.LanguageSelectList()
      .then((res) => {
        this.LanguageList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });

    RoleService.GetAsSelectList()
      .then((res) => {
        this.RoleList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });

    OrganizationService.GetAsSelectList()
      .then((res) => {
        this.OrganizationList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
  },
  methods: {
    BindValue(value) {
      this.filter.DateOfBirth = value;
    },
    GetPerson() {
      this.personLoading = true;
      PersonService.GetByPassportData(
        this.filter.Seria,
        this.filter.Number,
        this.filter.DateOfBirth
      )
        .then((res) => {
          this.Data.person = res.data;
          this.personLoading = false;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
          this.personLoading = false;
        });
    },
    OpenTranslateModal(columnname) {
      this.TranslateModal = true;
      this.GetTranslateItems(columnname);
      this.clearLangTable(columnname);
    },
    GetTranslateItems(columnname) {
      this.TranslateItems = this.Data.translates.filter(
        (item) => item.columnName == columnname
      );
    },
    ChangeTranslate() {
      this.TranslateItem.language = !!this.TranslateItem.languageId
        ? this.LanguageList.filter(
            (item) => item.value == this.TranslateItem.languageId
          )[0].text
        : "";
    },
    clearLangTable(columnname) {
      this.TranslateItem = {
        language: "",
        languageId: 0,
        columnName: columnname,
        translateText: "",
      };
    },
    AddTranslate() {
      if (
        this.TranslateItem.languageId === null ||
        this.TranslateItem.languageId === undefined ||
        this.TranslateItem.languageId === 0 ||
        this.TranslateItem.languageId === ""
      ) {
        this.makeToast(this.$t("notSelectLang"), "danger");
        return false;
      }
      if (
        this.Data.translates.filter(
          (item) =>
            item.languageId === this.TranslateItem.languageId &&
            item.columnName == this.TranslateItem.columnName
        ).length > 0
      ) {
        this.makeToast(this.$t("AlreadySelectLang"), "danger");
        return false;
      }
      this.Data.translates.push(this.TranslateItem);
      this.GetTranslateItems(this.TranslateItem.columnName);
      this.clearLangTable(this.TranslateItem.columnName);
    },
    backToList() {
      this.$router.push({ name: "role" });
    },
    onChangeCheckbox(id) {
      console.log();
    },
    checkValid() {
      let valid = false;
      if (this.Data.shortName !== "" && this.Data.shortName !== null) {
        valid = true;
      } else {
        valid = false;
      }
      return valid;
    },
    SaveData() {
      this.loadingButton = true;
      if (this.checkValid()) {
        if (this.checkValid()) {
          UserService.Update(this.Data)
            .then((res) => {
              this.makeToast(this.$t("SaveSuccess"), "success");
              this.$router.push({ name: "user" });
            })
            .catch((err) => {
              console.log(err);
              this.makeToast(this.$t(err), "danger");
            });
        }
      }
    },
    // saveRole() {
    //   this.loadingButton = true;
    //   const vm = this;
    //   if (this.checkValid()) {
    //     try {
    //       UserService.Update(this.Data).then(response => {
    //         vm.loadingButton = false;

    //         if (this.$route.params.id) {
    //           vm.makeToast(vm.$t("SuccessSave"), "success");
    //         } else {
    //           vm.makeToast(vm.$t("SuccessSave"), "success");
    //         }
    //         setTimeout(() => {
    //           vm.$router.push({ name: "role" });
    //         }, 500);
    //       });
    //     } catch (e) {
    //       this.loadingButton = false;
    //       const response = JSON.parse(e.request.response);
    //       this.makeToast(response.error, "danger");
    //     }
    //   } else {
    //     this.loadingButton = false;
    //     this.makeToast(this.$t("messages.all_field_required"), "danger");
    //   }
    // }
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
