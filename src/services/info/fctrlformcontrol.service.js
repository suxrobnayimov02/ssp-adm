import ApiService from '../api.service';
const FctrlFormControlService = {
   GetList(data) {
      return ApiService.post(`fctrl/FctrlFormControl/GetList`, data);
   },
   Get(id) {
      if (id == 0 || id === null || id === undefined) {
         return ApiService.get(`fctrl/FctrlFormControl/Get`);
      } else {
         return ApiService.get(`fctrl/FctrlFormControl/Get/${id}`);
      }
   },
   Update(data) {
      if (data.id == 0) {
         return ApiService.post(`fctrl/FctrlFormControl/Create`, data);
      } else {
         return ApiService.post(`fctrl/FctrlFormControl/Update`, data);
      }
   },
   Delete(id) {
      return ApiService.post(`fctrl/FctrlFormControl/Delete/${id}`);
   },
   GetAsSelectList() {
      return ApiService.get(`fctrl/FctrlFormControl/GetAsSelectList`);
   },
   SaveAsExecel(data) {
      return ApiService.printtemp(`fctrl/FctrlFormControl/SaveAsExecel`, data);
   }
};
export default FctrlFormControlService;
