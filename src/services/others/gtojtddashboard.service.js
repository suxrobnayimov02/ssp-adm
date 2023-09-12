import ApiService from '../api.service'

const JTDDashboardService = {
  GetApplicantCountByGender(schoolYearId){
    return ApiService.get(`/gto/JTDDashboard/GetApplicantCountByGender?schoolYearId=${schoolYearId}`)
  },
  GetApplicantCountByOblast(schoolYearId){
    return ApiService.get(`/gto/JTDDashboard/GetApplicantCountByOblast?schoolYearId=${schoolYearId}`)
  },
  GetApplicantCountByAgeCategory(schoolYearId){
    return ApiService.get(`/gto/JTDDashboard/GetApplicantCountByAgeCategory?schoolYearId=${schoolYearId}`)
  },
  GetApplicantCountByDirection(schoolYearId){
    return ApiService.get(`/gto/JTDDashboard/GetApplicantCountByDirection?schoolYearId=${schoolYearId}`)
  },
  GetApplicatCountByJtdTestCategorytype(schoolYearId) {
    return ApiService.get(`/gto/JTDDashboard/GetApplicatCountByJtdTestCategorytype?schoolYearId=${schoolYearId}`)
  }
};
export default JTDDashboardService;
    