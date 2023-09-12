import ApiService from "../api.service";
const AppointEmployeeService = {
  GetList(data) {
    return ApiService.post("hrm/AppointEmployee/GetList", data);
  },
  Get(id) {
    if (id == 0 || id === null || id === undefined) {
      return ApiService.get("hrm/AppointEmployee/Get");
    } else {
      return ApiService.get(`hrm/AppointEmployee/Get/${id}`);
    }
  },
  Update(data) {
    if (data.id == 0) {
      return ApiService.post(`hrm/AppointEmployee/Create`, data);
    } else {
      return ApiService.post(`hrm/AppointEmployee/Update`, data);
    }
  },
  Delete(id) {
    return ApiService.post(`hrm/AppointEmployee/Delete/${id}`);
  },
  GetAsSelectList(data) {
    return ApiService.post(`hrm/AppointEmployee/GetAsSelectList`, data);
  },
};
export default AppointEmployeeService;
