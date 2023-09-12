<template>
  <b-nav-item-dropdown id="dropdown-grouped" variant="link" class="dropdown-language" right>
    <template #button-content>
      <!-- <b-img
        :src="currentLocale.img"
        height="14px"
        width="22px"
        :alt="currentLocale.locale"
      />-->
      <!-- <span class="ml-50 text-body">{{ isLogin ? currentLocale.name : user.language}}</span> -->
      <span class="ml-50 text-body">{{ currentLocale.name}}</span>
    </template>
    <b-dropdown-item
      v-for="language in LanguageList"
      :key="language.value"
      @click="ChangeLang(language)"
    >
      <!-- <b-img
        :src="localeObj.img"
        height="14px"
        width="22px"
        :alt="localeObj.locale"
      />-->
      <span class="ml-50">{{ language.text }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from "bootstrap-vue";
import AccountService from "@/services/others/account.service";
import ManualService from "@/services/others/manual.service";

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      LanguageList: [],
      user: {}
    };
  },
  created() {
    ManualService.LanguageSelectList()
      .then(res => {
        // window.location.reload();
        this.LanguageList = res.data;
      })
      .catch(error => {
        this.makeToast(error.response.data.error, "danger");
      });

    this.user = JSON.parse(localStorage.getItem("user_info"));
  },
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale);
    }
  },
  methods: {
    ChangeLang(item) {
      let tempLocal = "ru";

      if (item.value == 1) {
        tempLocal = "ru";
      } else if (item.value == 2) {
        tempLocal = "uz_cyrl";
      } else if (item.value == 3) {
        tempLocal = "uz_latn";
      } else if (item.value == 4) {
        tempLocal = "eng";
      }

      this.$i18n.locale = tempLocal;
      localStorage.setItem("locale", tempLocal);

      if (this.isLogin) {
        this.$emit("getLanguageId", item.value);
      } else {
        AccountService.ChangeLanguage({ languageId: item.value }).then(res => {
          AccountService.GetUserInfo().then(result => {
            localStorage.setItem("user_info", JSON.stringify(result.data));

            window.location.reload();
          });
        });
      }
    }
  },
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        locale: "uz_cyrl",
        name: "Ўзбек тили"
      },
      {
        locale: "uz_latn",
        name: "O'zbek tili"
      },
      {
        locale: "ru",
        name: "Русский язык"
      }
      // {
      //   locale: 'pt',
      //   img: require('@/assets/images/flags/pt.png'),
      //   name: 'Portuguese',
      // },
    ];
    /* eslint-disable global-require */

    return {
      locales
    };
  }
};
</script>

<style>
</style>
