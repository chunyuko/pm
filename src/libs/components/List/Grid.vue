<template>
  <a-list
    class="app-list"
    :grid="{ gutter: 24, lg: 4, md: 3, sm: 1, xs: 1 }"
    :dataSource="dataSource"
    :loading="loading"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <template v-if="addBtn && index == 0">
        <a-button class="new-btn" type="dashed">
          <a-icon type="plus" />
          {{ addTitle }}
        </a-button>
      </template>
      <a-card :hoverable="true" v-else>
        <a-card-meta>
          <!-- <slot name="meta" v-bind="item"></slot> -->
          <div style="margin-bottom: 3px; min-width: 100px" slot="title">
            <slot name="title" v-bind="[item, index]"></slot>
          </div>
          <div slot="avatar">
            <slot name="avatar" v-bind="[item, index]"></slot>
          </div>
          <div class="meta-cardInfo" slot="description">
            <slot name="description" v-bind="[item, index]"></slot>
          </div>
        </a-card-meta>
        <template slot="actions">
          <slot name="actions" v-bind="[item, index]"></slot>
        </template>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: "HLGird",
  props: {
    source: {
      type: Array,
      default: () => [],
    },
    addBtn: {
      type: Boolean,
      default: false,
    },
    addTitle: {
      type: String,
      default: "新增",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dataSource() {
      return this.addBtn ? [{}].concat(this.source) : [].concat(this.source);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 170px;
}
</style>
