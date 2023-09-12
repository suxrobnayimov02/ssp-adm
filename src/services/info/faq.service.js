import ApiService from '../api.service';
const FaqService = {
   GetList(data) {
      return ApiService.post(`/Faq/GetList`, data);
   },
   Get(id) {
      if (id == 0 || id === null || id === undefined) {
         return ApiService.get(`/Faq/Get`);
      } else {
         return ApiService.get(`/Faq/Get/${id}`);
      }
   },
   Update(data) {
      if (data.id == 0) {
         return ApiService.post(`/Faq/Create`, data);
      } else {
         return ApiService.post(`/Faq/Update`, data);
      }
   },
   Delete(id) {
      return ApiService.post(`/Faq/Delete/${id}`);
   },
   GetAsSelectList() {
      return ApiService.get(`/Faq/GetAsSelectList`);
   },
   SaveAsExecel(data) {
      return ApiService.printtemp(`/Faq/SaveAsExecel`, data);
   }
};
export default FaqService;
