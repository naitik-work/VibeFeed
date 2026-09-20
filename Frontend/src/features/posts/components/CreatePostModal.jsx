import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X, UploadCloud, Sparkles, Hash } from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Avatar from '../../../components/ui/Avatar';
import usePost from '../hook/usePost';
import useAuth from '../../auth/hook/useAuth';
import { useToast } from '../../../context/ToastContext';
import './CreatePostModal.scss';

const POPULAR_TAGS = ['#VibeFeed', '#VisualArt', '#Editorial', '#GoldenHour', '#Creator'];

export const CreatePostModal = () => {
  const { isCreateOpen, setIsCreateOpen, handleCreatePost } = usePost();
  const { user } = useAuth();
  const { success, error } = useToast();

  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const resetForm = () => {
    setCaption('');
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    setIsCreateOpen(false);
  };

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      error('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addTag = (tag) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      error('Please upload an image for your post.');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('caption', caption);

    const result = await handleCreatePost(formData);
    setIsSubmitting(false);

    if (result.success) {
      success('Your vibe has been posted!');
      handleClose();
    } else {
      error(result.message || 'Failed to create post. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isCreateOpen}
      onClose={handleClose}
      title="Create New Vibe"
      subtitle="Share an aesthetic moment with your audience"
      size="md"
    >
      <form className="vibe-create-post" onSubmit={handleSubmit}>
        {/* Creator Info */}
        <div className="vibe-create-post__author">
          <Avatar
            src={user?.profile_image}
            username={user?.username || 'you'}
            size="sm"
          />
          <div className="vibe-create-post__author-text">
            <span className="vibe-create-post__name">@{user?.username || 'creator'}</span>
            <span className="vibe-create-post__privacy">Public Audience</span>
          </div>
        </div>

        {/* Upload Zone or Preview */}
        {!previewUrl ? (
          <div
            className={`vibe-create-post__dropzone ${isDragging ? 'is-dragging' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
              }}
            />
            <div className="vibe-create-post__drop-icon">
              <UploadCloud size={36} />
            </div>
            <p className="vibe-create-post__drop-title">
              Drag and drop your photo here, or <span>browse</span>
            </p>
            <p className="vibe-create-post__drop-hint">
              Supports High-Res JPG, PNG, WEBP
            </p>
          </div>
        ) : (
          <div className="vibe-create-post__preview">
            <img src={previewUrl} alt="Preview" />
            <button
              type="button"
              className="vibe-create-post__remove-img"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              title="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Caption Textarea */}
        <div className="vibe-create-post__caption-field">
          <textarea
            placeholder="Write a caption, tell the story behind this vibe..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            maxLength={1000}
          />
          <div className="vibe-create-post__char-count">
            {caption.length} / 1000
          </div>
        </div>

        {/* Tag Shortcuts */}
        <div className="vibe-create-post__tags">
          <span className="vibe-create-post__tags-label">
            <Hash size={13} /> Quick tags:
          </span>
          <div className="vibe-create-post__tag-chips">
            {POPULAR_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                className="vibe-tag-chip"
                onClick={() => addTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="vibe-create-post__actions">
          <Button
            variant="ghost"
            size="md"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            disabled={!selectedFile || isSubmitting}
            leftIcon={<Sparkles size={16} />}
          >
            Publish Vibe
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
