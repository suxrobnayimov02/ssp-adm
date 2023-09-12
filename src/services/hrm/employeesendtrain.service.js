import ApiService from "../api.service";

const EmployeeSendTrainService = {
  GetList(data) {
    return ApiService.post("hrm/EmployeeSendTrain/GetList", data);
  },
  Get(id) {
    if (id == 0 || id === null || id === undefined) {
      return ApiService.get("hrm/EmployeeSendTrain/Get");
    } else {
      return ApiService.get(`hrm/EmployeeSendTrain/Get/${id}`);
    }
  },
  Update(data) {
    if (data.id == 0) {
      return ApiService.post(`hrm/EmployeeSendTrain/Create`, data);
    } else {
      return ApiService.post(`hrm/EmployeeSendTrain/Update`, data);
    }
  },
  Delete(id) {
    return ApiService.post(`hrm/EmployeeSendTrain/Delete/${id}`);
  },
  GetAsSelectList(data) {
    return ApiService.post(`hrm/EmployeeSendTrain/GetAsSelectList`, data);
  }
};
export default EmployeeSendTrainService;
