import Mock from "mockjs2";
import { builder } from "@/core/mock/util";

const info = (options) => {
  const data = [
    {
      id: "1",
      name: "视频1",
      path: "/video/1.mp4",
      width: "1920",
      height: "1080",
      modal: "1",
      before: "",
      after: "",
      description: "多媒体视频1",
      time: "2022-04-27 04:00:00",
    },
    {
      id: "2",
      name: "视频2",
      path: "/video/1.mp4",
      width: "1920",
      height: "1080",
      modal: "1",
      before: "",
      after: "",
      description: "多媒体视频2",
      time: "2022-04-27 04:00:00",
    },
    {
      id: "3",
      name: "视频3",
      path: "/video/1.mp4",
      width: "1920",
      height: "1080",
      modal: "1",
      before: "",
      after: "",
      description: "多媒体视频3",
      time: "2022-04-27 04:00:00",
    },
    {
      id: "4",
      name: "视频4",
      path: "/video/1.mp4",
      width: "1920",
      height: "1080",
      modal: "1",
      before: "",
      after: "",
      description: "多媒体视频4",
      time: "2022-04-27 04:00:00",
    },
    {
      id: "5",
      name: "视频5",
      path: "/video/1.mp4",
      width: "1920",
      height: "1080",
      modal: "1",
      before: "",
      after: "",
      description: "多媒体视频5",
      time: "2022-04-27 04:00:00",
    },
    {
      id: "6",
      name: "视频6",
      path: "/video/1.mp4",
      width: "1920",
      height: "1080",
      modal: "1",
      before: "",
      after: "",
      description: "多媒体视频6",
      time: "2022-04-27 04:00:00",
    },
  ];
  const result = { data, pageNo: 1, pageSize: 10, totalCount: 6, totalPage: 1 };
  return builder(result);
};

Mock.mock(/\/api\/video\/list/, "post", info);
