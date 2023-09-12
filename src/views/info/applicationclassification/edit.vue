<template>
   <div>
      <b-card>
         <validation-observer ref="ValidationDTO">
            <b-row>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.code" required :label="$t('code')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.shortName" required :label="$t('shortname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('short_name')">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>
               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.fullName" required :label="$t('fullname')">
                        <b-input-group-append>
                           <b-button variant="primary" @click="OpenTranslateModal('full_name')">
                              <feather-icon icon="GlobeIcon"></feather-icon>
                           </b-button>
                        </b-input-group-append>
                     </form-input>
                  </div>
               </b-col>

               <!-- <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.precision" type="number" :label="$t('precision')" />
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-input v-model="Data.scale" type="number" :label="$t('scale')" />
                  </div>
               </b-col>-->

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-select
                        :disabled="parentId"
                        :options="ParentList"
                        v-model="Data.parentId"
                        :label="$t('appClassParent')"
                        @change="changeParent"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-select
                        :options="OrganizationList"
                        v-model="Data.organizationId"
                        :label="$t('organization')"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="3">
                  <div class="form-group">
                     <form-select
                        :options="OrganizationLevelList"
                        v-model="Data.organizationLevelId"
                        :label="$t('organizationLevel')"
                     ></form-select>
                  </div>
               </b-col>

               <b-col sm="12" md="3" v-if="!Data.parentId">
                  <h6 class="inputTitle">{{ $t('Upload') }}</h6>
                  <b-form-file type="file" :placeholder="$t('Upload')" @change="UploadFile"></b-form-file>

                  <!-- v-model="Data.file.name" -->
               </b-col>

               <b-col sm="12" md="2" class="mt-2">
                  <div class="form-group">
                     <b-form-checkbox v-model="Data.isGroup">{{ $t('Isgroup') }}</b-form-checkbox>
                  </div>
               </b-col>
            </b-row>
         </validation-observer>
         <!-- <b-row>
            <b-col class="text-right mt-2">
               <b-button @click="OpenTabrow" size="sm" variant="outline-primary">
                  <feather-icon icon="PlusIcon"></feather-icon>
                  {{ $t('Add') }}
               </b-button>
            </b-col>
         </b-row>-->
         <div class="row justify-content-center" v-if="!Data.isGroup">
            <div class="col-3">
               <h3 class="text-center">{{ $t('Draggable1') }}</h3>
               <draggable
                  class="dragArea list-group list-group1"
                  :list="FormControlList"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :move="checkMove"
                  :clone="cloneDog"
               >
                  <div
                     class="list-group-item"
                     v-for="element in FormControlList"
                     :key="element.value + 'ah'"
                     :class="{moved: tempArray.includes(element.value)}"
                  >{{ element.text }}</div>
               </draggable>
            </div>

            <div class="col-3">
               <h3 class="text-center">{{ $t('Draggable2') }}</h3>
               <draggable
                  class="dragArea list-group list-group2"
                  :list="Data.tables"
                  group="people"
                  @add="AddListArray"
               >
                  <div
                     class="list-group-item d-flex justify-content-between align-items-center"
                     v-for="element in Data.tables"
                     :key="element.formControlId + 'ag'"
                  >
                     {{ element.formControl }}
                     <span
                        class="removeTables"
                        @click="removeTablesItem(element.formControlId)"
                     >x</span>
                  </div>
               </draggable>
            </div>
         </div>

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
         :title="$t('applicationclassification2')"
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
               <b-form-input :placeholder="$t('fullname')" v-model="item.translateText" />
            </template>
         </b-table>
         <b-row>
            <b-col class="text-right">
               <b-button @click="TranslateModal = false" variant="success">{{ $t("Save") }}</b-button>
            </b-col>
         </b-row>
      </b-modal>
   </div>
</template>
<script>
import ManualService from '@/services/others/manual.service';
import FctrlFormControlService from '@/services/info/fctrlformcontrol.service';
import ApplicationClassificationService from '@/services/info/applicationclassification.service';
import OrganizationService from '@/services/managment/organization.service';
import draggable from 'vuedraggable';

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
   BFormFile
} from 'bootstrap-vue';

