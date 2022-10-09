<template>
  <div>
    <bread-crumb></bread-crumb>
    <div style="padding: 0px 20px">
      <a-card :bordered="false">
        <div class="table-operator">
          <a-button-group>
            <a-button type="primary" @click="handleAdd">
              <a-icon type="plus" />
              新建
            </a-button>
            <a-button type="primary" @click="reload">
              刷新
              <a-icon type="reload" />
            </a-button>
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
          <a-dropdown style="float: right">
            <a-menu slot="overlay">
              <a-menu-item key="scc" @click="downLoad">
                <a href="/sys/files/down/zip/scc" download="">IOT日志</a>
              </a-menu-item>
              <a-menu-item key="upper" @click="downLoad">
                <a href="/sys/files/down/zip/upper" download="">上位机日志</a>
              </a-menu-item>
              <a-menu-item key="cmd" @click="downLoad">
                <a href="/sys/files/down/zip/cmd" download="">指令控制日志</a>
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              日志下载
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
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
              <a-divider type="vertical" />
              <a-tooltip>
                <template slot="title">下载</template>
                <a
                  :href="'/sys/files/down/' + record.path"
                  download=""
                  style="font-size: 16px"
                  @click="selectRow(record)"
                >
                  <a-icon type="download" />
                </a>
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
          :initModel="initModel"
        />
      </a-card>
    </div>
  </div>
</template>

<script>
import { Ellipsis, HFormModal, HTable } from "@/libs/components";
import { columns, parseFields } from "@/config/options/files.js";
import filters from "@/components/Mixins/Filters";
import BreadCrumb from "@/views/Components/BreadCrumb";

export default {
  mixins: [filters],
  provide() {
    return {
      src: {
        grouped: () => this.grouped,
      },
    };
  },
  components: {
    HTable,
    Ellipsis,
    HFormModal,
    BreadCrumb,
  },
  data() {
    this.columns = columns;
    let [models, configs] = parseFields();
    return {
      asking: false,
      initModel: Object.assign({}, models),
      grouped: [],
      models,
      configs,
      type: "add",
      typeTitle: "新增",
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam);
        return this.$store.dispatch("list_files", requestParameters).then((res) => {
          return Promise.resolve(res);
        });
      },
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  created() {
    // this.$loading.show({ tip: "验证中..." });
  },
  mounted() {},
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      };
    },
  },
  methods: {
    handleAdd() {
      this.visible = true;
      this.type = "add";
      this.typeTitle = "新增";
    },
    handleEdit(record) {
      this.selectRow(record);
      this.visible = true;
      this.models = { ...record };
      this.type = "update";
      this.typeTitle = "编辑：" + this.models.title;
    },
    downLoad() {},
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
    oked(vals, form) {
      return this.sumbit(vals, form.type);
    },
    handleCancel() {
      this.visible = false;
    },
    handleDel(vals) {
      this.asking = true;
      this.sumbit(vals, "del");
    },
    sumbit(vals, type) {
      let table = this.$refs.table;
      vals["pages"] = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
      return this.$store.dispatch(type + "_files", vals).then((res) => {
        // 刷新表格
        table.refresh();
        // this.$message.info(type + "成功");
        this.visible && this.handleCancel(type);
        type.indexOf("del") > -1 && this.resetSelect();
        this.asking = false;
        this.models = { ...this.initModel };
        return Promise.resolve(res);
      });
    },
    reload() {
      let table = this.$refs.table;
      let vals = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
      this.$store.dispatch("reload_files", vals).then(() => {
        table.refresh();
      });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    selectRow(record) {
      this.selectedRowKeys = [record.id];
      this.selectedRows = [record];
      this.$refs.table.updateSelect(this.selectedRowKeys, this.selectedRows);
    },
    resetSelect() {
      this.selectedRowKeys = [];
      this.selectedRows = [];
      this.$refs.table.updateSelect(this.selectedRowKeys, this.selectedRows);
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
</style>
