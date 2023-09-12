import ApiService from "../api.service";

const HelperService = {
  GetStateList() {
    return ApiService.get("/Helper/GetStateList");
  },
  GetStatusList(admissiontypeid) {
    return ApiService.get(
      `/Helper/GetStatusList?admissiontypeid=${admissiontypeid}`
    );
  },
  GetModuleList(lang) {
    return ApiService.get(`/Helper/GetModuleList?lang=${lang}`);
  },
  GetRoleList() {
    return ApiService.get(`/Helper/GetRoleList`);
  },
  GetLanguageList() {
    return ApiService.get(`/Helper/GetLanguageList`);
  },
  GetCategoriesList() {
    return ApiService.get(`/Helper/GetCategoriesList`);
  },
  GetAllTeachersInSchool(organizationid) {
    if (organizationid === null || organizationid === undefined) {
      organizationid = 0;
    }
    return ApiService.get(
      `/Helper/GetAllTeachersInSchool?organizationid=${organizationid}`
    );
  },
  GetAllOrgCoach(organizationid) {
    if (organizationid === null || organizationid === undefined) {
      organizationid = 0;
    }
    return ApiService.get(
      `/Helper/GetAllOrgCoach?organizationid=${organizationid}`
    );
  },
  GetPersonCountInSchool(organizationid) {
    return ApiService.get(
      `/Helper/GetPersonCountInSchool?organizationid=${organizationid}`
    );
  },
  GetAllAdmissionType() {
    return ApiService.get(`/Helper/GetAllAdmissionType`);
  },
  GetAllQuoteType() {
    return ApiService.get(`/Helper/GetAllQuoteType`);
  },
  DeleteParentUserData(mobilenumber, documentseriesnumber) {
    return ApiService.get(
      `/Helper/DeleteParentUserData?mobilenumber=${mobilenumber}&documentseriesnumber=${documentseriesnumber}`
    );
  },
  SyncErpTables() {
    return ApiService.get(`/Helper/SyncErpTables`);
  },
  UpdateParentUserMobileNumber(
    oldmobilenumber,
    newmobilenumber,
    documentseriesnumber
  ) {
    return ApiService.get(
      `/Helper/UpdateParentUserMobileNumber?oldmobilenumber=${oldmobilenumber}&newmobilenumber=${newmobilenumber}&documentseriesnumber=${documentseriesnumber}`
    );
  },
  GetAllIdentityDocSeries(IdentityDocumentId) {
    return ApiService.get(
      `/Helper/GetAllIdentityDocSeries?IdentityDocumentId=${IdentityDocumentId}`
    );
  },
  GetAllIdentityDocument(isParent) {
    return ApiService.get(
      `/Helper/GetAllIdentityDocument?isParent=${isParent}`
    );
  },
  GetAllKinshipDegree() {
    return ApiService.get(`/Helper/GetAllKinshipDegree`);
  },
  GetGenderList(lang) {
    return ApiService.get(`/Helper/GetGenderList?lang=${lang}`);
  },
  InsertSchoolAdmissionAppCountInfo() {
    return ApiService.get(`/Helper/InsertSchoolAdmissionAppCountInfo`);
  },
  SyncErpTables() {
    return ApiService.get(`/Helper/SyncErpTables`);
  },
  GetAllScoreCalculationType() {
    return ApiService.get(`/Helper/GetAllScoreCalculationType`);
  },
  GetAllScoreType() {
    return ApiService.get(`/Helper/GetAllScoreType`);
  },
  GetAllJTDTestCategoryType(lang){

    return ApiService.get(`/Helper/GetAllJTDTestCategoryType?lang=${lang}`);
  },
  GetResultInputTypeList(lang){

    return ApiService.get(`/Helper/GetResultInputTypeList?lang=${lang}`);
  },
  GetFileExtensionList() {
    return ApiService.get('/Helper/GetFileExtensionList')
},
  GetAllSportGroupCategoryType(){
    return ApiService.get(`/Helper/GetAllSportGroupCategoryType`)
  },
  GetAllapplicaTiontype(){
    return ApiService.get(`/Helper/GetAllapplicaTiontype`)
  }
};
export default HelperService;