export default {
   props: {
      isComponent: {
         type: Boolean,
         default: false
      },
      parentId: {},
      data: {
         type: Number,
         default: null
      }
   },
   components: {
      draggable,
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
      BFormFile
   },
   name: 'Edit',

   data() {
      return {
         lang: '',
         loadingButton: false,
         Data: {
            translates: [],
            tables: []
         },
         TranslateModal: false,
         TranslateFields: [
            {
               key: 'language',
               label: this.$t('languagename'),
               class: 'text-center'
            },
            {
               key: 'translateText',
               label: this.$t('translatetext'),
               class: 'text-center'
            },
            { key: 'action', label: this.$t('actions'), thClass: 'text-center' }
         ],
         TranslateItem: {
            language: '',
            languageId: 0,
            columnName: '',
            translateText: ''
         },
         ParentList: [],
         OrganizationList: [],
         TranslateItems: [],
         LanguageList: [],
         FormControlList: [],
         OrganizationLevelList: [],
         tempArray: [],
         fileLoading: false
      };
   },
   created() {
      this.lang = localStorage.getItem('locale') || 'ru';
      ApplicationClassificationService.Get(this.data ? this.data : this.$route.params.id).then(res => {
         this.Data = res.data;

         if (this.isComponent) {
            this.Data.parentId = this.parentId;
         }
      });

      if (this.$route.params.id != 0 || this.data != null) {
         this.AddListArray();
      }

      ApplicationClassificationService.GetAsSelectList({
         isGroup: true
      })
         .then(res => {
            this.ParentList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      OrganizationService.GetAsSelectList()
         .then(res => {
            this.OrganizationList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      FctrlFormControlService.GetAsSelectList()
         .then(res => {
            this.FormControlList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ManualService.LanguageSelectList()
         .then(res => {
            this.LanguageList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });

      ManualService.OrganizationLevelSelectList()
         .then(res => {
            this.OrganizationLevelList = res.data;
         })
         .catch(error => {
            this.makeToast(error.response.data.error, 'danger');
         });
   },
   methods: {
      changeParent() {
         this.Data.file.id = '';
         this.Data.file.fileName = '';
      },
      UploadFile(event) {
         const formData = new FormData();
         formData.append('file', event.target.files[0]);
         this.fileLoading = true;
         ApplicationClassificationService.UploadFile(formData).then(res => {
            this.Data.file.id = res.data.fileId;
            this.Data.file.fileName = res.data.fileName;
            this.fileLoading = false;
         });
      },
      checkMove(evt) {
         return !this.tempArray.includes(evt.draggedContext.element.value);
      },
      AddListArray() {
         this.tempArray = [];
         this.Data.tables.map(i => {
            this.tempArray.push(i.formControlId);
         });
      },

      removeTablesItem(id) {
         this.Data.tables = this.Data.tables.filter(item => item.formControlId != id);
         this.AddListArray();
      },

      log(evt) {
         console.log(evt);
      },
      cloneDog({ value, text }) {
         return {
            id: 0,
            formControlId: value,
            formControl: text
         };
      },
      OpenTranslateModal(columnname) {
         this.TranslateModal = true;
         this.GetTranslateItems(columnname);
         this.clearLangTable(columnname);
      },
      GetTranslateItems(columnname) {
         this.TranslateItems = this.Data.translates.filter(item => item.columnName == columnname);
      },
      ChangeTranslate() {
         this.TranslateItem.language = !!this.TranslateItem.languageId ? this.LanguageList.filter(item => item.value == this.TranslateItem.languageId)[0].text : '';
      },
      clearLangTable(columnname) {
         this.TranslateItem = {
            language: '',
            languageId: 0,
            columnName: columnname,
            translateText: ''
         };
      },
      AddTranslate() {
         if (this.TranslateItem.languageId === null || this.TranslateItem.languageId === undefined || this.TranslateItem.languageId === 0 || this.TranslateItem.languageId === '') {
            this.makeToast(this.$t('notSelectLang'), 'danger');
            return false;
         }
         if (this.Data.translates.filter(item => item.languageId === this.TranslateItem.languageId && item.columnName == this.TranslateItem.columnName).length > 0) {
            this.makeToast(this.$t('AlreadySelectLang'), 'danger');
            return false;
         }
         this.Data.translates.push(this.TranslateItem);
         this.GetTranslateItems(this.TranslateItem.columnName);
         this.clearLangTable(this.TranslateItem.columnName);
      },
      backToList() {
         this.$router.push({ name: 'role' });
      },
      checkValid() {
         let valid = false;
         if (this.Data.shortName !== '' && this.Data.shortName !== null) {
            valid = true;
         } else {
            valid = false;
         }
         return valid;
      },
      SaveData() {
         this.loadingButton = true;
         if (this.checkValid()) {
            ApplicationClassificationService.Update(this.Data)
               .then(res => {
                  this.makeToast(this.$t('SaveSuccess'), 'success');
                  if (this.isComponent) {
                     this.$emit('close');
                  } else {
                     this.$router.push({ name: 'ApplicationClassification' });
                  }
               })
               .catch(err => {
                  this.makeToast(this.$t(err), 'danger');
               });
         }
      }
   }
};
</script>
<style scoped lang="scss">
.dragArea.list-group {
   height: 400px;
}

.list-group1 {
   border: 1px solid var(--red);

   .list-group-item {
      &:hover {
         cursor: grab;
         caret-color: red;
      }
   }
}

.list-group2 {
   border: 1px solid var(--success);
}
.list-group-item.moved {
   background-color: var(--danger);
   color: #fff;
}
.removeTables {
   background-color: var(--red);
   padding: 5px;
   color: #fff;
   border-radius: 50%;
   height: 20px;
   width: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 11px;
   cursor: pointer;
}
</style>