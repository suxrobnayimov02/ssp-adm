<template>
  <EmployeeManageList :selectable="false"   />
</template>

<script>
import EmployeeManageList from '@/views/components/hrm/EmployeeManageList.vue'
export default {
  components: {
    EmployeeManageList,
  },
  data() {
    return {};
  }
};
</script>
