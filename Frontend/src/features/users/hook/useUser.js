import { useState } from 'react';
import { followUser, unfollowUser } from '../services/user.api';

export const useUser = () => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async (username) => {
    setLoading(true);
    try {
      const data = await followUser(username);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not follow user.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (username) => {
    setLoading(true);
    try {
      const data = await unfollowUser(username);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not unfollow user.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleFollow,
    handleUnfollow,
  };
};

export default useUser;
