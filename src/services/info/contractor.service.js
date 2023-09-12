import ApiService from '../api.service';

const ContractorService = {
   GetList(data) {
      return ApiService.post(`/Contractor/GetList`, data);
   },
   Get(id) {
      if (id == 0 || id === null || id === undefined) {
         return ApiService.get(`/Contractor/Get`);
      } else {
         return ApiService.get(`/Contractor/Get/${id}`);
      }
   },
   Update(data) {
      if (data.id == 0) {
         return ApiService.post(`/Contractor/Create`, data);
      } else {
         return ApiService.post(`/Contractor/Update`, data);
      }
   },
   Delete(id) {
      return ApiService.post(`/Contractor/Delete/${id}`);
   },
   GetAsSelectList() {
      return ApiService.get(`/Contractor/GetAsSelectList`);
   },
   SelectContractor(inn) {
      return ApiService.get(`/Contractor/SelectContractor?inn=${inn}`);
   }
};
export default ContractorService;
