import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileNav from './MobileNav';
import RightPanel from './RightPanel';
import CreatePostModal from '../../features/posts/components/CreatePostModal';
import PostDetailModal from '../../features/posts/components/PostDetailModal';
import './AppLayout.scss';

export const AppLayout = () => {
  return (
    <div className="vibe-app-layout">
      {/* Mobile Top Header */}
      <TopHeader />

      <div className="vibe-app-layout__body">
        {/* Persistent Desktop / Tablet Sidebar */}
        <Sidebar />

        {/* Center Main Stage */}
        <main className="vibe-app-layout__main">
          <Outlet />
        </main>

        {/* Right Discovery Panel */}
        <RightPanel />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <CreatePostModal />
      <PostDetailModal />
    </div>
  );
};

export default AppLayout;
