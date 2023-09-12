<template>
   <div>
      <validation-provider #default="validationContext" name="employee" :rules="requiredStar ? 'required' : null">
         <b-form-group :state="getValidationState(validationContext)">
            <label>
               {{ $t(`employee`) }}
               <span v-if="requiredStar" style="color: red">*</span>
            </label>
            <div>
               <v-select
                  :options="options"
                  :placeholder="$t(`employee`)"
                  v-bind="$attrs"
                  :reduce="(e) => e.id"
                  :value="value"
                  label="fullName"
                  :filterable="false"
                  @input="onInput"
                  @open="onOpen"
                  @close="onClose"
                  @search="inputSearch"
                  @option:selected="onSelected"
               >
                  <template #list-footer>
                     <li v-show="hasNextPage" ref="load" style="text-align: center">Loading more options...</li>
                     <li style="text-align: center; padding: 3px">
                        <b-button :to="{ name: 'EditEmployee', params: { id: 0 } }" block size="sm" variant="outline-primary">
                           <feather-icon icon="PlusIcon"></feather-icon>
                           {{ $t('Add') }}
                        </b-button>
                     </li>
                  </template>
               </v-select>
            </div>

            <b-form-invalid-feedback :state="getValidationState(validationContext)">{{ $t('fieldNotEmpty') }}</b-form-invalid-feedback>
         </b-form-group>
      </validation-provider>
   </div>
</template>

<script>
import EmployeeService from '@/services/info/employee.service.js';
import axios from 'axios';
import formValidation from '@core/comp-functions/forms/form-validation';
import { ValidationProvider } from 'vee-validate';
import { BFormGroup, BFormInvalidFeedback, BButton } from 'bootstrap-vue';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const debounce = (func, delay) => {
   let debounceTimer;
   return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
   };
};

export default {
   components: {
      ValidationProvider,
      BFormGroup,
      BFormInvalidFeedback,
      BButton
   },
   props: {
      value: {
         type: Number,
         default: null
      },
      requiredStar: {
         type: Boolean,
         default: false
      }
   },
   emits: ['input', 'update:data'],
   data() {
      return {
         observer: null,
         options: [],
         page: 0,
         pageSize: 20,
         total: 0
      };
   },
   setup() {
      const { getValidationState } = formValidation();

      return {
         getValidationState
      };
   },
   mounted() {
      this.observer = new IntersectionObserver(this.infiniteScroll);
      if (this.value) {
         EmployeeService.Get(this.value).then((res) => {
            if (res.data && res.data.person) {
               this.options.push({ ...res.data.person, id: res.data.id });
            }
            this.total = 1;
         });
      } else {
         this.getOptions();
      }
   },
   computed: {
      hasNextPage() {
         return this.options.length < this.total;
      }
   },
   methods: {
      onInput(e) {
         this.$emit('input', e);
         if (!e) {
            this.$emit('update:data', null);
         }
      },
      onSelected(selectedOption) {
         this.$emit('update:data', selectedOption);
      },
      async onOpen() {
         if (this.hasNextPage) {
            await this.$nextTick();
            this.observer.observe(this.$refs.load);
         }
      },
      onClose() {
         this.observer.disconnect();
      },
      async infiniteScroll([{ isIntersecting, target }]) {
         if (isIntersecting) {
            const ul = target.offsetParent;
            const scrollTop = target.offsetParent.scrollTop;
            await this.getOptions();
            await this.$nextTick();
            ul.scrollTop = scrollTop;
         }
      },
      async getOptions(search, loading = () => {}) {
         this.page++;
         loading(true);
         source.cancel();
         EmployeeService.GetList(
            {
               page: this.page,
               pageSize: this.pageSize,
               total: this.total,
               search: search,
               orderType: 'asc'
            },
            {
               cancelToken: source.token
            }
         )
            .then((res) => {
               const { rows, total = 0 } = res.data;
               if (Array.isArray(rows)) {
                  this.options.push(...rows);
               }
               this.total = total;
            })
            .finally(() => {
               loading(false);
            });
      },
      inputSearch: debounce(async function (search, loading) {
         if (search) {
            this.options = [];
            this.page = 0;
            this.getOptions(search, loading);
         }
      }, 300)
   }
};
</script>
