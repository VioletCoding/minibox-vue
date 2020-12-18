const baseUrl = "http://192.168.0.105:20002/";
//登陆接口
const login = baseUrl + 'user/login';

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
    getAllGame
}