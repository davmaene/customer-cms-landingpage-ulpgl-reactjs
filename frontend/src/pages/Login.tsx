import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../utils/utils.colors";
import { APPNAME } from "../utils/utils.constants";
import { routes } from "../utils/utils.routes";
import { Logo } from "../components/subcomponents/Logo";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Connexion réussie");
      navigate(routes.ADMIN);
    } catch (err: any) {
      const msg = err?.response?.data?.reason || err?.messageText || "Identifiants invalides";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${Colors.primaryColor} 0%, #001a3f 100%)`,
        padding: "40px 20px",
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: 460,
          background: "white",
          padding: "44px 36px",
          borderRadius: 10,
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Logo />
        </div>
        <h2
          style={{
            color: Colors.primaryColor,
            fontWeight: 700,
            fontSize: 26,
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Espace administrateur
        </h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: 26, fontSize: 14 }}>
          {APPNAME} — Tableau de bord de publication
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", marginBottom: 6, color: "#333", fontWeight: 500, fontSize: 14 }}>
              Adresse email
            </label>
            <input
              data-testid="login-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@ulpgl.net"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: 6,
                fontSize: 15,
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6, color: "#333", fontWeight: 500, fontSize: 14 }}>
              Mot de passe
            </label>
            <input
              data-testid="login-password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: 6,
                fontSize: 15,
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div
              data-testid="login-error"
              style={{
                background: "#fde2e2",
                color: "#a31515",
                padding: "10px 14px",
                borderRadius: 6,
                marginBottom: 16,
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: Colors.primaryColor,
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div style={{ marginTop: 14, textAlign: "right" }}>
            <Link to={routes.FORGOT_PASSWORD} data-testid="forgot-password-link" style={{ color: Colors.primaryColor, textDecoration: "none", fontSize: 13 }}>
              Mot de passe oublié ?
            </Link>
          </div>
        </form>

        <div style={{ marginTop: 22, textAlign: "center" }}>
          <Link to={routes.HOME} style={{ color: Colors.primaryColor, textDecoration: "none", fontSize: 14 }}>
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
};
