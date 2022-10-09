module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": 1, //驼峰命名规范问题，但是Login.vue这样的名字也会通不过
    "no-unused-vars": 1, //使用 var 发出警告
    "vue/no-unused-vars": 0,
    // "prettier/prettier": 1, //prettier美观报错1.不同操作系统的换行符问题2.标签段落间需要回车换行
    // "prettier/prettier": "error",
    // "prettier/prettier": ["error", {
    //   printWidth: 120, // 指定代码长度，超出换行
    //   endOfLine: "auto", // 结尾是 \n \r \n\r auto
    //   semi: true, // 结尾加上分号
    //   trailingComma: "es5", // 确保对象的最后一个属性后有逗号
    // }]
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
