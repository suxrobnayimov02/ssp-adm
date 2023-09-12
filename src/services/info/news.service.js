import ApiService from '../api.service';
const NewsService = {
   GetList(data) {
      return ApiService.post(`/News/GetList`, data);
   },
   Get(id) {
      if (id == 0 || id === null || id === undefined) {
         return ApiService.get(`/News/Get`);
      } else {
         return ApiService.get(`/News/Get/${id}`);
      }
   },
   Update(data) {
      if (data.id == 0) {
         return ApiService.post(`/News/Create`, data);
      } else {
         return ApiService.post(`/News/Update`, data);
      }
   },
   Delete(id) {
      return ApiService.post(`/News/Delete/${id}`);
   },
   GetAsSelectList() {
      return ApiService.get(`/News/GetAsSelectList`);
   },
   UploadNewsImage(data) {
      return ApiService.formData(`/News/UploadNewsImage`, data);
   },
   GetNewsImage(id) {
      return ApiService.get(`/News/GetNewsImage/${id}`);
   },
   DownloadFile(id) {
      return ApiService.print(`/News/DownloadFile/${id}`);
   }
};
export default NewsService;
