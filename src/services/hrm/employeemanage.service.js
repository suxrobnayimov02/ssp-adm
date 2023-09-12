import ApiService from "../api.service";

const EmployeeManageService = {
  GetList(data) {
    return ApiService.post("hrm/EmployeeManage/GetList", data);
  }
};
export default EmployeeManageService;
