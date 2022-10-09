export function formatArray(val) {
  return is(val, "Array") ? val : [val];
}

export function isIE() {
  const bw = window.navigator.userAgent;
  const compare = (s) => bw.indexOf(s) >= 0;
  const ie11 = (() => "ActiveXObject" in window)();
  return compare("MSIE") || ie11;
}

export function capitalize(str) {
  //首字符大写，其余小写
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export function promised(res) {
  return isPromise(res)
    ? res
    : new Promise((resolve, reject) => {
        return resolve(res);
      });
}

export function isPromise(val) {
  return (is(val, "promise") || is(val, "object")) && is(val.then, "function") && is(val.catch, "function");
}

export function is(val, type) {
  type = typeof type == "string" ? capitalize(type) : false;
  return type ? Object.prototype.toString.call(val) === `[object ${type}]` : type;
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty(children = []) {
  return children.filter((c) => c.tag || (c.text && c.text.trim() !== ""));
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = "") =>
  str.split("").reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = "", maxLength) => {
  let showLength = 0;
  return str.split("").reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, "");
};

/**
 * 总条数，每页条数得到总页数
 * @param {*} counts
 * @param {*} size
 */
export const getPages = (counts, size) => {
  return Math.ceil(counts / size);
};

/*
 * 随机数含最大小值
 */

export const randomInt = (min, max = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return min >= max ? Math.floor(Math.random() * min + 1) : Math.floor(Math.random() * (max - min + 1)) + min;
};

/*
 * 数组随机取值
 */
export const randomValue = (arr) => {
  return arr[randomInt(0, arr.length - 1)];
};

// 数组中最大值
export const maxValue = (arr, fn = (v) => v) => {
  // return Math.max(...arr.map(fn));
  return Math.max.apply(Math, arr.map(fn));
};
// 数组中最小值
export const minValue = (arr, fn = (v) => v) => {
  // return Math.max(...arr.map(fn));
  return Math.min.apply(Math, arr.map(fn));
};

// 数组极值及其索引
export const extreme = (arr, fn = (v) => v, operate = "max") => {
  let preIndex = 0,
    preVal = arr[preIndex];

  const exc = (function (sym) {
    return sym == "max" ? (cur, pre) => fn(cur) > fn(pre) : (cur, pre) => fn(cur) < fn(pre);
  })(operate);

  arr.forEach((item, index) => {
    if (exc(item, preVal)) {
      preVal = item;
      preIndex = index;
    }
  });
  return [preIndex, preVal];
};
export const maxItem = (arr, fn = (v) => v) => {
  return extreme(arr, fn);
};
export const maxIndex = (arr, fn = (v) => v) => {
  return maxItem(arr, fn)[0];
};
export const minItem = (arr, fn = (v) => v) => {
  return extreme(arr, fn, "min");
};
export const minIndex = (arr, fn = (v) => v) => {
  return minItem(arr, fn, "min")[0];
};
