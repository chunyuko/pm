import Vue from "vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Input,
  Form,
  Select,
  Table,
  Dropdown,
  Row,
  Col,
  Card,
  DatePicker,
  Badge,
  Divider,
  InputNumber,
  Alert,
  PageHeader,
  Spin,
  Modal,
  Steps,
  message,
  Popconfirm,
  List,
  Avatar,
  Switch,
  Empty,
  Cascader,
  Tag,
  FormModel,
  Collapse,
  Skeleton,
  Checkbox,
  Upload,
  Tree,
  Result,
  Tooltip,
} from "ant-design-vue";

//全局插件
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Form);
Vue.use(Select);
Vue.use(Table);
Vue.use(Dropdown);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(DatePicker);
Vue.use(Badge);
Vue.use(Divider);
Vue.use(InputNumber);
Vue.use(Alert);
Vue.use(PageHeader);
Vue.use(Spin);
Vue.use(Modal);
Vue.use(Steps);
Vue.use(Popconfirm);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Switch);
Vue.use(Empty);
Vue.use(Cascader);
Vue.use(Tag);
Vue.use(FormModel);
Vue.use(Collapse);
Vue.use(Skeleton);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Tree);
Vue.use(Result);
Vue.use(Tooltip);

import PageLoading from "@/components/PageLoading";
Vue.use(PageLoading);

//自定义全局工具
Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
