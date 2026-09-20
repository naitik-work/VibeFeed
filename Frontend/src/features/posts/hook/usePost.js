import { useContext, useCallback } from "react";
import { PostContext } from "../post.context";
import {
  getFeed,
  createPost,
  getUserPosts,
  getPostDetails,
  likePost,
} from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used within a PostContextProvider");
  }

  const {
    loading,
    setLoading,
    feed,
    setFeed,
    userPosts,
    setUserPosts,
    activePost,
    setActivePost,
    isCreateOpen,
    setIsCreateOpen,
  } = context;

  const handleGetFeed = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFeed();
      // data.posts might be array or undefined
      setFeed(data.posts || []);
      return data.posts || [];
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFeed]);

  const handleGetUserPosts = useCallback(async () => {
    try {
      const data = await getUserPosts();
      setUserPosts(data.posts || []);
      return data.posts || [];
    } catch (err) {
      console.error("Failed to fetch user posts:", err);
      return [];
    }
  }, [setUserPosts]);

  const handleCreatePost = async (formData) => {
    try {
      const data = await createPost(formData);
      if (data?.post) {
        setFeed((prevFeed) => [data.post, ...(prevFeed || [])]);
        setUserPosts((prev) => [data.post, ...(prev || [])]);
      }
      return { success: true, post: data?.post };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to create post.";
      return { success: false, message };
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const data = await likePost(postId);
      return { success: true, like: data.like };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to like post.";
      return { success: false, message };
    }
  };

  return {
    loading,
    feed,
    userPosts,
    activePost,
    setActivePost,
    isCreateOpen,
    setIsCreateOpen,
    handleGetFeed,
    handleGetUserPosts,
    handleCreatePost,
    handleLikePost,
  };
};

export default usePost;
