<template>
  <validation-provider
    #default="{ validationContext }"
    :name="label"
    :rules="required ? 'required' : null"
  >
    <div class="custom-datepicker" :class="{ 'my-datepicker-disabled' : disabled }">
      <label for >
          {{ label }} <span v-if="required" style="color: red">*</span>
      </label>
      <date-picker
        v-model="inputVal"
        format="DD.MM.YYYY"
        type="date"
        @change="$emit('change',value)"
        input-class="my-custom-date "
        :clearable="false"
        :disabled="disabled"
        :disabled-date="disabledDate"
        :lang="lang == 'ru' ? ru : lang == 'uz_cyrl' ? uz : uz"
        style="width:100%"
      >
        <template #input>
          <b-form-input
            :disabled="disabled"
            @keyup="$emit('keyup',value)"
            @input="Change"
            :placeholder="placeholder ? placeholder: label "
            v-mask="'##.##.####'"
            type="text"
            maxlength="10"
            v-model="value"
            class="my-custom-date"
          />
        </template>
      </date-picker>
      {{ validationContext }}
      <small class="text-danger" v-if="required">
        {{
        $t(`fieldNotEmpty`)
        }}
      </small>
    </div>
  </validation-provider>
</template>

<script>
import DatePicker from "vue2-datepicker";
import uz from "./Uz_datepickr";
import ru from "vue2-datepicker/locale/ru";
import { BFormInput } from "bootstrap-vue";
import { ValidationProvider } from "vee-validate";

export default {
  components: { DatePicker, BFormInput, ValidationProvider },
  props: {
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledDate: {},
    value: {},
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value1: "",
      uz,
      ru,
      lang: localStorage.getItem("locale") || "ru"
    };
  },
  created() {},
  computed: {
    inputVal: {
      get() {

        
        // if (!this.value) {
        //   this.value = "";
        // }
        var arr =
          this.value !== undefined && this.value != null
            ? this.value.split(".")
            : "";

        return arr !== "" ? new Date(arr[2], arr[1] - 1, arr[0]) : this.value;
      },
      set(val) {
        var dd = String(val.getDate()).padStart(2, "0");
        var mm = String(val.getMonth() + 1).padStart(2, "0");
        var yy = val.getFullYear();
        this.value1 = `${dd}.${mm}.${yy}`;
        this.$emit("input", `${dd}.${mm}.${yy}`);
      }
    }
  },
  methods: {
    Change() {},
    handleInput() {
      this.$emit("input", this.value);
      // alert(this.value)
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.value1 = newValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~vue2-datepicker/scss/index.scss";
</style>