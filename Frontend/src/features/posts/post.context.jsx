import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <PostContext.Provider
      value={{
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
