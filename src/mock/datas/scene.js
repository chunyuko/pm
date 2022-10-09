import Mock from "mockjs2";
import { builder } from "@/core/mock/util";

const info = (options) => {
  const data = [
    {
      id: "1",
      num: "1",
      name: "",
      tag: "exhibit1.party",
      tags: ["exhibit1", "party"],
      type: "scene",
      items: [
        {
          id: 1,
          title: "南墙灯",
          avatar: "/images/light.png",
          type: "electric",
          tag: "01",
          port: "07",
          name: "01-07",
          status: 0,
          checked: true,
          display: true,
          except: [],
        },
        {
          id: 2,
          title: "大厅电源",
          avatar: "/images/light.png",
          type: "electric",
          tag: "02",
          port: "03",
          name: "02-03",
          status: 1,
          checked: true,
          display: true,
          except: [],
        },
        {
          id: 2,
          title: "机房电源",
          avatar: "/images/light.png",
          type: "electric",
          tag: "04",
          port: "05",
          name: "04-05",
          status: 2,
          checked: true,
          display: true,
          except: [],
        },
        {
          id: 1,
          title: "党建多媒体机",
          avatar: "/images/light.png",
          type: "content",
          name: "v1",
          tag: "v1",
          status: 3,
          checked: true,
          display: true,
          except: [],
        },
      ],
      time: "2022-04-27 04:00:00",
    },
    {
      id: "1",
      num: "1",
      name: "",
      tag: "exhibit2.culture",
      tags: ["exhibit1", "culture"],
      type: "scene",
      items: [
        {
          id: 1,
          title: "南墙灯",
          avatar: "/images/light.png",
          type: "electric",
          tag: "01",
          port: "07",
          name: "01-07",
          status: 0,
          checked: true,
          display: true,
          except: [],
        },
      ],
      time: "2022-04-27 04:00:00",
    },
  ];
  const result = { data, pageNo: 1, pageSize: 10, totalCount: 1, totalPage: 1 };
  return builder(result);
};

Mock.mock(/\/api\/scene\/list/, "get", info);
