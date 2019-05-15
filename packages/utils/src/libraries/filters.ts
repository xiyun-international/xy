// 隐藏 身份证 中间数字
const hideIDMiddle = function(val) {
    val = val.toString();
    if(val.length < 7){
        return;
    }
    return `${val.substring(0,3)}****${val.substring(val.length-3)}`
}
// 隐藏 手机号 4位中间数字
const hidePhoneMiddle = function(val) {
    val = val.toString();
    if(val.length<7){
        return;
    }
    return val.replace(/(\d{3})\d{4}(\d*)/,'$1****$2')
}
export {
    hideIDMiddle,
    hidePhoneMiddle,
}
