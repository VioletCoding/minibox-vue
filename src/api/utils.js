//判断值是否为空或者空字符串
function isEmpty(value) {
    return value == "" || value == null;
}

//判断值是否为空或者空字符串或者undefined
function isBlank(value) {
    return value == "" || value == null || value == undefined;
}

//判断邮箱格式是否正确
function checkEmailFormat(value) {
    let pattern = "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$";
    return new RegExp(pattern).test(value);
}

//错误信息
function errMessage(err) {
    return err.response.message == null ? "请重试" : err.response.message;
}


//检查有没有登陆者的id
function isLoginUserIdExist() {
    let local = localStorage.getItem("userId");
    let session = sessionStorage.getItem("userId");
    if (local != "" || local != null || local != undefined)
        return true;
    if (session != "" || session != null || session != undefined)
        return true;
    else
        return false;
}

//获取登陆者id
function getLoginUserId() {
    let local = localStorage.getItem("userId");
    let session = sessionStorage.getItem("userId");
    if (local != "" || local != null || local != undefined)
        return local;
    if (session != "" || session != null || session != undefined)
        return session;
    else
        return null;
}

//检查有没有登陆者的token
function isLoginUserTokenExist() {
    let local = localStorage.getItem("accessToken");
    let session = sessionStorage.getItem("accessToken");
    if (local != "" || local != null || local != undefined)
        return true;
    if (session != "" || session != null || session != undefined)
        return true;
    else
        return false;
}

//获取登陆者的token
function getLoginUserToken() {
    let local = localStorage.getItem("accessToken");
    let session = sessionStorage.getItem("accessToken");
    if (local != "" || local != null || local != undefined)
        return local;
    if (session != "" || session != null || session != undefined)
        return session;
    else
        return null;
}

//删除所有用户认证
function removeAllAuthenticate() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
}

export default {
    isEmpty,
    isBlank,
    checkEmailFormat,
    errMessage,
    isLoginUserIdExist,
    getLoginUserId,
    isLoginUserTokenExist,
    getLoginUserToken,
    removeAllAuthenticate
}