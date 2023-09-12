<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <validation-observer ref="ValidationDTO">
            <b-row>
              <b-col sm="12" md="3">
                <div class="form-group">
                  <form-input v-model="Data.code" :label="$t('code')" />
                </div>
              </b-col>
              <b-col sm="12" md="3">
                <div class="form-group">
                  <form-input
                    v-model="Data.shortName"
                    required
                    :label="$t('shortname')"
                  >
                    <b-input-group-append>
                      <b-button
                        variant="primary"
                        @click="OpenTranslateModal('short_name')"
                      >
                        <feather-icon icon="GlobeIcon"></feather-icon>
                      </b-button>
                    </b-input-group-append>
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
                    <b-input-group-append>
                      <b-button
                        variant="primary"
                        @click="OpenTranslateModal('full_name')"
                      >
                        <feather-icon icon="GlobeIcon"></feather-icon>
                      </b-button>
                    </b-input-group-append>
                  </form-input>
                </div>
              </b-col>
              <b-col sm="12" md="3">
                <form-select
                  :options="WorkScheduleKindList"
                  v-model="Data.workScheduleKindId"
                  :label="$t('workScheduleKind')"
                ></form-select>
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
            <hr />
            <b-tabs pills>
              <b-tab :title="$t('dayHours')">
                <b-row>
                  <b-col sm="12" md="2">
                    <div class="form-group">
                      <form-input
                        v-model="TabrowDayHours.dayNumber"
                        :label="$t('dayNumber')"
                        type="number"
                      />
                    </div>
                  </b-col>

                  <b-col sm="12" md="2">
                    <div class="form-group">
                      <label for>
                        {{ $t("isDayOff") }}
                      </label>
                      <div>
                        <b-form-checkbox v-model="TabrowDayHours.isDayOff" />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="2">
                    <form-picker
                      v-model="TabrowDayHours.beginAt"
                      :label="'beginAt'"
                      :placeholder="$t('beginAt')"
                    ></form-picker>
                  </b-col>
                  <b-col sm="12" md="2">
                    <form-picker
                      v-model="TabrowDayHours.endAt"
                      :label="'endAt'"
                      :placeholder="$t('endAt')"
                    ></form-picker>
                  </b-col>

                  <b-col class="text-right my-auto" md="4" sm="12">
                    <b-button
                      @click="AddrowDayHours"
                      size="sm"
                      variant="outline-primary"
                    >
                      <feather-icon icon="PlusIcon"></feather-icon>
                      {{ $t("Add") }}
                    </b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <b-table
                      :fields="fieldsDayHours"
                      small
                      responsive="sm"
                      :items="Data.dayHours"
                    >
                      <template #cell(isDayOff)="{ item }">
                        {{ item.isDayOff ? $t("yes") : $t("no") }}
                      </template>
                      <template #cell(actions)="{ item, index }">
                        <div class="text-center">
                          <b-link>
                            <feather-icon
                              style="margin-right: 5px"
                              @click="EditTabrowDayHours(item)"
                              icon="EditIcon"
                            ></feather-icon>
                          </b-link>
                          <b-link>
                            <feather-icon
                              @click="DeleteTabrowDayHours(index)"
                              icon="Trash2Icon"
                            ></feather-icon>
                          </b-link>
                        </div>
                      </template>
                      <template #cell(order)="{ index }">
                        <span>{{ index + 1 }}</span>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab :title="$t('workHours')">
                <b-row>
                  <b-col sm="12" md="2">
                    <form-picker
                      v-model="TabrowWorkHours.dateOn"
                      :label="'dateOn'"
                      :placeholder="$t('docOn')"
                    ></form-picker>
                  </b-col>
                  <b-col sm="12" md="2">
                    <div class="form-group">
                      <form-input
                        v-model="TabrowWorkHours.days"
                        :label="$t('days')"
                        type="number"
                      />
                    </div>
                  </b-col>
                  <b-col sm="12" md="2">
                    <div class="form-group">
                      <form-input
                        v-model="TabrowWorkHours.hours"
                        :label="$t('hours')"
                        type="number"
                      />
                    </div>
                  </b-col>

                  <b-col class="text-right my-auto" md="6" sm="12">
                    <b-button
                      @click="AddrowWorkHours"
                      size="sm"
                      variant="outline-primary"
                    >
                      <feather-icon icon="PlusIcon"></feather-icon>
                      {{ $t("Add") }}
                    </b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <b-table
                      :fields="fieldsWorkHours"
                      small
                      responsive="sm"
                      :items="Data.workHours"
                    >
                      <template #cell(actions)="{ item, index }">
                        <div class="text-center">
                          <b-link>
                            <feather-icon
                              style="margin-right: 5px"
                              @click="EditTabrowWorkHours(item)"
                              icon="EditIcon"
                            ></feather-icon>
                          </b-link>
                          <b-link>
                            <feather-icon
                              @click="DeleteTabrowWorkHours(index)"
                              icon="Trash2Icon"
                            ></feather-icon>
                          </b-link>
                        </div>
                      </template>
                      <template #cell(order)="{ index }">
                        <span>{{ index + 1 }}</span>
                      </template>
                    </b-table>
                  </b-col>
                </b-row></b-tab
              >
            </b-tabs>

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
              <form-select
                :options="LanguageList"
                v-model="TranslateItem.languageId"
                @input="ChangeTranslate"
              ></form-select>
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
          <b-button @click="TranslateModal = false" variant="success">
            {{ $t("Save") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-overlay>
</template>
<script>
import ManualService from "@/services/others/manual.service";
import WorkScheduleService from "@/services/info/workschedule.service";
import { ValidationObserver } from "vee-validate";

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
  BTabs,
  BTab,
  BLink,
} from "bootstrap-vue";

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
    ValidationObserver,
    BTable,
    BTd,
    BTr,
    BTabs,
    BTab,
    BLink,
  },
  name: "Edit",

  data() {
    return {
      lang: "",
      show: false,
      StateList: [],
      TabrowDayHours: {
        dayNumber: 0,
        isDayOff: false,
        beginAt: "",
        endAt: "",
      },
      TabrowWorkHours: {
        dateOn: "",
        days: 0,
        hours: 0,
      },
      fieldsDayHours: [
        {
          key: "order",
          label: this.$t("№"),
          sortable: true,
        },
        {
          key: "dayNumber",
          label: this.$t("dayNumber"),

          sortable: true,
        },

        {
          key: "isDayOff",
          label: this.$t("isDayOff"),
          sortable: true,
        },
        {
          key: "beginAt",
          label: this.$t("beginAt"),
          sortable: true,
        },
        {
          key: "endAt",
          label: this.$t("endAt"),
          sortable: true,
        },

        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      fieldsWorkHours: [
        {
          key: "order",
          label: this.$t("№"),
          sortable: true,
        },
        {
          key: "dateOn",
          label: this.$t("dateOn"),

          sortable: true,
        },

        {
          key: "days",
          label: this.$t("days"),
          sortable: true,
        },
        {
          key: "hours",
          label: this.$t("hours"),
          sortable: true,
        },

        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      WorkScheduleKindList: [],
      loadingButton: false,
      saveLoading: false,
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
      editedIndex: -1,
      TranslateItems: [],
      LanguageList: [],
    };
  },

  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    WorkScheduleService.Get(this.$route.params.id).then((res) => {
      this.show = false;
      this.Data = res.data;
    });

    ManualService.LanguageSelectList()
      .then((res) => {
        this.LanguageList = res.data;
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
    ManualService.WorkScheduleKindSelectList()
      .then((res) => {
        this.WorkScheduleKindList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
  },
  methods: {
    DeleteTabrowDayHours(index) {
      this.Data.dayHours.splice(index, 1);
    },
    DeleteTabrowWorkHours(index) {
      this.Data.workHours.splice(index, 1);
    },
    EditTabrowDayHours(item) {
      this.editedIndex = this.Data.dayHours.indexOf(item);
      this.TabrowDayHours = Object.assign({}, item);
    },
    EditTabrowWorkHours(item) {
      this.editedIndex = this.Data.workHours.indexOf(item);
      this.TabrowWorkHours = Object.assign({}, item);
    },
    AddrowDayHours() {
      this.TabrowDayHours.dayNumber = parseInt(this.TabrowDayHours.dayNumber);
      if (this.editedIndex > -1) {
        Object.assign(
          this.Data.dayHours[this.editedIndex],
          this.TabrowDayHours
        );
        this.editedIndex = -1;
        this.TabrowDayHours = {
          dayNumber: 0,
          isDayOff: false,
          beginAt: "",
          endAt: "",
        };
      } else {
        this.Data.dayHours.push(this.TabrowDayHours);
        this.TabrowDayHours = {
          dayNumber: 0,
          isDayOff: false,
          beginAt: "",
          endAt: "",
        };
      }
    },
    AddrowWorkHours() {
      this.TabrowWorkHours.days = parseInt(this.TabrowWorkHours.days);
      this.TabrowWorkHours.hours = parseInt(this.TabrowWorkHours.hours);
      if (this.editedIndex > -1) {
        Object.assign(
          this.Data.workHours[this.editedIndex],
          this.TabrowWorkHours
        );
        this.editedIndex = -1;
        this.TabrowWorkHours = {
          dateOn: "",
          days: 0,
          hours: 0,
        };
      } else {
        this.Data.workHours.push(this.TabrowWorkHours);
        this.TabrowWorkHours = {
          dateOn: "",
          days: 0,
          hours: 0,
        };
      }
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

    SaveData() {
      this.$refs.ValidationDTO.validate().then((success) => {
        if (success) {
          this.saveLoading = true;

          WorkScheduleService.Update(this.Data)
            .then((res) => {
              this.makeToast(this.$t("SaveSuccess"), "success");
              this.$router.push({ name: "WorkSchedule" });
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
