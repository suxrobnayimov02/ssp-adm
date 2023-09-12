import ApiService from "../api.service";

const RegistrationOfAthleteService = {
  GetList(
    oblastid,
    regionid,
    mfyid,
    regionsectorid,
    genderid,
    sporttypeid,
    agecategoryid,
    docyear,
    personname,
    personpinfl,
    youthleaderassignmentpinfl,
    youthleaderassignmentname,
    Search,
    Lang,
    SortColumn,
    OrderType,
    Offset,
    PageNumber,
    PageLimit,
    IsStartPageFromZero
  ) {
    return ApiService.get(
      `/tshb5/RegistrationOfAthlete/GetList?oblastid=${oblastid}&regionid=${regionid}&mfyid=${mfyid}&regionsectorid=${regionsectorid}&genderid=${genderid}&sporttypeid=${sporttypeid}&agecategoryid=${agecategoryid}&docyear=${docyear}&personname=${personname}&personpinfl=${personpinfl}&youthleaderassignmentpinfl=${youthleaderassignmentpinfl}&youthleaderassignmentname=${youthleaderassignmentname}&Search=${Search}&Lang=${Lang}&SortColumn=${SortColumn}&OrderType=${OrderType}&Offset=${Offset}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&IsStartPageFromZero=${IsStartPageFromZero}`
    );
  },
  PrintRegistrationofathlete(
    oblastid,
    regionid,
    mfyid,
    regionsectorid,
    genderid,
    sporttypeid,
    agecategoryid,
    docyear,
    personname,
    personpinfl,
    youthleaderassignmentpinfl,
    youthleaderassignmentname,
    Search,
    Lang,
    SortColumn,
    OrderType,
    Offset,
    PageNumber,
    PageLimit,
    IsStartPageFromZero
  ) {
    return ApiService.print(
      `/tshb5/RegistrationOfAthlete/PrintRegistrationofathlete?oblastid=${oblastid}&regionid=${regionid}&mfyid=${mfyid}&regionsectorid=${regionsectorid}&genderid=${genderid}&sporttypeid=${sporttypeid}&agecategoryid=${agecategoryid}&docyear=${docyear}&personname=${personname}&personpinfl=${personpinfl}&youthleaderassignmentpinfl=${youthleaderassignmentpinfl}&youthleaderassignmentname=${youthleaderassignmentname}&Search=${Search}&Lang=${Lang}&SortColumn=${SortColumn}&OrderType=${OrderType}&Offset=${Offset}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&IsStartPageFromZero=${IsStartPageFromZero}`
    );
  },
  // PrintRegistrationOfAthleteCount(
  //   oblastid,
  //   regionid,
  //   regionsectorid,
  //   mfyid,
  // ) {
  //   return ApiService.print(
  //     `/RegistrationOfAthlete/PrintRegistrationOfAthleteCount?oblastid=${oblastid}&regionid=${regionid}&regionsectorid=${regionsectorid}&mfyid=${mfyid}`
  //   );
  // },
};
export default RegistrationOfAthleteService;
