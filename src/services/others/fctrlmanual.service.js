import ApiService from '../api.service';

const FctrlManualService = {
   EmploymentTypeSelectList() {
      return ApiService.get('fctrl/FctrlManual/FormControlTypeSelectList');
   },
   FormControlRuleTypeSelectList() {
      return ApiService.get('fctrl/FctrlManual/FormControlRuleTypeSelectList');
   },
   FormControlRuleModeSelectList() {
      return ApiService.get('fctrl/FctrlManual/FormControlRuleModeSelectList');
   }
};
export default FctrlManualService;
