<template>
  <div>
    <bread-crumb></bread-crumb>
    <div style="padding: 0px 20px">
      <a-card :bordered="false" id="filterCom" style="overflow: hidden; position: relative">
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
            <a-button type="primary" @click="showDrawer">
              筛选
              <a-icon :type="filterVisible ? 'up' : 'down'" />
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
        <div v-if="filterVisible == true">
          <h-filtrate
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
              <span v-if="k == 'display'">{{ val[k] == "0" ? "隐藏" : "显示" }}</span>
              <span v-else-if="k == 'cover_play'">{{ val[k] == "video" ? "视频" : "图片" }}</span>
              <span v-else>{{ val[k] }}</span>
            </template>
          </h-filtrate>
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
          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a-tooltip>
                <template slot="title">编辑</template>
                <a-icon type="edit" @click="handleEdit(record)" style="font-size: 16px"></a-icon>
              </a-tooltip>
              <a-divider type="vertical" />
              <a-popconfirm title="是否删除该数据？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
                <a-tooltip>
                  <template slot="title">删除</template>
                  <a-icon type="delete" @click="selectRow(record)" style="font-size: 16px" v-if="!asking"></a-icon>
                  <a-icon type="loading" style="font-size: 16px" v-else></a-icon>
                </a-tooltip>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-tooltip>
                <template slot="title">内容配置</template>
                <a-icon type="diff" style="font-size: 16px" @click="handleConfig(record)"></a-icon>
              </a-tooltip>
            </template>
          </span>
        </h-table>
      </a-card>
    </div>
    <h-form-modal
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :models="models"
      :configs="configs"
      @cancel="handleCancel"
      @ok="handleOk"
      :handle="oked"
      :type="type"
      :typeTitle="typeTitle"
      :destroy="destroy"
      :zIndex="10000"
    />
    <a-drawer title="配置" placement="right" :closable="true" :visible="visibleMedia" @close="closeOpt" width="650">
      <a-card
        style="width: 100%"
        :bordered="false"
        :tabList="tabList"
        tabPosition="left"
        :activeTabKey="tabKey"
        @tabChange="(key) => handleTabChange(key)"
        class="listCard"
        :title="selRecord.description"
        ref="mediaCard"
        :loading="cardLoading"
      >
        <a slot="extra" href="#">
          <a-tooltip>
            <template slot="title">添加素材</template>
            <a-icon type="plus" @click="handleAdd" style="font-size: 16px"></a-icon>
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
        <!-- 视频列表 -->
        <a-list v-if="tabKey === 'video'" item-layout="horizontal" :data-source="dataMedia.video" :bordered="false">
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
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.video" size="large" />
              <ellipsis :length="30" tooltip slot="description">
                ID:{{ item.id }} | {{ (item.size / 1024 / 1024).toFixed(2) }}M
              </ellipsis>
              <ellipsis :length="30" tooltip slot="title">{{ item.title }}</ellipsis>
            </a-list-item-meta>
            <div style="width: 200px; height: 100px">
              <video
                :src="'/statics/' + item.path"
                alt=""
                style="width: 100%; height: 100%; object-fit: fill"
                controls="controls"
                x5-video-player-fullscreen="true"
                x5-video-orientation="portraint"
                webkit-playsinline="true"
              />
            </div>
          </a-list-item>
        </a-list>
        <!-- 屏保列表 -->
        <a-list v-if="tabKey === 'saver'" item-layout="horizontal" :data-source="dataMedia.saver" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.saver" size="large" />
              <ellipsis :length="30" tooltip slot="description">
                ID:{{ item.id }} | {{ (item.size / 1024 / 1024).toFixed(2) }}M
              </ellipsis>
              <ellipsis :length="10" tooltip slot="title">{{ item.title }}</ellipsis>
            </a-list-item-meta>
            <div style="width: 200px; height: 100px">
              <video
                :src="'/statics/' + item.path"
                alt=""
                style="width: 100%; height: 100%; object-fit: fill"
                controls="controls"
                x5-video-player-fullscreen="true"
                x5-video-orientation="portraint"
                webkit-playsinline="true"
              />
            </div>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
          </a-list-item>
        </a-list>
        <!-- 封面列表 -->
        <a-list v-if="tabKey === 'cover'" item-layout="horizontal" :data-source="dataMedia.cover" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.cover" size="large" />
              <ellipsis :length="30" tooltip slot="description">
                ID:{{ item.id }} | {{ (item.size / 1024 / 1024).toFixed(2) }}M
              </ellipsis>
              <ellipsis :length="10" tooltip slot="title">{{ item.title }}</ellipsis>
            </a-list-item-meta>
            <div style="width: 200px; height: 100px">
              <img :src="'/statics/' + item.path" style="width: 100%; height: 100%; object-fit: fill" />
            </div>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
          </a-list-item>
        </a-list>
        <!-- 图片列表 -->
        <a-list v-if="tabKey === 'image'" item-layout="horizontal" :data-source="dataMedia.image" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.image" size="large" />
              <ellipsis :length="30" tooltip slot="description">
                ID:{{ item.id }} | {{ (item.size / 1024 / 1024).toFixed(2) }}M
              </ellipsis>
              <ellipsis :length="10" tooltip slot="title">{{ item.title }}</ellipsis>
            </a-list-item-meta>
            <div style="width: 200px; height: 100px">
              <img :src="'/statics/' + item.path" style="width: 100%; height: 100%; object-fit: fill" />
            </div>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
          </a-list-item>
        </a-list>
        <!-- ppt列表 -->
        <a-list v-if="tabKey === 'ppt'" item-layout="horizontal" :data-source="dataMedia.ppt" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.image" size="large" />
              <ellipsis :length="30" tooltip slot="description">
                ID:{{ item.id }} | {{ (item.size / 1024 / 1024).toFixed(2) }}M
              </ellipsis>
              <ellipsis :length="10" tooltip slot="title">{{ item.title }}</ellipsis>
            </a-list-item-meta>
            <div style="width: 200px; height: 100px">
              <img :src="'/statics/' + parsePath(item)" style="width: 100%; height: 100%; object-fit: fill" />
            </div>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
            <a-tooltip slot="actions">
              <template slot="title">详情列表</template>
              <a-icon style="font-size: 16px" type="eye" @click="view_detail(item)"></a-icon>
            </a-tooltip>
          </a-list-item>
        </a-list>
        <!-- 网页列表 -->
        <a-list v-if="tabKey === 'web'" item-layout="horizontal" :data-source="dataMedia.web" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.web" size="large" />
              <ellipsis :length="50" tooltip slot="title">{{ item.title }}</ellipsis>
              <ellipsis :length="100" tooltip slot="description">ID:{{ item.id }} | {{ item.url }}</ellipsis>
            </a-list-item-meta>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
          </a-list-item>
        </a-list>
        <!-- 欢迎词 -->
        <a-list v-if="tabKey === 'welcome'" item-layout="horizontal" :data-source="dataMedia.welcome" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.welcome" size="large" />
              <ellipsis :length="50" tooltip slot="title">{{ item.title }}</ellipsis>
              <ellipsis :length="100" tooltip slot="description">ID:{{ item.id }} | {{ item.sub_title }}</ellipsis>
            </a-list-item-meta>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
          </a-list-item>
        </a-list>
        <!-- 解说词 -->
        <a-list v-if="tabKey === 'caption'" item-layout="horizontal" :data-source="dataMedia.caption" :bordered="false">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta>
              <a-avatar slot="avatar" class="card-avatar" :src="iconList.caption" size="large" />
              <ellipsis :length="30" tooltip slot="description">
                ID:{{ item.id }} | {{ (item.size / 1024 / 1024).toFixed(2) }}M
              </ellipsis>
              <ellipsis :length="10" tooltip slot="title">{{ item.title }}</ellipsis>
            </a-list-item-meta>
            <div style="width: 200px; height: 100px">
              <video
                :src="'/statics/' + item.path"
                alt=""
                style="width: 100%; height: 100%; object-fit: fill"
                controls="controls"
                x5-video-player-fullscreen="true"
                x5-video-orientation="portraint"
                webkit-playsinline="true"
              />
            </div>
            <a slot="actions">
              <a-checkbox
                @change="(e) => checkRuleMedia(e, item, index)"
                :checked="checkedKeys.indexOf(item.id) >= 0 ? true : false"
              ></a-checkbox>
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
      <a-drawer placement="right" :visible="view_ppt" @close="close_view_detail" width="280">
        <ellipsis slot="title" :length="20" tooltip>{{ pptTitle }}</ellipsis>
        <a-card
          hoverable
          style="width: 100%; height: 100px; margin-bottom: 30px"
          :bodyStyle="{ padding: '0px', lineHeight: '30px', textAlign: 'center' }"
          v-for="(path, i) in pptDetailList"
          :key="i"
        >
          <a :href="'/statics/' + path" target="_blank">
            <img slot="cover" style="width: 100%; height: 100px; padding: 5px" alt="no pic" :src="'/statics/' + path" />
          </a>
          <a-card-meta>
            <a slot="description" target="_blank" :href="'/statics/' + path">{{ "第" + (i + 1) + "页" }}</a>
          </a-card-meta>
        </a-card>
      </a-drawer>
    </a-drawer>
  </div>
