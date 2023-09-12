<template>
   <b-card no-body>
      <div class="m-2">
         <b-row>
            <b-col
               cols="12"
               md="6"
               class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
            >
               <!-- <label>{{$t('Entries')}}</label>
               <v-select
                  v-model="filter.pageSize"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="filter.perPageOptions"
                  :clearable="false"
                  @input="Refresh"
                  class="per-page-selector d-inline-block ml-50 mr-1"
               />
               <b-button
                  variant="primary"
                  :to="{ name: 'EditApplicationClassification',params : {id : 0}}"
               >
                  <feather-icon icon="PlusIcon"></feather-icon>
                  {{ $t('create') }}
               </b-button>-->
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

         <div v-if="loadingApp">
            <div>
               <b-spinner variant="primary" />
            </div>
         </div>

         <div class="btn-items__content mt-2" v-else>
            <template v-for="(value, propertyName, index) in ApplicationClassificationList">
               <div class="btn-items" :key="index + Number(propertyName) + 'ajk'">
                  <div
                     class="btn-item"
                     v-for="AppItem in value"
                     :key="AppItem.value + 1 *5 + 'ui'"
                     @click.self="GetApplicationClassificationChild(AppItem, propertyName, $event)"
                     :class="{active: AppItem.isChecked}"
                     :disabled="!AppItem.isGroup"
                  >
                     <div class="btn-item__actions">
                        <div
                           class="btn-item__actions-item"
                           v-if="$can('ApplicationClassificationEdit', 'permissions')"
                        >
                           <b-link
                              @click="editClass(AppItem, propertyName)"
                              style="margin-right:5px;cursor:pointer"
                           >
                              <feather-icon icon="EditIcon"></feather-icon>
                           </b-link>
                        </div>
                        <div
                           class="btn-item__actions-item"
                           v-if="$can('ApplicationClassificationDelete', 'permissions')"
                        >
                           <b-link @click="deleteClass(AppItem)" style="cursor:pointer;">
                              <feather-icon icon="TrashIcon"></feather-icon>
                           </b-link>
                        </div>
                     </div>
                     <div class="btn-item__text">{{ AppItem.text }}</div>
                     <div class="btn-item__count" v-if="AppItem.childCount">{{ AppItem.childCount }}</div>
                  </div>
                  <div class="addBtn" @click="OpenModale(propertyName)" :title="$t('Add')">
                     <feather-icon icon="PlusIcon"></feather-icon>
                  </div>
               </div>
            </template>
         </div>
      </div>

      <b-modal
         v-model="DeleteModal"
         :cancel-title="$t('Cancel')"
         :ok-title="$t('Accept')"
         cancel-variant="danger"
         ok-variant="success"
         @ok="Delete(TempItem)"
      >
         <template #modal-title>
            {{ $t('Accept') }}
            <b-spinner v-if="DeleteLoading" small></b-spinner>
         </template>
         <b-card-text>
            <h5>ID : {{ TempItem.value }}</h5>
            <h5>{{ $t('WantDelete') }}</h5>
         </b-card-text>
      </b-modal>

      <b-modal size="xl" title v-model="AddModal" hide-footer no-close-on-backdrop>
         <add-application-classification
            @close="CloseModale"
            :parent-id="filter.parentId"
            :data="TempItem.value"
            is-component
         />
         <!-- <b-row>
            <b-col class="text-right">
               <b-button @click="AddModal = false" variant="success">{{ $t("Save") }}</b-button>
            </b-col>
         </b-row>-->
      </b-modal>
   </b-card>
</template>

<script>
import { BSpinner, BButton, BPagination, BTable, BCol, BRow, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend, VBTooltip, BModal, BLink, BCardText } from 'bootstrap-vue';
import ApplicationClassificationService from '@/services/info/applicationclassification.service';
import AddApplicationClassification from '@/views/info/applicationclassification/edit.vue';

