import ApiService from "../api.service";

const BusinessmanCardService = {
  GetByInn(inn) {
    return ApiService.get(`BusinessmanCard/GetByInn/${inn}`);
  },
};
export default BusinessmanCardService;
