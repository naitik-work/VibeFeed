import api from '../../../services/api';

export async function getFeed() {
  const response = await api.get('/api/posts/feed');
  return response.data;
}

export async function createPost(formData) {
  // formData should contain "image" (File) and "caption" (String)
  const response = await api.post('/api/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function getUserPosts() {
  const response = await api.get('/api/posts');
  return response.data;
}

export async function getPostDetails(postId) {
  const response = await api.get(`/api/posts/details/${postId}`);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/api/posts/like/${postId}`);
  return response.data;
}

export default {
  getFeed,
  createPost,
  getUserPosts,
  getPostDetails,
  likePost,
};