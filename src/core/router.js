import { formatArray } from "./utils";
export default function filterAsyncRouter(
  routerMap = [],
  roles,
  permissions,
  alias = { roles: "authority", tags: "tags" },
  isChildren = false
) {
  return routerMap.filter((route) => {
    route.meta = route.meta ? route.meta : {};
    let permission = permit(route, roles, permissions, alias);
    if (permission) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles, permissions, alias, true);
      }
      return true;
    }
    return false;
  });
}

function permit(route, roles, permissions, alias) {
  let meta = route.meta,
    role = access(route, alias.roles, roles),
    tag = permissions == null ? true : access(route, alias.tags, permissions);
  return role && tag;
}

function access(route, name, items = []) {
  return formatMeta(route, name)
    ? formatArray(items).some((i, num) => {
        return route.meta[name].includes(i) ? true : false;
      })
    : true;
}

function formatMeta(route, name) {
  let res = false;
  if (route.meta && route.meta[name]) {
    route.meta[name] = formatArray(route.meta[name]);
    res = route.meta[name].length ? true : false;
  }
  return res;
}

// function formatArray(val) {
//   return Object.prototype.toString.call(val) === "[object Array]" ? val : [val];
// }
