import api, { signApi, initRequest } from "@/libs/api";
import env from "@/config/env";
import hook from "@/config/request/hook";
import options from "@/config/request/options";
import * as elec from "@/config/urls/electric";
import * as red from "@/config/urls/red";
import * as seri from "@/config/urls/serial";
import * as pc from "@/config/urls/pc";
import * as content from "@/config/urls/content";
import * as video from "@/config/urls/video";
import * as saver from "@/config/urls/saver";
import * as cover from "@/config/urls/cover";
import * as image from "@/config/urls/image";
import * as ppt from "@/config/urls/ppt";
import * as web from "@/config/urls/web";
import * as welcome from "@/config/urls/welcome";
import * as caption from "@/config/urls/caption";
import * as scene from "@/config/urls/scene";
import * as groups from "@/config/urls/groups";
import * as rights from "@/config/urls/rights";
import * as files from "@/config/urls/files";
import * as sec from "@/config/urls/sections";
import * as questions from "@/config/urls/questions";
import * as faults from "@/config/urls/faults";
import * as sorts from "@/config/urls/sorts";
import * as circleList from "@/config/urls/circleList";
import * as toapi from "@/config/urls/toapi";
initRequest({
  baseURL: env.baseURL,
  timeout: env.timeout,
});

initRequest(hook, "hook");
initRequest(options, "options");

signApi(elec);
signApi(red);
signApi(seri);
signApi(pc);
signApi(content);
signApi(video);
signApi(saver);
signApi(cover);
signApi(image);
signApi(ppt);
signApi(web);
signApi(welcome);
signApi(caption);
signApi(scene);
signApi(groups);
signApi(rights);
signApi(files);
signApi(sec);
signApi(questions);
signApi(faults);
signApi(sorts);
signApi(circleList);
signApi(toapi);

export default api;
export { signApi };
