import * as token from "./libraries/token";
import post from "./libraries/post";
import clickOutside from "./libraries/clickoutside";

const libraries = {
  ...token,
  post,
  clickOutside
};

export default libraries;

export * from "./libraries/token";
export { post, clickOutside };
