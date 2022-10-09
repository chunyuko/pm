import mapping from "@/config/mapping.js";
const statusMap = mapping["status"];

export default {
  computed: {
    statusFilter() {
      return (type) => {
        return statusMap[type].text;
      };
    },
    statusTypeFilter() {
      return (type) => {
        return statusMap[type].status;
      };
    },
  },
};
