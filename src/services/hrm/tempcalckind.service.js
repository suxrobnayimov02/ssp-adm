import ApiService from "../api.service";
const TempCalcKindService = {
  GetList(data) {
    return ApiService.post("hrm/TempCalcKind/GetList", data);
  },
  Get(id) {
    if (id == 0 || id === null || id === undefined) {
      return ApiService.get("hrm/TempCalcKind/Get");
    } else {
      return ApiService.get(`hrm/TempCalcKind/Get/${id}`);
    }
  },
  Update(data) {
    if (data.id == 0) {
      return ApiService.post(`hrm/TempCalcKind/Create`, data);
    } else {
      return ApiService.post(`hrm/TempCalcKind/Update`, data);
    }
  },
  Delete(id) {
    return ApiService.post(`hrm/TempCalcKind/Delete/${id}`);
  },
  GetAsSelectList(data) {
    return ApiService.post(`hrm/TempCalcKind/GetAsSelectList`, data);
  },
};
export default TempCalcKindService;
