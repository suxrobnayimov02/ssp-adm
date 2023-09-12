import ApiService from "../api.service";
const EmployeeLeaveOrderService = {
  GetList(data) {
    return ApiService.post("hrm/EmployeeLeaveOrder/GetList", data);
  },
  Get(id) {
    if (id == 0 || id === null || id === undefined) {
      return ApiService.get("hrm/EmployeeLeaveOrder/Get");
    } else {
      return ApiService.get(`hrm/EmployeeLeaveOrder/Get/${id}`);
    }
  },
  Update(data) {
    if (data.id == 0) {
      return ApiService.post(`hrm/EmployeeLeaveOrder/Create`, data);
    } else {
      return ApiService.post(`hrm/EmployeeLeaveOrder/Update`, data);
    }
  },
  Delete(id) {
    return ApiService.post(`hrm/EmployeeLeaveOrder/Delete/${id}`);
  },
  GetAsSelectList(data) {
    return ApiService.post(`hrm/EmployeeLeaveOrder/GetAsSelectList`, data);
  },
};
export default EmployeeLeaveOrderService;
