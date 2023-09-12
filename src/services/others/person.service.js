import ApiService from "../api.service";

const PersonService = {
  GetByPassportData(Seria, Number, DateOfBirth) {
    return ApiService.get(
      `/Person/GetByPassportData?Seria=${Seria}&Number=${Number}&DateOfBirth=${DateOfBirth}`
    );
  },
  GetRelativesByPassportData(Seria, Number, DateOfBirth) {
    return ApiService.get(
      `/Person/GetRelativesByPassportData?Seria=${Seria}&Number=${Number}&DateOfBirth=${DateOfBirth}`
    );
  },
};
export default PersonService;
