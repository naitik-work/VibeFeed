import api from '../../../services/api';

export async function followUser(username) {
  const response = await api.post(`/api/users/follow/${username}`);
  return response.data;
}

export async function unfollowUser(username) {
  const response = await api.post(`/api/users/unfollow/${username}`);
  return response.data;
}

export default {
  followUser,
  unfollowUser,
};

