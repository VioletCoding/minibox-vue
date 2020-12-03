const baseUrl = "http://127.0.0.1:20002/";
//登陆接口
const login = baseUrl + 'user/login';
//获取帖子列表
const getPostList = baseUrl + 'post/showAll'

export default {
    login,
    getPostList
}