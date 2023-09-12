<template>
   <div>
      <b-card no-body>
         <div class="m-2">
            <b-row>
               <b-col cols="12" md="4">
                  <b-input-group class="text-right">
                     <b-form-input v-model="filter.inn" :placeholder="$t('search')" />
                     <b-input-group-append>
                        <b-button @click="Refresh" variant="primary">
                           <feather-icon icon="SearchIcon" />
                        </b-button>
                     </b-input-group-append>
                  </b-input-group>
               </b-col>
            </b-row>
         </div>
      </b-card>

      <b-card>
         <b-row>
            <b-col sm="12" md="12" class="text-left">
               <h2>{{ $t("davAktivContractor") }}</h2>
            </b-col>
            <b-col sm="12" md="12" class="text-left">
               <b-table-simple
                  hover
                  small
                  caption-top
                  responsive
                  bordered
                  v-if="Data.davAktivContractor.TIN"
               >
                  <b-tbody>
                     <b-tr>
                        <b-th style="width: 25%">{{ $t('address') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.ADDRESS }}</b-td>
                        <b-th style="width: 25%">{{ $t('name') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.NAME }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('NS10') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.NS10 }}</b-td>
                        <b-th style="width: 25%">{{ $t('NS11') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.NS11 }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('ORG_TYPE') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.ORG_TYPE }}</b-td>
                        <b-th style="width: 25%">{{ $t('SEND_DATE') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.SEND_DATE }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('SHARE1') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.SHARE1 }}</b-td>
                        <b-th style="width: 25%">{{ $t('status') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.STATUS }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('TIN') }}</b-th>
                        <b-td style="width: 25%">{{ Data.davAktivContractor.TIN }}</b-td>
                        <b-th style="width: 25%"></b-th>
                        <b-th style="width: 25%"></b-th>
                     </b-tr>
                  </b-tbody>
               </b-table-simple>

               <b-alert
                  show
                  variant="danger"
                  v-else
                  class="d-flex justify-content-center align-items-center"
                  style="height: 150px"
               >
                  <feather-icon icon="ArchiveIcon" size="25" class="mr-1"></feather-icon>
                  {{ $t('NotFound') }}
               </b-alert>
            </b-col>
         </b-row>
      </b-card>

      <b-card>
         <b-row>
            <b-col sm="12" md="12" class="text-left">
               <h2>{{ $t("integrationCertificateDto") }}</h2>
            </b-col>
            <b-col sm="12" md="12" class="text-left">
               <b-table-simple hover small caption-top responsive bordered>
                  <b-tbody>
                     <b-tr>
                        <b-th colspan="4">{{ $t('company') }}</b-th>
                     </b-tr>
                     <b-tr>
                        <b-th style="width: 25%">{{ $t('cancelOn') }}</b-th>
                        <b-td style="width: 25%">{{ Data.integrationCertificateDto.cancelOn }}</b-td>
                        <b-th style="width: 25%">{{ $t('certificateLink') }}</b-th>
                        <b-td
                           style="width: 25%"
                        >{{ Data.integrationCertificateDto.certificateLink }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('certificateNumber') }}</b-th>
                        <b-td
                           style="width: 25%"
                        >{{ Data.integrationCertificateDto.certificateNumber }}</b-td>
                        <b-th style="width: 25%">{{ $t('contractGraphs') }}</b-th>
                        <b-td style="width: 25%">{{ Data.integrationCertificateDto.contractGraphs }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('contractorInfo') }}</b-th>
                        <b-td style="width: 25%">{{ Data.integrationCertificateDto.contractorInfo }}</b-td>
                        <b-th style="width: 25%">{{ $t('docOn') }}</b-th>
                        <b-td style="width: 25%">{{ Data.integrationCertificateDto.docOn }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('expireOn') }}</b-th>
                        <b-td style="width: 25%">{{ Data.integrationCertificateDto.expireOn }}</b-td>
                        <b-th style="width: 25%">{{ $t('guid') }}</b-th>
                        <b-td style="width: 25%">{{ Data.integrationCertificateDto.guid }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('newVacanciesCount') }}</b-th>
                        <b-td
                           style="width: 25%"
                        >{{ Data.integrationCertificateDto.newVacanciesCount }}</b-td>
                        <b-th style="width: 25%"></b-th>
                        <b-th style="width: 25%"></b-th>
                     </b-tr>

                     <b-tr variant="primary">
                        <td colspan="4">
                           <h4 class="text-center mb-0">{{ $t("contractInfo") }}</h4>
                        </td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('contractDocOn') }}</b-th>
                        <b-td
                           style="width: 25%"
                        >{{ Data.integrationCertificateDto.contractInfo.contractDocOn }}</b-td>
                        <b-th style="width: 25%">{{ $t('contractNumber') }}</b-th>
                        <b-td
                           style="width: 25%"
                        >{{ Data.integrationCertificateDto.contractInfo.contractNumber }}</b-td>
                     </b-tr>

                     <b-tr>
                        <b-th style="width: 25%">{{ $t('contractType') }}</b-th>
                        <b-td
                           style="width: 25%"
                        >{{ Data.integrationCertificateDto.contractInfo.contractType }}</b-td>
                        <b-th style="width: 25%"></b-th>
                        <b-th style="width: 25%"></b-th>
                     </b-tr>
                  </b-tbody>
               </b-table-simple>
            </b-col>
         </b-row>
      </b-card>

      <b-card>
         <b-row>
            <b-col sm="12" md="12" class="text-left">
               <h2>{{ $t("soliqContractorByTin") }}</h2>
            </b-col>

            <b-table-simple hover small caption-top responsive bordered>
               <b-tbody>
                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("company") }}</h4>
                     </td>
                  </b-tr>
                  <b-tr>
                     <b-th style="width: 25%">{{ $t('name') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.name }}</b-td>
                     <b-th style="width: 25%">{{ $t('businessFund') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.businessFund }}</b-td>
                  </b-tr>
                  <b-tr>
                     <b-th style="width: 25%">{{ $t('businessTypeDetail') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.company.businessTypeDetail)}}</b-td>
                     <b-th style="width: 25%">{{ $t('District') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.district }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('flagReason') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.flagReason }}</b-td>
                     <b-th style="width: 25%">{{ $t('flat') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.flat }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('house') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.house }}</b-td>
                     <b-th style="width: 25%">{{ $t('kfs') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.kfs }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('liquidationDate') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.liquidationDate }}</b-td>
                     <b-th style="width: 25%">{{ $t('liquidationReason') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.liquidationReason }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('Oked') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.oked }}</b-td>
                     <b-th style="width: 25%">{{ $t('okedDetail') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.company.okedDetail )}}</b-td>
                  </b-tr>

                  <!-- okedDetail -->

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('employee_limit_lf') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.okedDetail.employee_limit_lf }}</b-td>
                     <b-th style="width: 25%">{{ $t('employee_limit_mf') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.okedDetail.employee_limit_mf }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('pkm275') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.okedDetail.pkm275 }}</b-td>
                     <b-th style="width: 25%">{{ $t('section') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.okedDetail.section }}</b-td>
                  </b-tr>

                  <!-- okedDetail end -->

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('opf') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.opf }}</b-td>
                     <b-th style="width: 25%">{{ $t('opfDetail') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.company.opfDetail )}}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('region') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.region }}</b-td>
                     <b-th style="width: 25%">{{ $t('registrationDate') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.registrationDate }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('registrationNumber') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.registrationNumber }}</b-td>
                     <b-th style="width: 25%">{{ $t('reregistrationDate') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.reregistrationDate }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('soato') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.soato }}</b-td>
                     <b-th style="width: 25%">{{ $t('soogu') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.soogu }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('sooguDetail') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.company.sooguDetail) }}</b-td>
                     <b-th style="width: 25%">{{ $t('okpo') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.sooguDetail.okpo }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('sooguRegistrator') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.company.sooguRegistrator }}</b-td>
                     <b-th style="width: 25%">{{ $t('statusDetail') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.company.statusDetail) }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('streetName') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.streetName }}</b-td>
                     <b-th style="width: 25%">{{ $t('tin') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.tin }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('vatNumber') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.vatNumber }}</b-td>
                     <b-th style="width: 25%">{{ $t('villageName') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.company.villageName }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-td colspan="4">
                        <h5>{{ $t('activityTypes') }}</h5>
                        <b-table
                           ref="refInvoiceListTable"
                           :items="Data.soliqContractorByTin.company.activityTypes"
                           responsive
                           :fields="fieldsActivityTypes"
                           primary-key="id"
                           no-border-collapse
                           show-empty
                           :empty-text="$t('NotFound')"
                           class="position-relative"
                        >
                           <template #cell(name)="{ item }">{{ GetLanguageItem(item) }}</template>
                        </b-table>
                     </b-td>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("companyBanks") }}</h4>
                     </td>
                  </b-tr>

                  <b-tr>
                     <b-td colspan="4">
                        <b-table
                           ref="refInvoiceListTable"
                           :items="Data.soliqContractorByTin.companyBanks"
                           responsive
                           :fields="fieldsCompanyBanks"
                           primary-key="id"
                           no-border-collapse
                           show-empty
                           :empty-text="$t('NotFound')"
                           class="position-relative"
                        ></b-table>
                     </b-td>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("companyBillingAddress") }}</h4>
                     </td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('region') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.companyBillingAddress.region) }}</b-td>
                     <b-th style="width: 25%">{{ $t('District') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.companyBillingAddress.district) }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('village') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyBillingAddress.village }}</b-td>
                     <b-th style="width: 25%">{{ $t('streetName') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyBillingAddress.streetName }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('house') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyBillingAddress.house }}</b-td>
                     <b-th style="width: 25%">{{ $t('flat') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyBillingAddress.flat }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('postcode') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyBillingAddress.postcode }}</b-td>
                     <b-th style="width: 25%"></b-th>
                     <b-th style="width: 25%"></b-th>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("companyContact") }}</h4>
                     </td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('phone') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.companyContact.phone }}</b-td>
                     <b-th style="width: 25%">{{ $t('email') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.companyContact.email }}</b-td>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("companyExtraInfo") }}</h4>
                     </td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('avgNumberEmployees') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyExtraInfo.avgNumberEmployees }}</b-td>
                     <b-th style="width: 25%">{{ $t('monthlyNumberEmployees') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.companyExtraInfo.monthlyNumberEmployees }}</b-td>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("director") }}</h4>
                     </td>
                  </b-tr>
                  <b-tr>
                     <b-th style="width: 25%">{{ $t('firstName') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.director.firstName }}</b-td>
                     <b-th style="width: 25%">{{ $t('lastName') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.director.lastName }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('middleName') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.director.middleName }}</b-td>
                     <b-th style="width: 25%">{{ $t('birthDate') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.director.birthDate }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('passportSeries') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.director.passportSeries }}</b-td>
                     <b-th style="width: 25%">{{ $t('passportNumber') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.director.passportNumber }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('pinfl') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.director.pinfl }}</b-td>
                     <b-th style="width: 25%">{{ $t('tin') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.director.tin }}</b-td>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("directorAddress") }}</h4>
                     </td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('region') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.directorAddress.region) }}</b-td>
                     <b-th style="width: 25%">{{ $t('District') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ GetLanguageItem(Data.soliqContractorByTin.directorAddress.district) }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('village') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.directorAddress.village }}</b-td>
                     <b-th style="width: 25%">{{ $t('streetName') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.directorAddress.streetName }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('house') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.directorAddress.house }}</b-td>
                     <b-th style="width: 25%">{{ $t('flat') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.directorAddress.flat }}</b-td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('postcode') }}</b-th>
                     <b-td
                        style="width: 25%"
                     >{{ Data.soliqContractorByTin.directorAddress.postcode }}</b-td>
                     <b-th style="width: 25%"></b-th>
                     <b-th style="width: 25%"></b-th>
                  </b-tr>

                  <b-tr variant="primary">
                     <td colspan="4">
                        <h4 class="text-center mb-0">{{ $t("directorContact") }}</h4>
                     </td>
                  </b-tr>

                  <b-tr>
                     <b-th style="width: 25%">{{ $t('phone') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.directorContact.phone }}</b-td>
                     <b-th style="width: 25%">{{ $t('email') }}</b-th>
                     <b-td style="width: 25%">{{ Data.soliqContractorByTin.directorContact.email }}</b-td>
                  </b-tr>
               </b-tbody>
            </b-table-simple>
            <!-- <b-col sm="12" md="12" class="text-left">
          <pre>
            {{ Data.soliqContractorByTin }}
          </pre>
            </b-col>-->
         </b-row>
      </b-card>
   </div>
