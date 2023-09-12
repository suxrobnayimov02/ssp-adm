<template>
   <WInput ref="inputRef" type="text" :label="label" :disabled="disabled" :rules="rules" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input';
import WInput from './WInput.vue';

const options = {
   locale: 'pt-PT',
   currency: 'EUR',
   currencyDisplay: 'hidden',
   hideCurrencySymbolOnFocus: true,
   hideGroupingSeparatorOnFocus: true,
   hideNegligibleDecimalDigitsOnFocus: true,
   autoDecimalDigits: false,
   useGrouping: true,
   accountingSign: false
};

export default {
   components: { WInput },
   props: {
      modelValue: {
         type: [String, Number],
         default: 0
      },
      label: {
         type: String,
         default: 'amount'
      },
      disabled: {
         type: Boolean,
         default: false
      },
      rules: {
         type: String,
         default: ''
      }
   },
   setup() {
      const { inputRef } = useCurrencyInput(options);

      return { inputRef, options };
   }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>