<template>
  <div style="background: #f0f2f5; padding: 30px; position: absolute; left: 55%; top: 25%">
    <a-spin tip="登入中..." :spinning="loading" size="large">
      <p
        style="
          position: absolute;
          text-align: center;
          line-height: 30px;
          width: 100%;
          top: -60px;
          font-size: 22px;
          /* font-weight: 500; */
          /* left: -2px; */
        "
      >
        <span
          style="font-style: italic; font-weight: 700; font-size: 28px; display: inline-block; vertical-align: bottom"
        >
          上海宝瓶创意
        </span>
        <span style="display: inline-block">&nbsp;</span>
      </p>
      <a-card :bordered="false" style="width: 400px; border-radius: 10px; z-index: 1000" :hoverable="false">
        <p style="text-align: center; line-height: 30px; font-size: 16px; padding-bottom: 10px">账号登录</p>
        <a-form id="login_page" :form="form" class="login-form">
          <a-form-item>
            <a-input
              v-decorator="['name', { rules: [{ required: true, message: '账号不能为空!' }] }]"
              placeholder="账号"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['password', { rules: [{ required: true, message: '密码不能为空!' }] }]"
              type="password"
              placeholder="密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <!-- <a-checkbox
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true,
                },
              ]"
            >
              记住我
            </a-checkbox> -->
            <!-- <a class="login-form-down" @click="showDrawer">资源下载</a> -->
            <a-button type="primary" class="login-form-button" @click="login">登入</a-button>
            <a-button type="default" class="login-form-button" @click="showDrawer">资源下载</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- <div
        style="
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          left: calc(50% - 40px);
          bottom: -30px;
        "
      ></div> -->
      <!-- <div
        style="
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-image: url(/statics/images/login.png);
          background-position: center 0px;
          background-repeat: no-repeat;
          background-size: cover;
          position: absolute;
          left: calc(50% - 25px);
          bottom: -25px;
          z-index: 1100;
        "
      ></div> -->
    </a-spin>
    <a-drawer
      :headerStyle="{ textAlign: 'center' }"
      width="500px"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="onClose"
      :zIndex="10000"
    >
      <span style="font-size: 16; font-weight: 700" slot="title">中控系统安装包下载</span>
      <a-list item-layout="horizontal" :data-source="resourceDownload">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <span slot="title">
              {{ index + 1 + "." + item.title }}
              <a :href="item.path" download="">
                <a-icon type="download" />
                下载
              </a>
            </span>
            <span slot="description">{{ item.detail }}</span>
            <a-avatar class="card-avatar" slot="avatar" style="color: #f56a00; background-color: #fde3cf" size="small">
              {{ item.tag }}
            </a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "login_page" });
    // let url = "/hardware/electric/list";
    // this.$request({ url, method: "post", name: "" }).then(() => {});
  },
  data() {
    return {
      loading: false,
      visible: false,
      resourceDownload: [
        {
          tag: "App",
          title: "APP控制端",
          path: "/api/website/app.apk",
          detail: "download - 下载",
        },
        {
          tag: "Dev",
          title: "设备配置软件",
          path: "/api/website/dev.zip",
          detail: "download - 下载",
        },
        {
          tag: "Cli",
          title: "客户端",
          path: "/api/website/heroage.zip",
          detail: "download - 下载",
        },
        {
          tag: "Chr",
          title: "浏览器下载",
          path: "/api/website/Chrome.zip",
          detail: "download - 下载",
        },
        {
          tag: "Mou",
          title: "鼠标光标隐藏软件",
          path: "/api/website/AutoHideMouseCursor.zip",
          detail: "download - 下载",
        },
        {
          tag: "Fre",
          title: "视频转换工具",
          path: "/api/website/freemake.zip",
          detail: "download - 下载",
        },
        {
          tag: "W10",
          title: "win10网口驱动",
          path: "/api/website/0019-Install_Win10_10023_12252017.zip",
          detail: "download - 下载(用于解决低配显卡播放高清视频)",
        },
        {
          tag: "W7",
          title: "win7补丁",
          path: "/api/website/Win7.zip",
          detail: "download - 下载",
        },
        {
          tag: "Rem",
          title: "远程控制软件",
          path: "/api/website/remote.zip",
          detail: "download - 下载",
        },
        {
          tag: "Ins",
          title: "说明书",
          path: "/api/website/read.pdf",
          detail: "download - 下载",
        },
        {
          tag: "Pot",
          title: "视频播放器：",
          path: "/api/website/pot.zip",
          detail: "download - 下载",
        },
        {
          tag: "Des",
          title: "墙面",
          path: "/api/website/app_desk.apk",
          detail: "download - 下载",
        },
      ],
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    login(e) {
      e.preventDefault();
      //this.$loading.show({ tip: "验证中..." });
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.$store.dispatch("login", values).then((res) => {
            this.loading = false;
            //this.$loading.hide({ tip: "登入中" });
            if (res.success === true) {
              // this.$router.push("/hardware/electric");
              this.$router.push("/sections");
            } else {
              // this.$loading.hide({ tip: "登入失败" });
              let msg = res.msg ? res.msg : "登入失败！";
              this.$message.error(msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#login_page .login-form {
  max-width: 300px;
}
#login_page .login-form-down {
  float: right;
}
#login_page .login-form-button {
  width: 100%;
}
</style>
