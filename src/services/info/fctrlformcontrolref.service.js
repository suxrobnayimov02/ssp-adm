import ApiService from '../api.service';
const FctrlFormControlRefService = {
   GetList(data) {
      return ApiService.post(`fctrl/FctrlFormControlRef/GetList`, data);
   },
   Get(id) {
      if (id == 0 || id === null || id === undefined) {
         return ApiService.get(`fctrl/FctrlFormControlRef/Get`);
      } else {
         return ApiService.get(`fctrl/FctrlFormControlRef/Get/${id}`);
      }
   },
   Update(data) {
      if (data.id == 0) {
         return ApiService.post(`fctrl/FctrlFormControlRef/Create`, data);
      } else {
         return ApiService.post(`fctrl/FctrlFormControlRef/Update`, data);
      }
   },
   Delete(id) {
      return ApiService.post(`fctrl/FctrlFormControlRef/Delete/${id}`);
   },
   GetAsSelectList() {
      return ApiService.get(`fctrl/FctrlFormControlRef/GetAsSelectList`);
   },
   SaveAsExecel(data) {
      return ApiService.printtemp(`fctrl/FctrlFormControlRef/SaveAsExecel`, data);
   },
   GetSysReferenceValues(id) {
      return ApiService.post(`fctrl/FctrlFormControlRef/GetSysReferenceValues/${id}`, {});
   }
};
export default FctrlFormControlRefService;
