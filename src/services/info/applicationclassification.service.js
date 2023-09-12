import ApiService from '../api.service';

const ApplicationClassificationService = {
   GetList(data) {
      return ApiService.post('ApplicationClassification/GetList', data);
   },
   Get(id) {
      if (id == 0 || id === null || id === undefined) {
         return ApiService.get('ApplicationClassification/Get');
      } else {
         return ApiService.get(`ApplicationClassification/Get/${id}`);
      }
   },
   GetInfo(id) {
      return ApiService.get(`ApplicationClassification/GetInfo/${id}`);
   },
   GetForMap(id) {
      return ApiService.get(`ApplicationClassification/GetForMap/${id}`);
   },
   Update(data) {
      if (data.id == 0) {
         return ApiService.post(`ApplicationClassification/Create`, data);
      } else {
         return ApiService.post(`ApplicationClassification/Update`, data);
      }
   },
   Delete(id) {
      return ApiService.post(`ApplicationClassification/Delete/${id}`);
   },
   GetAsSelectList(data) {
      return ApiService.post(`ApplicationClassification/GetAsSelectList`, data);
   },
   UploadFile(data) {
      return ApiService.formData(`/ApplicationClassification/UploadFile`, data);
   },
   DownloadFile(id) {
      return ApiService.print(`/ApplicationClassification/DownloadFile/${id}`);
   }
};
export default ApplicationClassificationService;
