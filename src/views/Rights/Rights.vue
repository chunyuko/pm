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
        </div>

        <a-modal v-model="addVisible" title="新增用户" @ok="handleOk" okText="确认" cancelText="取消">
          <a-form-model :model="addForm" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-spin :spinning="isLoading">
              <a-form-model-item label="账号" prop="name">
                <a-input v-model="addForm.name" placeholder="请输入账号" />
              </a-form-model-item>
              <a-form-model-item label="密码" prop="password">
                <a-input-password v-model="addForm.password" placeholder="请输入密码" />
              </a-form-model-item>
              <a-form-model-item label="昵称" prop="nickname">
                <a-input v-model="addForm.nickname" placeholder="请输入昵称" />
              </a-form-model-item>
              <a-form-model-item label="序号">
                <a-input v-model="addForm.number" placeholder="请输入序号" />
              </a-form-model-item>
              <a-form-model-item label="角色">
                <a-radio-group v-model="addForm.rank">
                  <a-radio value="1000">超级管理员</a-radio>
                  <a-radio value="800">管理员</a-radio>
                  <a-radio value="100">用户</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-spin>
          </a-form-model>
        </a-modal>

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
import { columns, parseFields } from "@/config/options/rights.js";
import filters from "@/components/Mixins/Filters";
import BreadCrumb from "@/views/Components/BreadCrumb.vue";

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
      isLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
      initModel: Object.assign({}, models),
      grouped: [],
      models,
      configs,
      type: "add",
      typeTitle: "新增",
      visible: false,
      addForm: {},
      addVisible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam);
        return this.$store.dispatch("list_rights", requestParameters).then((res) => {
          return Promise.resolve(res);
        });
      },
      selectedRowKeys: [],
      selectedRows: [],
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "change" },
          { min: 5, max: 15, message: "长度为5-15字符", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 5, max: 15, message: "长度为5-15字符", trigger: "change" },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "change" }],
      },
    };
  },
  created() {
    setTimeout(() => {
      this.grouped = [
        { value: "0", label: "BOX" },
        { value: "1", label: "RED" },
      ];
    }, 1000);
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
      this.addForm = {};
      this.addVisible = true;
      this.type = "add";
      this.addForm.rank = "100";
      this.typeTitle = "新增";
    },
    handleEdit(record) {
      this.selectRow(record);
      this.visible = true;
      this.models = { ...record };
      this.type = "update";
      this.typeTitle = "编辑：" + this.models.title;
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
    oked(vals, form) {
      this.isLoading = true;
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
      return this.$store.dispatch(type + "_rights", vals).then((res) => {
        this.asking = false;
        this.isLoading = false;
        // 刷新表格
        table.refresh();
        this.$message.info(type + "成功");
        this.visible && this.handleCancel(type);
        type.indexOf("del") > -1 && this.resetSelect();
        return Promise.resolve(res);
      });
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isLoading = true;
          let table = this.$refs.table;
          const vals = this.addForm;
          this.$store.dispatch("add_rights", vals).then((res) => {
            // 刷新表格
            this.isLoading = false;
            this.addVisible = false;
            table.refresh();
            // this.$message.info("添加成功");
            return Promise.resolve(res);
          });
        } else {
          this.$message.error("请检查账号信息");
          return false;
        }
      });
    },
    reload() {
      let table = this.$refs.table;
      let vals = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
      this.$store.dispatch("reload_rights", vals).then(() => {
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
