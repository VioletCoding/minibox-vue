//发送验证码
const auth = "authApi/authCode";
//登陆校验
const loginOrReg = "authApi/auth";
//密码登陆
const passwordLogin = "authApi/passwordLogin";
//登出
const logout = "authApi/logout";
//-----------------------------
//查询「我」的个人信息查询接口
const showUserInfo = "userApi/userInfo";
//查询某个用户发布的所有帖子
const userPosts = "userApi/userPosts";
//查询某个用户发布的所有评论
const userComments = "userApi/userComments";
//更新用户信息
const userModify = "userApi/userModify";
//更新密码
const userPwdModify = "userApi/userPwdModify";
//--------------------------------------
//获取帖子列表
const getPostList = "postApi/list";
//获取帖子详情
const getPostDetail = "postApi/detail";
//图片上传
const uploadImg = "publicApi/upload";
//发布帖子
const publishPost = "postApi/add";
//-----------------------------------------
//发表评论
const publishComment = "commentApi/add";
//发表回复
const publishReply = "commentApi/reply";
//-----------------------------------------
//游戏列表
const getAllGame = "gameApi/list";
//游戏详情
const getGameDetail = "gameApi/detail";
//------------------------------------------
//版块
const getBlockList = "blockApi/list";
//--------------------------------------
//生成订单
const order_generate = "orderApi/add";
//确认订单
const order_confirm = "orderApi/confirm";
//取消订单
const order_cancel = "orderApi/cancel";

export default {
    loginOrReg,auth,logout,passwordLogin,
    getPostList, getPostDetail,publishPost,
    uploadImg,
    publishComment,publishReply,
    getBlockList,
    getAllGame, getGameDetail,
    showUserInfo, userPosts, userComments,userModify,userPwdModify,
    order_generate, order_confirm, order_cancel,
}