const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/statics/stage" : "/",
  assetsDir: "assets",
  transpileDependencies: true,
  // lintOnSave: false, //关闭lint检测
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    port: 5000,
    proxy: {
      "/unite": { target: process.env.VUE_APP_UNITEURL, changeOrigin: true, pathRewrite: { "^/unite": "" } },
      "/statics": { target: process.env.VUE_APP_UNITEURL, changeOrigin: true },
      "/api": { target: process.env.VUE_APP_UNITEURL, changeOrigin: true },
      "/sys/files/down": { target: process.env.VUE_APP_UNITEURL, changeOrigin: true },
      // "/": { target: "http://192.168.10.118:6200", changeOrigin: true },
      // "/api": {
      //   target: "http://localhost:8080",
      //   bypass: function (req, res) {
      //     if (req.headers.accept.indexOf("html") !== -1) {
      //       return "/index.html";
      //     } else {
      //       try {
      //         const name = req.path.split("/api/")[1].split("/").join("_");
      //         const mockPath = `./mock/${name}`;
      //         const mock = require(mockPath);
      //         const result = mock(req.method);
      //         //清理mock缓存
      //         delete require.cache[require.resolve(`./mock/${name}`)];
      //         return res.send(result);
      //       } catch (error) {
      //         return res.send([]);
      //       }
      //     }
      //   },
      // },
    },
  },
});

// module.exports = {
//   css: {
//     loaderOptions: {
//       less: {
//         lessOptions: {
//           javascriptEnabled: true
//         }
//       }
//     }
//   }
// }
