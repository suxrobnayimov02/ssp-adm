import ApiService from '../api.service';

const ManualService = {
   EmploymentTypeSelectList() {
      return ApiService.get('/Manual/EmploymentTypeSelectList');
   },
   ProposalSubjectSelectList() {
      return ApiService.get('/Manual/ProposalSubjectSelectList');
   },
   ProposalDisclosureSelectList() {
      return ApiService.get('/Manual/ProposalDisclosureSelectList');
   },
   CompanyTypeSelectList() {
      return ApiService.get('/Manual/CompanyTypeSelectList');
   },
   GetModuleSelectList() {
      return ApiService.get('manual/GetModuleSelectList');
   },
   StateSelectList() {
      return ApiService.get('manual/StateSelectList');
   },
   LanguageSelectList() {
      return ApiService.get('manual/LanguageSelectList');
   },
   GenderSelectList() {
      return ApiService.get('manual/GenderSelectList');
   },
   WorkScheduleKindSelectList() {
      return ApiService.get('hrm/Manual/WorkScheduleKindSelectList');
   },
   ApplicantTypeSelectList() {
      return ApiService.get('Manual/ApplicantTypeSelectList');
   },
   BusinessSectorSelectList() {
      return ApiService.get('Manual/BusinessSectorSelectList');
   },
   NotificationTypeSelectList() {
      return ApiService.get('manual/NotificationTypeSelectList');
   },
   StatusSelectList() {
      return ApiService.get('manual/StatusSelectList');
   },
   SignOrganizationTypeSelectList(data = {}) {
      return ApiService.post(`manual/SignOrganizationTypeSelectList?incluceBusinessman`, data);
   },
   GetListByDocumentId(tableId, docId) {
      return ApiService.get(`DocumentChangeLog/GetListByDocumentId/${tableId}/${docId}`);
   },
   EmpAppointOrderTypeSelectList() {
      return ApiService.get('hrm/manual/EmpAppointOrderTypeSelectList');
   },
   TimesheetIndicatorSelectList() {
      return ApiService.get('hrm/manual/TimesheetIndicatorSelectList');
   },
   TimesheetTypeSelectList() {
      return ApiService.get('hrm/manual/TimesheetTypeSelectList');
   },
   RoundingTypeSelectList() {
      return ApiService.get('hrm/manual/RoundingTypeSelectList');
   },
   OrganizationLevelSelectList() {
      return ApiService.get('manual/OrganizationLevelSelectList');
   },
   ApplicationTypeSelectList() {
      return ApiService.get('manual/ApplicationTypeSelectList');
   },
   ApplicationFormingTypeSelectList() {
      return ApiService.get('manual/ApplicationFormingTypeSelectList');
   },
   BusinessSectorSelectList() {
      return ApiService.get('manual/BusinessSectorSelectList');
   }
};
export default ManualService;