export default {
   components: {
      BButton,
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
      AddApplicationClassification
   },
   directives: {
      'b-tooltip': VBTooltip
   },
   name: 'Index',
   data() {
      return {
         items: [],
         AddModal: false,
         ApplicationClassificationList: {},
         filter: {
            search: '',
            sortBy: '',
            orderType: 'asc',
            page: 1,
            pageSize: 20,
            perPageOptions: [10, 20, 50, 100],
            total: 0,
            parentId: null
         },
         isBusy: false,
         loadingApp: false,
         DeleteLoading: false,
         DeleteModal: false,
         TempItem: {}
      };
   },
   computed: {},
   created() {
      this.Refresh();
   },
   methods: {
      OpenModale(index) {
         this.TempItem = {};
         if (index == 1) {
            this.filter.parentId = null;
         } else {
            this.filter.parentId = this.ApplicationClassificationList[index - 1].find(item => item.isChecked).value;
         }

         this.AddModal = true;
      },
      CloseModale() {
         this.Refresh();
         this.TempItem = {};
         this.AddModal = false;
      },
      GetApplicationClassificationChild(item, index) {
         this.filter.parentId = item.value;
         Object.keys(this.ApplicationClassificationList).forEach(key => {
            if (key > index) {
               delete this.ApplicationClassificationList[key];
            }
         });
         this.ApplicationClassificationList[index].forEach(data => {
            if (data.value == item.value) {
               data.isChecked = true;
            } else {
               data.isChecked = false;
            }
         });

         if (item.isGroup) {
            this.loadingApp = true;
            ApplicationClassificationService.GetAsSelectList({ parentId: item.value })
               .then(res => {
                  this.ApplicationClassificationList[Number(index) + 1] = res.data;
                  this.loadingApp = false;
               })
               .catch(error => {
                  this.makeToast(error.response.data.error, 'danger');
                  this.loadingApp = false;
               });
         }
         // else {
         //    this.Data.applicationClassificationId = item.value;
         //    ApplicationClassificationService.GetInfo(item.value)
         //       .then(res => {
         //          this.FormControlList = res.data.infoTables;
         //          this.loadingApp = false;
         //       })
         //       .catch(error => {
         //          this.makeToast(error.response.data.error, 'danger');
         //          this.loadingApp = false;
         //       });
         // }
      },
      deleteClass(AppItem) {
         this.TempItem = AppItem;
         this.DeleteModal = true;
      },
      editClass(AppItem, index) {
         this.TempItem = AppItem;
         if (index == 1) {
            this.filter.parentId = null;
         } else {
            this.filter.parentId = this.ApplicationClassificationList[index - 1].find(item => item.isChecked).value;
         }
         this.AddModal = true;
      },
      Delete(item) {
         this.DeleteLoading = true;
         ApplicationClassificationService.Delete(item.value)
            .then(res => {
               this.DeleteLoading = false;
               this.makeToast(this.$t('DeleteSuccess'), 'success');
               this.Refresh();
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
               this.DeleteLoading = false;
            });
      },
      Refresh() {
         // this.isBusy = true;
         // ApplicationClassificationService.GetList(this.filter).then(res => {
         //    this.items = res.data.rows;
         //    this.filter.total = res.data.total;
         //    this.isBusy = false;
         // });

         this.loadingApp = true;
         ApplicationClassificationService.GetAsSelectList({ parentId: 0 })
            .then(res => {
               this.ApplicationClassificationList['1'] = res.data;
               this.loadingApp = false;
            })
            .catch(error => {
               this.makeToast(error.response.data.error, 'danger');
               this.loadingApp = false;
            });
      }
   }
};
</script>

<style lang="scss" scoped>
.btn-items__content {
   overflow: hidden;
   // border: 1px solid red;
}
.btn-items {
   display: flex;
   overflow-x: scroll;
   padding-bottom: 1rem;
   align-items: center;
}
.btn-item {
   border: 2px solid #d8d6de;
   border-radius: 27px;
   padding: 15px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: all 0.3s ease-in-out;
   margin-right: 1rem;
   width: 300px !important;
   min-width: fit-content;
   position: relative;
   &[disabled] {
      background-color: #d8d6de;
   }

   .btn-item__actions {
      position: absolute;
      background-color: #d8d6de;
      right: 0;
      bottom: -10px;
      padding: 5px 10px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(80%);
      z-index: -10;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      &-item {
         margin-right: 5px;
         &:last-child {
            margin-right: 0;
         }
      }
   }
   &:last-child {
      margin-right: 0;
   }

   &__count {
      background-color: #d8d6de;
      color: #fff;
      border-radius: 50%;
      padding: 2px 10px;
      transition: all 0.3s ease-in-out;
      margin-left: 1rem;
   }

   &:hover {
      border-color: #246bfd;
      cursor: pointer;
      color: #6e6b7b;
      .btn-item__count {
         background-color: #246bfd;
      }

      .btn-item__actions {
         z-index: 1;
         opacity: 1;
      }
   }
}
.addBtn {
   width: 30px;
   height: 30px;
   border: 1px solid var(--success);
   border-radius: 50%;
   min-width: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   transition: all 0.3s ease-in-out;
   color: var(--success);

   &:hover {
      background-color: var(--success);
      color: #fff;
   }
}
.btn-item.active {
   border-color: #246bfd;
   color: #6e6b7b;
   .btn-item__count {
      background-color: #246bfd;
   }
}
</style>