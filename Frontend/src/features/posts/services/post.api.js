import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/posts',
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get('/feed');
  return response.data;
}

export async function createPost(formData) {
  // formData should contain "image" (File) and "caption" (String)
  const response = await api.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function getUserPosts() {
  const response = await api.get('/');
  return response.data;
}

export async function getPostDetails(postId) {
  const response = await api.get(`/details/${postId}`);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/like/${postId}`);
  return response.data;
}

export default {
  getFeed,
  createPost,
  getUserPosts,
  getPostDetails,
  likePost,
};