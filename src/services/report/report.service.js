import ApiService from "../api.service";

const ReportService = {
  GetPrtnApplicationAndContractInfo(data) {
    return ApiService.post(`/Report/GetPrtnApplicationAndContractInfo`, data);
  },
  GetPrtnApplicationAndContractInfoByRegion(data) {
    return ApiService.post(
      `/Report/GetPrtnApplicationAndContractInfoByRegion`,
      data
    );
  },
  SaveAsExecel(data) {
    return ApiService.printtemp(`/Report/SaveAsExecel`, data);
  },
};
export default ReportService;
