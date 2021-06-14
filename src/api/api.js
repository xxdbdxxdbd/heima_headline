import request from '@/utils/request.js'

/**
 * 登录
 */
export const login = data => {
	return request({
		method: 'POST',
		url: '/app/v1_0/authorizations',
		data
	})
}

/**
 * 发送验证码
 */
export const sendSms = data => {
	return request({
		method: 'GET',
		url: `/app/v1_0/sms/codes/${data}`
	})
}

/**
 * 获取用户自己信息
 */
export const getUser = () => {
	return request({
		method: 'GET',
		url: '/app/v1_0/user'
	})
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
	return request({
		method: 'GET',
		url: '/app/v1_0/user/channels'
	})
}

/**
 * 获取频道新闻推荐_V1.1
 */
export const getArticles = params => {
	return request({
		method: 'GET',
		url: '/app/v1_1/articles',
		params
	})
}

/**
 * 获取全部频道列表
 */
export const getChannels = params => {
	return request({
		method: 'GET',
		url: '/app/v1_0/channels',
		params
	})
}

/**
 * 批量修改用户频道列表（部分覆盖）
 */
export const patchUserChannels = data => {
	return request({
		method: 'PATCH',
		url: '/app/v1_0/user/channels',
		data
	})
}

/**
 * 删除指定用户频道
 */
export const deleteUserChannels = data => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/user/channels/${data}`,
	})
}

/**
 * 获取用户搜索历史
 */
export const getHistories = () => {
	return request({
		method: 'GET',
		url: '/app/v1_0/search/histories'
	})
}

/**
 * 获取搜索结果
 */
export const getSearch = params => {
	return request({
		method: 'GET',
		url: '/app/v1_0/search',
		params
	})
}

/**
 * 获取联想建议（自动补全）
 */
export const getSuggest = q => {
	return request({
		method: 'GET',
		url: '/app/v1_0/suggestion',
		params: {
			q
		}
	})
}

/**
 * 获取新闻文章详情
 */
export const getArticleById = article_id => {
	return request({
		method: 'GET',
		url: `/app/v1_0/articles/${article_id}`
	})
}

/**
 * 关注用户
 */
export const postFollowings = aut_id => {
	return request({
		method: 'POST',
		url: '/app/v1_0/user/followings',
		data: {
			target: aut_id
		}
	})
}

/**
 * 取消关注用户
 */
export const deleteFollowings = aut_id => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/user/followings/${aut_id}`
	})
}

/**
 * 收藏文章
 */
export const postCollections = article_id => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/collections',
		data: {
			target: article_id
		}
	})
}

/**
 * 取消收藏文章
 */
export const deleteCollections = article_id => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/article/collections/${article_id}`
	})
}

/**
 * 对文章点赞
 */
export const postLikings = article_id => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/likings',
		data: {
			target: article_id
		}
	})
}

/**
 * 取消对文章点赞
 */
export const deleteLikings = article_id => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/article/likings/${article_id}`
	})
}

/**
 * 获取评论或评论回复
 */
export const getComments = params => {
	return request({
		method: 'GET',
		url: '/app/v1_0/comments',
		params
	})
}

/**
 * 对评论或评论回复点赞
 */
export const postCommentsLikings = data => {
	return request({
		method: 'POST',
		url: '/app/v1_0/comment/likings',
		data: {
			target: data
		}
	})
}

/**
 * 获取评论或评论回复
 */
export const deleteCommentsLikings = data => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/comment/likings/${data}`
	})
}

/**
 * 添加评论或评论回复
 */
export const postComments = data => {
	return request({
		method: 'POST',
		url: '/app/v1_0/comments',
		data
	})
}

/**
 * 获取用户个人资料
 */
export const getUserProfile = params => {
	return request({
		method: 'GET',
		url: '/app/v1_0/user/profile',
		params
	})
}

/**
 * 编辑用户个人资料（包含实名认证）
 */
export const patchUserProfile = data => {
	return request({
		method: 'PATCH',
		url: '/app/v1_0/user/profile',
		data
	})
}

/**
 * 编辑用户照片资料（头像、身份证照片）
 */
export const patchUserPhoto = data => {
	return request({
		method: 'PATCH',
		url: '/app/v1_0/user/photo',
		data
	})
}