</template>

<script>
import moment from "moment";
import { is } from "@/core/utils";
import { Ellipsis, HFormModal, HTable } from "@/libs/components";
import BreadCrumb from "@/views/Components/BreadCrumb.vue";
import { columns, parseFields, tabs } from "@/config/options/content.js";
import filters from "@/components/Mixins/Filters";
import { parseFields_video } from "@/config/options/video.js";
import { parseFields_saver } from "@/config/options/saver.js";
import { parseFields_cover } from "@/config/options/cover.js";
import { parseFields_image } from "@/config/options/image.js";
import { parseFields_ppt } from "@/config/options/ppt.js";
import { parseFields_web } from "@/config/options/web.js";
import { parseFields_welcome } from "@/config/options/welcome.js";
import { parseFields_caption } from "@/config/options/caption.js";
import HFiltrate from "@/views/Components/Filtrate";

let [models, configs] = parseFields();
let [models_video, configs_video] = parseFields_video();
let [models_saver, configs_saver] = parseFields_saver();
let [models_cover, configs_cover] = parseFields_cover();
let [models_image, configs_image] = parseFields_image();
let [models_ppt, configs_ppt] = parseFields_ppt();
let [models_web, configs_web] = parseFields_web();
let [models_welcome, configs_welcome] = parseFields_welcome();
let [models_caption, configs_caption] = parseFields_caption();

