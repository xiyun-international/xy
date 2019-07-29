/**
 * 手机号码校验
 * @param val
 * @return {boolean}
 */
const validMobile = val => {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
  return reg.test(val);
};

/**
 * 身份证号码校验
 * @param val
 * @return {boolean}
 */
const validIdCard = val => {
  val = val.toString();
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(val);
};

/**
 * 邮箱校验
 * @param val
 * @return {boolean}
 */
const validEmail = val => {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
  return reg.test(val);
};

/**
 * 匹配汉字、字母、数字、下划线、中文括号
 * @param val
 * @return {boolean}
 */
const validCLN = val => {
  const reg = /^([a-zA-Z0-9_（）]|[\u4e00-\u9fa5])+$/u;
  return reg.test(val);
};

/**
 * 仅匹配汉字
 * @param val
 * @return {boolean}
 */
const validChinese = val => {
  const reg = /^[\u4e00-\u9fa5]+$/u;
  return reg.test(val);
};

export { validMobile, validIdCard, validEmail, validCLN, validChinese };
