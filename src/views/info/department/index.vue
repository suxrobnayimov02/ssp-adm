<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-model="filter.pageSize"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <!-- v-if="$store.state.auth.organizationtype !== 4 && $can('RoleEdit','permissions')" -->
          <b-button
            variant="primary"
            :to="{ name: 'EditDepartment', params: { id: 0 } }"
          >
            <feather-icon icon="PlusIcon"></feather-icon>
            {{ $t("create") }}
          </b-button>
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

    <form-table
      ref="myChild"
      :service="DerpartmenService"
      :router="'Department'"
      :fields="fields"
      :actions="actions"
      :filter="filter"
      :permission="'Department'"
    ></form-table>
  </b-card>
</template>

<script>
import {
  BSpinner,
  BButton,
  BPagination,
  BTable,
  BCol,
  BRow,
  BCard,
  BTooltip,
  BBadge,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  VBTooltip,
  BModal,
  BLink,
  BCardText,
} from "bootstrap-vue";
import DerpartmenService from "@/services/info/department.service";
import FormTable from "@/components/forms/form-table.vue";

export default {
  components: {
    BButton,
    FormTable,
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
    BCardText,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      items: [],
      DerpartmenService,
      actions: {
        edit: true,

        delete: true,
      },
      fields: [
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },

        {
          key: "shortName",
          label: this.$t("shortname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "fullName",
          label: this.$t("fullname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "parent",
          label: this.$t("parent"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "organization",
          label: this.$t("organization"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      filter: {
        search: "",
        sortBy: "",
        orderType: "asc",
        page: 1,
        pageSize: 20,
        perPageOptions: [10, 20, 50, 100],
        total: 0,
      },
      isBusy: false,
      DeleteLoading: false,
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
    },
  },
  created() {
    this.Refresh();
  },
  methods: {
    // DbClick(item) {
    //   this.$router.push({ name: "EditDepartment", params: { id: item.id } });
    // },
    SortChange(data) {
      this.filter.sortBy = data.sortBy;
      this.filter.orderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },

    Refresh() {
      this.isBusy = true;

      console.log(this.$refs);
      this.$refs.myChild.refresh();
      this.isBusy = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
