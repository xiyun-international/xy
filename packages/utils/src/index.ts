import * as token from "./libraries/token";
import * as validate from "./libraries/validate";
import post from "./libraries/post";
import get from "./libraries/get";
import http from "./libraries/http";
import clickOutside from "./libraries/clickoutside";

const libraries = {
  ...token,
  ...validate,
  post,
  get,
  http,
  clickOutside,
};

export default libraries;

export * from "./libraries/token";
export * from "./libraries/validate";
export { post, clickOutside, get, http };
