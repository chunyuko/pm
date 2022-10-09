let baseUrl = "/";
export const rights = {
  list: `${baseUrl}rights/list`,
  add: { post: `${baseUrl}sign/up` },
  change: { post: `${baseUrl}sign/pwd` },
  edit: { post: `${baseUrl}rights/update` },
  del: { post: `${baseUrl}rights/del` },
  del_multi: { post: `${baseUrl}rights/del_multi` },
};
