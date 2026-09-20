import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Sparkles, User, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import ThemeToggle from '../../../components/ui/ThemeToggle';
import { useToast } from '../../../context/ToastContext';
import '../style/form.scss';

export const Login = () => {
  const { handleLogin, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const { success } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!username.trim() || !password) {
      setFormError('Please enter both your username and password.');
      return;
    }

    const result = await handleLogin(username.trim(), password);
    if (result.success) {
      success(`Welcome back, @${username}!`);
      navigate('/');
    } else {
      setFormError(result.message);
    }
  };

  const handleDemoLogin = async () => {
    setUsername('alex_creator');
    setPassword('VibeFeed2026!');
    setFormError(null);
    const result = await handleLogin('alex_creator', 'VibeFeed2026!');
    if (result.success) {
      success('Logged in as demo creator!');
      navigate('/');
    } else {
      // If demo account doesn't exist on backend, auto-register or sign in
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
            <span className="vibe-auth-editorial__tag">Creator Collective</span>
            <h2>Where visual aesthetics meet community.</h2>
            <p>
              Connect with visionary photographers, digital artists, and creators.
              Curate your portfolio and inspire thousands daily.
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

            <h1 className="vibe-auth-card__title">Welcome Back</h1>
            <p className="vibe-auth-card__subtitle">
              Enter your credentials to access your creator studio
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
              id="login-username"
              label="Username or Email"
              type="text"
              placeholder="e.g. alex_creator"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User size={18} />}
              required
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={18} />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              rightIcon={<ArrowRight size={18} />}
              className="vibe-auth-submit"
            >
              Sign In to VibeFeed
            </Button>
          </form>

          {/* Quick Demo Fill Button */}
          <div className="vibe-auth-demo">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDemoLogin}
              disabled={loading}
              className="vibe-auth-demo__btn"
            >
              Quick Demo Fill
            </Button>
          </div>

          <div className="vibe-auth-card__footer">
            <p>
              New to VibeFeed?{' '}
              <Link to="/register" className="vibe-auth-card__link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
