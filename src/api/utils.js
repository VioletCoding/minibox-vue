//判断值是否为空或者空字符串
function isNullOrEmpty(value) {
    return value == "" || value == null;
}

//判断值是否为空或者空字符串或者undefined
function isNullOrEmptyOrUndefined(value) {
    return value == "" || value == null || value == undefined;
}

//判断邮箱格式是否正确
function checkEmailFormat(value) {
    let pattern = "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$";
    return new RegExp(pattern).test(value);
}

//错误信息
function errMessage(err) {
    return err.response.message == null ? "服务器开小差了" : err.response.message;
}

export default {
    isNullOrEmpty,
    isNullOrEmptyOrUndefined,
    checkEmailFormat,
    errMessage
}