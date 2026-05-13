import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { APPNAME, APPOWNER } from "../../utils/utils.constants";
import { Colors } from "../../utils/utils.colors";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";

const FiLockIcon = FiLock as any;
const FiMailIcon = FiMail as any;
const FiEyeIcon = FiEye as any;
const FiEyeOffIcon = FiEyeOff as any;

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo" style={{ backgroundColor: Colors.primaryColor }}>
              <FiLockIcon size={28} color="#fff" />
            </div>
            <h2 className="login-title">{APPNAME}</h2>
            <p className="login-subtitle">{APPOWNER}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <h5 className="login-form-title">Connexion au tableau de bord</h5>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <div className="login-field">
              <label className="login-label">Adresse email</label>
              <div className="login-input-wrapper">
                <FiMailIcon size={18} className="login-input-icon" />
                <input
                  type="email"
                  className="login-input"
                  placeholder="admin@ulpgl.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label">Mot de passe</label>
              <div className="login-input-wrapper">
                <FiLockIcon size={18} className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Entrer votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOffIcon size={18} /> : <FiEyeIcon size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
              style={{ backgroundColor: Colors.primaryColor }}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                "Se connecter"
              )}
            </button>

            <div className="login-footer-text">
              <a href="/" className="login-back-link">
                &larr; Retour au site
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
