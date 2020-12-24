//const baseUrl = "http://192.168.0.105:20001/";
//登陆前校验接口
const auth = "user/before";
//登陆注册复合接口
const loginOrReg = "user/after";
//查询「我」的个人信息查询接口
const showUserInfo = "user/show"

//--------------------------------------
//获取帖子列表
const getPostList = "post/showAll";
//获取帖子详情
const getPostDetail = "post/detail";
//帖子图片上传
const uploadImg = "post/upload";
//发布帖子
const publishPost = "post/publish";

//-----------------------------------------
//发表评论
const publishComment = "comment/post";

//-----------------------------------------
//游戏列表
const getAllGame = "game/all";
//游戏详情
const getGameDetail = "game/detail"

//------------------------------------------
const getBlockList = "block/get";
export default {
    loginOrReg,
    getPostList,
    getPostDetail,
    uploadImg,
    publishComment,
    getBlockList,
    publishPost,
    getAllGame,
    getGameDetail,
    showUserInfo,
    auth
}