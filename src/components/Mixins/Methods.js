import mapping from "@/config/mapping.js";
const statusMap = mapping["status"];

export default {
  methods: {
    statusFilter(type) {
      return statusMap[type].text;
    },
    statusTypeFilter(type) {
      return statusMap[type].status;
    },
  },
};