let media_fields = {
  video: {
    models: models_video,
    configs: configs_video,
  },
  saver: {
    models: models_saver,
    configs: configs_saver,
  },
  cover: {
    models: models_cover,
    configs: configs_cover,
  },
  image: {
    models: models_image,
    configs: configs_image,
  },
  ppt: {
    models: models_ppt,
    configs: configs_ppt,
  },
  web: {
    models: models_web,
    configs: configs_web,
  },
  welcome: {
    models: models_welcome,
    configs: configs_welcome,
  },
  caption: {
    models: models_caption,
    configs: configs_caption,
  },
};

export default {
  mixins: [filters],
  provide() {
    return {
      src: {},
    };
  },
  components: {
    HTable,
    Ellipsis,
    HFormModal,
    BreadCrumb,
    HFiltrate,
  },
  data() {
    return {
      pptTitle: "列表",
      pptDetailList: [],
      view_ppt: false,
      asking: false,
      contentRow: {},
      destroy: true,
      cardLoading: false,
      columns: columns,
      models: models,
      initModel: Object.assign({}, models),
      configs: configs,
      type: "add",
      typeTitle: "新增",
      checkedKeys: [],
      dataMedia: { video: [], image: [], ppt: [], saver: [], cover: [], web: [], welcome: [], caption: [] },
      tabList: tabs.concat([]),
      tabListOri: tabs.concat([]),
      visibleMedia: false,
      tabKey: "cover",
      selRecord: {},
      newNum: [],
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
        return this.$store.dispatch("list_content", requestParameters).then((res) => {
          this.srcData = res.data;
          this.total = res.totalCount;
          return Promise.resolve(res);
        });
      },
      selectedRowKeys: [],
      selectedRows: [],
      keyData_: {
        cover_play: {
          title: "屏保模式",
          data: ["video", "image"],
          label: ["视频", "图片"],
        },
        display: {
          title: "显示",
          data: ["0", "1"],
          label: ["隐藏", "显示"],
        },
      },
      filterVisible: false,
      srcData: [],
      iconList: {
        video: "/statics/images/video.png",
        saver: "/statics/images/saver.png",
        cover: "/statics/images/cover.png",
        image: "/statics/images/image.png",
        web: "/statics/images/web.png",
        welcome: "/statics/images/welcome.png",
        caption: "/statics/images/caption.png",
      },
    };
  },
  created() {
    this.changeModel();
  },
  beforeCreate() {},
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      };
    },
  },
  watch: {
    visibleMedia() {
      this.$refs.createModal.$emit("cancel");
      this.changeModel();
    },
  },
  methods: {
    filterElement() {
      return document.getElementById("filterCom");
    },
    afterVisibleChange(val) {},
    showDrawer() {
      this.filterVisible = this.filterVisible == true ? false : true;
    },
    onClose() {
      this.filterVisible = false;
    },
    //过滤查询
    search(data) {
      let table = this.$refs.table;
      let res = {
        pageNo: table.localPagination.current,
        pageSize: table.localPagination.pageSize,
        data,
        success: true,
        msg: "搜索成功",
      };
      this.$store.commit("set_content", res);
      table.refresh();
    },
    handleAdd() {
      if (this.visibleMedia) {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
      } else {
        this.models = { ...this.initModel };
      }
      this.visible = true;
      this.type = "add";
      this.typeTitle = "新增";
    },
    getCheck(id) {
      this.checkedKeys = [];
      this.checkedKeys.push(id);
    },
    handleEdit(record) {
      this.getCheck(record.id);
      !this.visibleMedia && this.selectRow(record);
      this.visible = true;
      this.models = { ...record };
      this.type = "update";
      this.typeTitle = "编辑：" + this.models.title;
    },
    delAll() {
      this.$confirm({
        title: `确定删除所选${this.selectedRowKeys.length}项吗?`,
        content: (h) => <div style="color:red;">删除{this.getSelectBy("title").join("，")}后数据无法恢复</div>,
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
      if (this.visibleMedia === true) {
        vals.set("content", this.contentRow.id);
      }
      return this.sumbit(vals, form.type);
    },
    handleDel(vals) {
      this.getCheck(vals.id);
      this.asking = true;
      this.sumbit(vals, "del");
    },
    sumbit(vals, type, form) {
      let table = this.$refs.table;
      if (this.visibleMedia === true) {
        vals["pages"] = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
        return this.$store.dispatch(type + "_" + this.tabKey, vals).then((res) => {
          this.dataMedia[this.tabKey] = res.data;
          // 刷新表格
          // table.refresh();
          // this.$message.info(type + "成功");
          this.visible && this.handleCancel(type);
          type.indexOf("del") > -1 && (this.checkedKeys = []);
          this.asking = false;
          return Promise.resolve(res);
        });
      } else {
        vals["pages"] = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
        return this.$store.dispatch(type + "_content", vals).then((res) => {
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
    reload() {
      let table = this.$refs.table;
      let vals = { pageNo: table.localPagination.current, pageSize: table.localPagination.pageSize };
      this.$store.dispatch("reload_content", vals).then(() => {
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
      return this.selectedRows.map((val, index) => val[name]);
    },
    changeModel() {
      if (this.visibleMedia) {
        let { models = {}, configs = {} } = media_fields[this.tabKey] ? media_fields[this.tabKey] : {};
        this.models = models;
        this.configs = configs;
        this.cardLoading = true;
        let tabKey = this.tabKey,
          apiName = "list_" + tabKey;
        this.$store.dispatch(apiName, this.contentRow).then((res) => {
          this.cardLoading = false;
          this.dataMedia[tabKey] = res.data;
        });
      } else {
        this.models = models;
        this.configs = configs;
      }
    },
    handleOk() {},
    handleCancel() {
      // this.checkedKeys = [];
      this.visible = false;
    },
    handleConfig(record) {
      let media_index_tabs = ["saver", "cover"];
      let delKey = record.cover_play == "video" ? "saver" : "cover";
      this.tabKey = media_index_tabs.includes(this.tabKey) ? delKey : this.tabKey;
      this.tabList = this.tabListOri.filter((val, i) => {
        let k = val.key;
        return media_index_tabs.includes(k) ? delKey == k : true;
      });
      this.visibleMedia = true;
      this.selRecord = record;
      this.contentRow = record;
      this.selectRow(record);
    },
    closeOpt() {
      this.visibleMedia = false;
    },
    checkRuleMedia(e, item, index) {
      const checkIndex = this.checkedKeys.indexOf(item.id);
      if (checkIndex >= 0) {
        this.checkedKeys.splice(checkIndex, 1);
      } else {
        this.checkedKeys.push(item.id);
      }
    },
    delMedia() {
      if (this.checkedKeys.length > 0) {
        this.asking = true;
        this.sumbit({ ids: this.checkedKeys, content: this.contentRow.id }, "del_multi");
      } else {
        this.$message.error("未择操作数据");
      }
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date()),
      };
    },
    handleTabChange(key) {
      this.checkedKeys = [];
      this.tabKey = key;
      this.changeModel();
    },
    showPop(visible, item) {
      visible && this.getCheck(item.id);
    },
    view_detail(item) {
      this.pptTitle = item.title + "列表：";
      this.pptDetailList = is(item.path, "array") ? item.path : [item.path];
      this.view_ppt = true;
    },
    close_view_detail(e) {
      this.pptTitle = "列表：";
      this.pptDetailList = [];
      this.view_ppt = false;
    },
    parsePath(item) {
      let path = is(item.path, "array") ? item.path[0] : item.path;
      return path ? path : "";
    },
  },
};
</script>

<style scoped>
.table-operator {
  margin: 20px 0;
}

.list_item {
  display: flex;
  justify-content: space-between;
}

.item_h_center {
  line-height: 200px;
}
</style>
