import * as token from './libraries/token';
import xyPost from './libraries/post';



const libraries = {
  ...token,
  xyPost,
};

export default libraries;

export * from './libraries/token';
export {xyPost};
