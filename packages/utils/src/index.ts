import * as token from "./libraries/token";
import post from "./libraries/post";
import get from "./libraries/get";
import http from "./libraries/http";
import clickOutside from "./libraries/clickoutside";

const libraries = {
  ...token,
  post,
  get,
  http,
  clickOutside
};

export default libraries;

export * from "./libraries/token";
export { post, clickOutside, get, http };
