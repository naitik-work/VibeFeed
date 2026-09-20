import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Sparkles, User, Mail, Lock, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import ThemeToggle from '../../../components/ui/ThemeToggle';
import { useToast } from '../../../context/ToastContext';
import '../style/form.scss';

export const Register = () => {
  const { handleRegister, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const { success } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!username.trim()) {
      setFormError('Please choose a username.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    const defaultAvatar = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`;

    const result = await handleRegister(
      username.trim(),
      email.trim(),
      password,
      bio.trim() || 'Visual storyteller & creator on VibeFeed.',
      defaultAvatar
    );

    if (result.success) {
      success(`Account created! Welcome to VibeFeed, @${username}!`);
      navigate('/');
    } else {
      setFormError(result.message);
    }
  };

  return (
    <div className="vibe-auth-page">
      <div className="vibe-auth-container">
        {/* Left Editorial Visual Pane */}
        <div className="vibe-auth-editorial">
          <div className="vibe-auth-editorial__brand">
            <div className="vibe-auth-editorial__icon">
              <Sparkles size={24} />
            </div>
            <span>VibeFeed</span>
          </div>

          <div className="vibe-auth-editorial__content">
            <span className="vibe-auth-editorial__tag">Join the Community</span>
            <h2>Claim your stage. Share your vision.</h2>
            <p>
              Publish high-fidelity photography, join design discussions, and build
              a loyal creative following with minimal distractions.
            </p>
          </div>

          <div className="vibe-auth-editorial__footer">
            <span>&copy; {new Date().getFullYear()} VibeFeed Network</span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="vibe-auth-card">
          <div className="vibe-auth-card__header">
            <div className="vibe-auth-card__top-bar">
              <div className="vibe-auth-card__logo-mobile">
                <Sparkles size={18} />
                <span>VibeFeed</span>
              </div>
              <ThemeToggle isCompact />
            </div>

            <h1 className="vibe-auth-card__title">Create Creator Account</h1>
            <p className="vibe-auth-card__subtitle">
              Join thousands of visual artists and tastemakers
            </p>
          </div>

          {formError && (
            <div className="vibe-auth-alert" role="alert">
              <AlertCircle size={18} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="vibe-auth-form" noValidate>
            <Input
              id="reg-username"
              label="Username"
              type="text"
              placeholder="e.g. nova_creative"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User size={18} />}
              required
            />

            <Input
              id="reg-email"
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />

            <Input
              id="reg-password"
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={18} />}
              required
            />

            <Input
              id="reg-bio"
              label="Creator Bio (Optional)"
              type="text"
              placeholder="Describe your aesthetic or creative focus..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              leftIcon={<FileText size={18} />}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              rightIcon={<ArrowRight size={18} />}
              className="vibe-auth-submit"
            >
              Create Account
            </Button>
          </form>

          <div className="vibe-auth-card__footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="vibe-auth-card__link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
