const baseUrl = "http://192.168.0.105:20002/";
//登陆前校验接口
const auth = baseUrl + "user/beforeLogin";
//登陆接口
const login = baseUrl + 'user/login';
//查询「我」的个人信息查询接口
const showUserInfo = baseUrl + 'user/show'

//--------------------------------------
//获取帖子列表
const getPostList = baseUrl + 'post/showAll';
//获取帖子详情
const getPostDetail = baseUrl + 'post/detail';
//帖子图片上传
const uploadImg = baseUrl + 'post/upload';
//发布帖子
const publishPost = baseUrl + 'post/publish';

//-----------------------------------------
//发表评论
const publishComment = baseUrl + 'comment/post';

//-----------------------------------------
//游戏列表
const getAllGame = baseUrl + 'game/all';
//游戏详情
const getGameDetail = baseUrl + 'game/detail'

//------------------------------------------
const getBlockList = baseUrl + 'block/get';
export default {
    login,
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