<template>
  <div>
    <bread-crumb></bread-crumb>
    <div style="padding: 0px 20px">
      <a-card :bordered="false" id="filterCom" style="overflow: hidden; position: relative">
        <div class="table-operator">
          <a-button-group>
            <a-button type="primary" @click="showSec">
              <a-icon type="plus" />
              新增
            </a-button>
            <!-- <a-button type="primary" @click="handleAdd">
              <a-icon type="plus" />
              端口
            </a-button>
            <a-button type="primary" @click="reload">
              刷新
              <a-icon type="reload" />
            </a-button> -->
            <!-- <a-button type="primary" @click="showDrawer">
              筛选
              <a-icon :type="filterVisible ? 'up' : 'down'" />
            </a-button> -->
          </a-button-group>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="delAll">
                <a-icon type="delete" />
                删除
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <!-- <div v-if="filterVisible == true"> -->
        <!-- <div v-show="filterVisible == true"> -->
        <!-- <h-filtrate
            ref="filtrate"
            :key-data="keyData_"
            :data="srcData"
            :btnGroup="true"
            @close="onClose"
            @change="
              (res) => {
                search(res);
              }
            "
          >
            <template v-slot:keyValue="[val, k]">
              <span v-if="k == 'type'">{{ val[k] == "0" ? "灯光" : "电源" }}</span>
              <span v-else-if="k == 'display'">{{ val[k] == "0" ? "隐藏" : "显示" }}</span>
              <span v-else>{{ val[k] }}</span>
            </template>
          </h-filtrate>
        </div> -->
        <h-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          :alert="true"
          :rowSelection="rowSelection"
          showPagination="auto"
        >
          <span slot="questions" slot-scope="text, record, index">
            <template>
              <a-tooltip>
                <template slot="title">编辑</template>
                <a-icon type="edit" @click="handleConfig(record)" style="font-size: 16px"></a-icon>
              </a-tooltip>
            </template>
          </span>
          <span slot="sorts" slot-scope="text, record, index">
            <template>
              <a-tooltip>
                <template slot="title">编辑</template>
                <a-icon type="edit" @click="handleSorts(record)" style="font-size: 16px"></a-icon>
              </a-tooltip>
            </template>
          </span>
          <span slot="faults" slot-scope="text, record, index">
            <template>
              <a-tooltip>
                <template slot="title">编辑</template>
                <a-icon type="edit" @click="handleFaults(record)" style="font-size: 16px"></a-icon>
              </a-tooltip>
            </template>
          </span>
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="address" slot-scope="text">
            <ellipsis :length="6" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="extra" slot-scope="text">
            <ellipsis :length="6" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="time" slot-scope="text">
            <ellipsis :length="6" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a-tooltip>
                <template slot="title">编辑</template>
                <a-icon type="edit" @click="handleEdit(record)" style="font-size: 16px"></a-icon>
              </a-tooltip>
              <a-divider type="vertical" />
              <a-tooltip>
                <template slot="title">删除</template>
                <a-popconfirm title="是否删除该数据？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                  <a-icon type="delete" @click="selectRow(record)" v-if="!asking" style="font-size: 16px"></a-icon>
                  <a-icon type="loading" v-else></a-icon>
                </a-popconfirm>
              </a-tooltip>
            </template>
          </span>
        </h-table>
        <h-form-modal
          ref="createModal"
          :visible="visible"
          :loading="confirmLoading"
          :models="models"
          :configs="configs"
          @cancel="handleCancel"
          :handle="oked"
          :type="type"
          :typeTitle="typeTitle"
          :destroy="destroy"
          :initModel="initModel"
          :footer="undefined"
          :zIndex="1001"
        ></h-form-modal>
        <!-- <a-drawer
          title="答题配置"
          placement="right"
          :closable="true"
          :visible="questionvisible"
          @close="handlequestionsCancel"
          width="640"
          :zIndex="1002"
        >
          <a-row>
            <a-col :span="22">
              <template>
                <a-input placeholder="Basic usage" v-model="questionsValue" />
              </template>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" @click="questionsAdd" shape="circle" style="margin-left: 9px">
                <a-icon type="plus" />
              </a-button>
            </a-col>
          </a-row>
          <a-list item-layout="horizontal" :data-source="questionsData" size="small">
            <a-list-item slot="renderItem" slot-scope="item, index">
              {{ item.label }}
              <a-tooltip slot="actions">
                <template slot="title">删减</template>
                <a-button type="primary" @click="questionsDel(item, index)" shape="circle">
                  <a-icon type="minus" />
                </a-button>
              </a-tooltip>
            </a-list-item>
          </a-list>
          <div
            :style="{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              zIndex: 1,
            }"
          >
            <a-button type="primary" @click="handleOk">保存</a-button>
          </div>
        </a-drawer> -->

        <a-modal
          title="答题配置"
          :visible="questionvisible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handlequestionsCancel"
          :zIndex="1002"
          :width="640"
          okText="提交"
          cancelText="取消"
        >
          <a-row>
            <a-col :span="22">
              <template>
                <a-input placeholder="Basic usage" v-model="questionsValue" />
              </template>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" @click="questionsAdd" shape="circle" style="margin-left: 9px">
                <a-icon type="plus" />
              </a-button>
            </a-col>
          </a-row>
          <a-list item-layout="horizontal" :data-source="questionsData" size="small">
            <a-list-item slot="renderItem" slot-scope="item, index">
              {{ item.label }}
              <a-tooltip slot="actions">
                <template slot="title">删减</template>
                <a-button type="primary" @click="questionsDel(item, index)" shape="circle">
                  <a-icon type="minus" />
                </a-button>
              </a-tooltip>
            </a-list-item>
          </a-list>
        </a-modal>
      </a-card>
    </div>

    <a-drawer title="配置" placement="right" :closable="true" :visible="visibleMedia" @close="closeOpt" width="500">
      <a-card style="width: 100%" :bordered="false" tabPosition="left" :loading="cardLoading">
        <a slot="extra" href="#">
          <a-tooltip>
            <template slot="title">添加素材</template>
            <a-icon type="plus" @click="showSec()" style="font-size: 16px"></a-icon>
          </a-tooltip>
          <a-divider type="vertical" />
          <a-tooltip>
            <template slot="title">删除素材</template>
            <a-popconfirm title="是否删除选中数据？" ok-text="确定" cancel-text="取消" @confirm="delMedia">
              <a-icon type="delete" style="font-size: 16px" v-if="!asking"></a-icon>
              <a-icon type="loading" style="font-size: 16px" v-else></a-icon>
            </a-popconfirm>
          </a-tooltip>
        </a>
        <a-list item-layout="horizontal" :data-source="dataMedia[tabKey]" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              />
            </a>
            <a-tooltip slot="actions">
              <template slot="title">编辑</template>
              <a-icon style="font-size: 16px" type="edit" @click="handleEdit(item)"></a-icon>
            </a-tooltip>
            <a-tooltip slot="actions">
              <template slot="title">删除</template>
              <a-popconfirm
                title="是否删除该数据？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDel(item)"
                @visibleChange="(e) => showPop(e, item)"
              >
                <a-icon type="delete" style="font-size: 16px" v-if="!asking"></a-icon>
                <a-icon type="loading" style="font-size: 16px" v-else></a-icon>
              </a-popconfirm>
            </a-tooltip>
            <a-tooltip slot="actions" v-if="tabKey === 'faults'">
              <template slot="title">配置</template>
              <a-icon style="font-size: 16px" type="diff" @click="handleNext(item)"></a-icon>
            </a-tooltip>
            <a-list-item-meta :description="item.info">
              <a slot="title" href="#">{{ item.name }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                size="large"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button type="primary" @click="closeOpt">关闭</a-button>
      </div>
      <a-drawer placement="right" :visible="view_faults" @close="close_view_detail" width="550">
        <a-card style="width: 100%" :bordered="false" tabPosition="left" :loading="cardLoading">
          <a slot="extra" href="#">
            <a-tooltip>
              <template slot="title">添加素材</template>
              <a-icon type="plus" @click="showSec()" style="font-size: 16px"></a-icon>
            </a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip>
              <template slot="title">删除素材</template>
              <a-popconfirm title="是否删除选中数据？" ok-text="确定" cancel-text="取消" @confirm="delMedia">
                <a-icon type="delete" style="font-size: 16px" v-if="!asking"></a-icon>
                <a-icon type="loading" style="font-size: 16px" v-else></a-icon>
              </a-popconfirm>
            </a-tooltip>
          </a>
          <a-list item-layout="horizontal" :data-source="dataNext[tabnextKey]" :bordered="false">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a slot="actions">
                <a-checkbox
                  @change="(e) => checkRulenextMedia(e, item, index)"
                  :checked="checkednextKeys.indexOf(item.id) >= 0 ? true : false"
                />
              </a>
              <a-tooltip slot="actions">
                <template slot="title">编辑</template>
                <a-icon style="font-size: 16px" type="edit" @click="handlenextEdit(item)"></a-icon>
              </a-tooltip>
              <a-tooltip slot="actions">
                <template slot="title">删除</template>
                <a-popconfirm
                  title="是否删除该数据？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handleDell(item)"
                  @visibleChange="(e) => shownextPop(e, item)"
                >
                  <a-icon type="delete" style="font-size: 16px" v-if="!asking"></a-icon>
                  <a-icon type="loading" style="font-size: 16px" v-else></a-icon>
                </a-popconfirm>
              </a-tooltip>
              <a-list-item-meta :description="item.question">
                <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  size="large"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button type="primary" @click="closeOpt">关闭</a-button>
        </div>
      </a-drawer>
    </a-drawer>
  </div>
</template>

<script>
import { Ellipsis, HTable, HFormModal } from "@/libs/components";
import { columns, parseFields } from "@/config/options/sections.js";
import filters from "@/components/Mixins/Filters";
import BreadCrumb from "@/views/Components/BreadCrumb";
import api from "@/libs/api";
import { parseFields_questions } from "@/config/options/questions.js";
import { parseFields_sorts } from "@/config/options/sorts.js";
import { parseFields_faults } from "@/config/options/faults.js";
import { parseFields_circleList } from "@/config/options/circleList.js";
import { EventBus } from "@/core/event-bus.js";
import { name } from "lodash/pick";
// import HFiltrate from "@/views/Components/Filtrate";
let [models, configs] = parseFields();
let [models_questions, configs_questions] = parseFields_questions();
let [models_sorts, configs_sorts] = parseFields_sorts();
let [models_faults, configs_faults] = parseFields_faults();
let [models_circleList, configs_circleList] = parseFields_circleList();
let media_fields = {
  questions: {
    models: models_questions,
    configs: configs_questions,
  },
  sorts: {
    models: models_sorts,
    configs: configs_sorts,
  },
  faults: {
    models: models_faults,
    configs: configs_faults,
  },
  circleList: {
    models: models_circleList,
    configs: configs_circleList,
  },
};
export default {
  mixins: [filters],
  provide() {
    return {
      src: {
        // grouped: () => this.grouped,
        options: () => {
          return this.srcData;
          // [
          //   { value: "0", label: "灯光" },
          //   { value: "1", label: "电源" },
          // ];
        },
      },
    };
  },
  components: {
    HTable,
    Ellipsis,
    BreadCrumb,
    HFormModal,
  },
  data() {
    this.columns = columns;
    let [models, configs] = parseFields();
    return {
      dataMedia: { quetions: [], faults: [], sorts: [] },
      dataNext: { circleList: [] },
      tabKey: "",
      tabnextKey: "",
      nonevisible: false,
      total: 0,
      view_faults: false,
      asking: false,
      //记录下拉表数据
      srcData: [],
      cardLoading: false,
      questionvisible: false,
      //记录questionvisible框的数据
      questionsData: [],
      options: [],
      secForm: {},
      initModel: Object.assign({}, models),
      grouped: [],
      checkedKeys: [],
      checkednextKeys: [],
      models,
      destroy: true,
      contentRow: {},
      selRecord: {},
      configs,
      visibleMedia: false,
      questionsValue: "",
      sections: {
        data: [{ id: 17, name: "我的", faults: "找茬", questions: "问答", sorts: 11 }],
      },
      type: "add",
      typeTitle: "新增",
      visible: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam);
        return this.$store.dispatch("list_sec", requestParameters).then((res) => {
          this.total = res.totalCount;
          return Promise.resolve(res);
        });
      },
      selectedRowKeys: [],
      selectedRows: [],
      rules: {
        tag: [{ required: true, message: "请输入名字", trigger: "change" }],
      },
    };
  },
  created() {
    this.changeModel();
  },
  mounted() {
    EventBus.$on("closeshow", () => {
      this.questionvisible = true;
    });
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      };
    },
  },
  watch: {
    //监听抽屉变化
    visibleMedia() {
      this.$refs.createModal.$emit("cancel");
      this.changeModel();
    },
    view_faults() {
      this.$refs.createModal.$emit("cancel");
      this.changenextModel();
    },
  },
  beforeDestroy() {
    EventBus.$off("closeshow");
  },
  methods: {
    onClose() {
      this.filterVisible = false;
    },
    showSec() {
      if (this.visibleMedia && !this.view_faults && this.tabKey === "questions") {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
        this.srcData = [];
        this.questionsData = [];
        this.options = [];
        this.models.options = this.srcData;
        console.log(">>");
      } else if (this.visibleMedia && !this.view_faults && this.tabKey === "sorts") {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
        this.srcData = [];
        this.questionsData = [];
        this.options = [];
        this.models.options = this.srcData;
        console.log(">>");
      } else if (this.visibleMedia && !this.view_faults && this.tabKey === "faults") {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
        console.log(">>>");
      } else if (this.view_faults) {
        let { models = {}, configs = {} } = media_fields[this.tabnextKey] ? media_fields[this.tabnextKey] : {};
        this.models = models;
      } else {
        this.models = { ...this.initModel };
      }
      this.visible = true;
      this.type = "add";
      this.typeTitle = "新增";
    },
    closeOpt() {
      this.visibleMedia = false;
    },
    close_view_detail() {
      this.view_faults = false;
    },
    checkRuleMedia(e, item, index) {
      const checkIndex = this.checkedKeys.indexOf(item.id);
      if (checkIndex >= 0) {
        this.checkedKeys.splice(checkIndex, 1);
      } else {
        this.checkedKeys.push(item.id);
      }
      console.log(this.checkedKeys);
    },
    checkRulenextMedia(e, item, index) {
      const checknextIndex = this.checkednextKeys.indexOf(item.id);
      if (checknextIndex >= 0) {
        this.checkednextKeys.splice(checknextIndex, 1);
      } else {
        this.checkednextKeys.push(item.id);
      }
      console.log(this.checkednextKeys);
    },
    showPop(visible, item) {
      visible && this.getCheck(item.id);
    },
    shownextPop(visible, item) {
      visible && this.getnextCheck(item.id);
    },
    getCheck(id) {
      this.checkedKeys = [];
      this.checkedKeys.push(id);
      console.log(this.checkedKeys);
    },
    getnextCheck(id) {
      this.checkednextKeys = [];
      this.checkednextKeys.push(id);
      console.log(this.checkednextKeys);
    },
    handleEdit(record) {
      this.getCheck(record.id);
      !this.visibleMedia && this.selectRow(record);
      this.visible = true;
      this.srcData = [];
      this.questionsData = [];
      this.options = [];
      if (this.tabKey === "questions") {
        var protect = JSON.parse(JSON.stringify(record.options));
        record.options.forEach((item) => {
          let questions = { value: "", label: "" };
          questions.label = item;
          questions.value = item;
          this.srcData.push(questions);
          this.options.push(item);
        });
        this.questionsData = JSON.parse(JSON.stringify(this.srcData));
        // record.options = JSON.parse(JSON.stringify(record.options.join("|")));
        record.options = record.options[record.answer];
      } else if (this.tabKey === "sorts") {
        protect = JSON.parse(JSON.stringify(record.options));
        record.options.forEach((item) => {
          let questions = { value: "", label: "" };
          questions.label = item;
          questions.value = item;
          this.srcData.push(questions);
          this.options.push(item);
        });
        record.options = JSON.parse(JSON.stringify(record.options.join("|")));
        this.questionsData = JSON.parse(JSON.stringify(this.srcData));
      }
      this.models = { ...record };
      record.options = protect;
      this.type = "update";
      this.typeTitle = "编辑：" + this.models.name;
    },
    handlenextEdit(record) {
      this.getnextCheck(record.id);
      !this.visibleMedia && this.selectRow(record);
      this.visible = true;
      this.models = { ...record };
      this.type = "update";
      this.typeTitle = "编辑：" + this.models.name;
    },
    handleNext(record) {
      this.tabnextKey = "circleList";
      this.checkednextKeys = [];
      this.getCheck(record.id);
      this.view_faults = true;
      console.log(record);
      this.selRecord = record;
      // this.contentRow = record;
      // this.selectrow(record);
    },
    delAll() {
      this.$confirm({
        title: `确定删除所选${this.selectedRowKeys.length}项吗?`,
        content: () => <div style="color:red;">删除{this.getSelectBy("title").join("，")}后数据无法恢复</div>,
        onOk: () => {
          this.asking = true;
          this.sumbit({ ids: this.selectedRowKeys }, "del_multi");
        },
        onCancel() {},
        cancelText: "取消",
        okText: "确定",
      });
    },
    questionsAdd() {
      if (this.questionsValue != "") {
        let questions = { value: "", label: "" };
        questions.label = this.questionsValue;
        questions.value = this.questionsValue;
        this.questionsData.push(questions);
        console.log(this.questionsData);
        this.questionsValue = "";
      }
    },
    // EventBus.$on("closeshow", () => {
    //     this.questionsValue = true;
    //   }),
    questionsDel(item, index) {
      this.questionsData.splice(index, 1);
    },
    handleOk() {
      this.srcData = JSON.parse(JSON.stringify(this.questionsData));
      this.models.options = this.questionsData[0];
      this.questionvisible = false;
      this.options = [];
      this.questionsData.forEach((item) => {
        this.options.push(item.label);
      });
    },
    handlequestionsCancel() {
      this.questionvisible = false;
    },
    oked(vals, form) {
      if (this.visibleMedia === true && !this.view_faults && this.tabKey === "faults") {
        vals.set("sections", this.contentRow.id);
        console.log(">");
      } else if (this.visibleMedia === true && !this.view_faults && this.tabKey === "sorts") {
        vals.set("options", JSON.stringify(this.options));
        vals.set("sections", this.contentRow.id);
        console.log(">>");
      } else if (this.visibleMedia === true && !this.view_faults && this.tabKey === "questions") {
        vals.set("answer", this.options.indexOf(vals.get("options")));
        vals.set("options", JSON.stringify(this.options));
        vals.set("sections", this.contentRow.id);
        console.log(">>>");
      } else if (this.view_faults === true) {
        vals.set("faults", this.selRecord.id);
      }
      return this.sumbit(vals, form.type);
    },
    delMedia() {
      if (this.checkedKeys.length > 0 && this.visibleMedia === true && !this.view_faults) {
        this.asking = true;
        this.sumbit({ ids: this.checkedKeys, sections: this.contentRow.id }, "del_multi");
      } else if (this.checkednextKeys.length > 0 && this.view_faults) {
        this.asking = true;
        this.sumbit({ ids: this.checkednextKeys, faults: this.selRecord.id }, "del_multi");
      } else {
        this.$message.error("未择操作数据");
      }
    },
    handleCancel() {
      this.visible = false;
    },
    handleDel(vals) {
      this.getCheck(vals.id);
      this.asking = true;
      this.sumbit(vals, "del");
    },
    handleDell(vals) {
      this.getnextCheck(vals.id);
      this.asking = true;
      this.sumbit(vals, "del");
    },
    sumbit(vals, type, form) {
      let table = this.$refs.table;
      // console.log("vals.>>>", vals, ">>>>", vals.get("options"));
      if (this.visibleMedia === true && !this.view_faults) {
        vals["pages"] = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
        return this.$store.dispatch(type + "_" + this.tabKey, vals).then((res) => {
          console.log(res);
          this.dataMedia[this.tabKey] = res.data;
          // 刷新表格
          // table.refresh();
          // this.$message.info(type + "成功");
          this.visible && this.handleCancel(type);
          type.indexOf("del") > -1 && (this.checkedKeys = []);
          this.asking = false;
          return Promise.resolve(res);
        });
      } else if (this.view_faults) {
        vals["pages"] = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
        return this.$store.dispatch(type + "_" + this.tabnextKey, vals).then((res) => {
          this.dataNext[this.tabnextKey] = res.data;
          this.visible && this.handleCancel(type);
          type.indexOf("del") > -1 && (this.checkenextdKeys = []);
          this.asking = false;
          return Promise.resolve(res);
        });
      } else {
        vals["pages"] = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
        return this.$store.dispatch(type + "_sec", vals).then((res) => {
          // this.onClose();
          this.$refs.filtrate && this.$refs.filtrate.reload(res.data);
          // 刷新表格
          table.refresh();
          // this.$message.info(type + "成功");
          this.visible && this.handleCancel(type);
          type.indexOf("del") > -1 && this.resetSelect();
          this.asking = false;
          this.models = { ...this.initModel };
          return Promise.resolve(res);
        });
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    selectRow(record) {
      this.selectedRowKeys = [record.id];
      this.checkedKeys.push = this.selectedRows = [record];
      this.$refs.table.updateSelect(this.selectedRowKeys, this.selectedRows);
    },
    selectrow(record) {
      this.checkedKeys.push = record.id;
    },
    // showDrawer() {
    //   this.$router.push({
    //     name: "rights",
    //   });
    // },
    resetSelect() {
      this.selectedRowKeys = [];
      this.selectedRows = [];
      this.$refs.table.updateSelect(this.selectedRowKeys, this.selectedRows);
    },
    handleConfig(record) {
      this.tabKey = "questions";
      this.visibleMedia = true;
      this.contentRow = record;
      this.selectRow(record);
    },
    handleSorts(record) {
      this.tabKey = "sorts";
      this.visibleMedia = true;
      this.contentRow = record;
      this.selectRow(record);
    },
    handleFaults(record) {
      this.tabKey = "faults";
      this.visibleMedia = true;
      this.selRecord = record;
      this.contentRow = record;
      this.selectRow(record);
    },
    changeModel() {
      if (this.visibleMedia && !this.view_faults) {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
        this.configs = configs;
        this.cardLoading = true;
        let tabKey = this.tabKey,
          apiName = "list_" + tabKey;
        this.checkedKeys = [];
        this.$store.dispatch(apiName, this.contentRow).then((res) => {
          this.cardLoading = false;
          this.dataMedia[tabKey] = res.data;
        });
      } else {
        this.models = models;
        this.configs = configs;
      }
    },
    changenextModel() {
      if (this.view_faults) {
        let { models = {}, configs = {} } = media_fields[this.tabnextKey] ? media_fields[this.tabnextKey] : {};
        this.models = models;
        this.configs = configs;
        this.cardLoading = true;
        let tabnextKey = this.tabnextKey,
          apiName = "list_" + tabnextKey;
        this.cardLoading = false;
        this.dataNext[tabnextKey] = [];
        this.$store.dispatch(apiName, this.selRecord).then((res) => {
          this.dataNext[tabnextKey] = res.data;
        });
      } else {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
        this.configs = configs;
      }
    },
    getSelectBy(name) {
      return this.selectedRows.map((val) => val[name]);
    },
  },
};
</script>

<style scoped>
.table-operator {
  margin: 20px 0;
}
.ant-list-item-meta-title {
  margin-bottom: 0px !important;
}
</style>