</template>

<script>
import {
   BButton,
   BPagination,
   BTable,
   BCol,
   VBTooltip,
   VBModal,
   BRow,
   BSpinner,
   BCard,
   BTooltip,
   BBadge,
   BInputGroup,
   BFormInput,
   BInputGroupAppend,
   BLink,
   BModal,
   BCardText,
   BListGroup,
   BListGroupItem,
   BTr,
   BTd,
   BTfoot,
   BTh,
   BThead,
   BTbody,
   BTableSimple,
   BAlert
} from 'bootstrap-vue';
import BusinessmanCardService from '@/services/managment/businessmancard.service';

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
      BLink,
      BModal,
      BCardText,
      BListGroup,
      BListGroupItem,
      BTr,
      BTd,
      BTfoot,
      BTh,
      BThead,
      BTbody,
      BTableSimple,
      BAlert
   },
   name: 'Index',
   directives: {
      'b-tooltip': VBTooltip,
      'b-modal': VBModal
   },
   data() {
      return {
         fieldsActivityTypes: [
            {
               key: 'id',
               label: this.$t('id'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            },
            {
               key: 'level_id',
               label: this.$t('level_id'),
               sortable: true
            },
            {
               key: 'name',
               label: this.$t('name'),
               sortable: true
            }
         ],
         fieldsCompanyBanks: [
            {
               key: 'id',
               label: this.$t('id'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            },
            {
               key: 'bankName',
               label: this.$t('bankName'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'paymentAccount',
               label: this.$t('paymentAccount'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'companyTin',
               label: this.$t('companyTin'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'balance',
               label: this.$t('balance'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'mfo',
               label: this.$t('mfo'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'openDate',
               label: this.$t('openDate'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'closeDate',
               label: this.$t('closeDate'),
               thClass: 'text-center',
               sortable: true
            },
            {
               key: 'statusName',
               label: this.$t('statusName'),
               thClass: 'text-center',
               tdClass: 'text-center',
               sortable: true
            }
         ],
         filter: {
            inn: ''
         },
         Data: {
            davAktivContractor: {},
            integrationCertificateDto: {
               contractInfo: {}
            },
            soliqContractorByTin: {
               company: {
                  okedDetail: {},
                  sooguDetail: {},
                  statusDetail: {},
                  activityTypes: []
               },
               companyBanks: [],
               companyBillingAddress: {},
               companyContact: {},
               companyExtraInfo: {},
               companyShippingAddress: [],
               director: {},
               directorAddress: {},
               directorContact: {},
               names: {}
            }
         },
         isBusy: false
      };
   },
   created() {
      // this.Refresh();
   },
   methods: {
      GetLanguageItem(item) {
         if (item) {
            const lang = localStorage.getItem('locale');

            if (lang == 'uz_latn') {
               return item.name_uz_latn;
            } else if (lang == 'uz_cyrl') {
               return item.name_uz_cyrl;
            } else if (lang == 'ru') {
               return item.name_ru;
            } else {
               return item.name;
            }
         }
      },
      SortChange(data) {
         this.filter.sortBy = data.sortBy;
         this.filter.orderType = data.sortDesc ? 'desc' : 'asc';
         this.Refresh();
      },
      Refresh() {
         this.isBusy = true;
         BusinessmanCardService.GetByInn(this.filter.inn).then(res => {
            this.Data = res.data;
            // this.filter.total = res.data.total;
            this.isBusy = false;
         });
      }
   }
};
</script>

