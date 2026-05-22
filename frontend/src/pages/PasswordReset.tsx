import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";
import { Colors } from "../utils/utils.colors";
import { APPNAME } from "../utils/utils.constants";
import { routes } from "../utils/utils.routes";
import { Logo } from "../components/subcomponents/Logo";
import { toast } from "react-toastify";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiPost("/auth/forgot-password", { email });
      setSent(true);
      if (res.devLink) setDevLink(res.devLink);
      toast.success("Si ce compte existe, un email vient d'être envoyé.");
    } catch (err: any) {
      toast.error(err?.response?.data?.reason || err?.messageText || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="forgot-password-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${Colors.primaryColor} 0%, #001a3f 100%)`,
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 460, width: "100%", background: "white", padding: "44px 36px", borderRadius: 10, boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <Logo />
        </div>
        <h2 style={{ color: Colors.primaryColor, fontWeight: 700, fontSize: 24, textAlign: "center", marginBottom: 4 }}>
          Mot de passe oublié
        </h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: 24, fontSize: 14 }}>
          {APPNAME} — Saisissez votre email pour recevoir un lien de réinitialisation
        </p>

        {sent ? (
          <div data-testid="forgot-success" style={{ background: "#d4edda", color: "#155724", padding: 16, borderRadius: 6, fontSize: 14 }}>
            ✓ Si un compte existe avec cet email, vous allez recevoir un lien.
            {devLink && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.1)", fontSize: 12 }}>
                <b>Mode dev :</b> SendGrid non configuré — utilisez ce lien :
                <br />
                <a href={devLink} style={{ color: Colors.primaryColor, wordBreak: "break-all" }}>{devLink}</a>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              data-testid="forgot-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@ulpgl.net"
              style={{ width: "100%", padding: "12px 14px", border: "1px solid #d6d6d6", borderRadius: 6, fontSize: 15, marginBottom: 16 }}
            />
            <button
              data-testid="forgot-submit-button"
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px", background: Colors.primaryColor, color: "white",
                border: "none", borderRadius: 6, fontSize: 16, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
          </form>
        )}

        <div style={{ marginTop: 22, textAlign: "center" }}>
          <Link to={routes.LOGIN} style={{ color: Colors.primaryColor, textDecoration: "none", fontSize: 14 }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ResetPassword: React.FC = () => {
  const [params] = React.useState(() => new URLSearchParams(window.location.search));
  const token = params.get("token") || "";
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.warn("Mot de passe trop court (min 6)");
    if (password !== confirm) return toast.warn("Les mots de passe ne correspondent pas");
    setLoading(true);
    try {
      await apiPost("/auth/reset-password", { token, password });
      toast.success("Mot de passe réinitialisé. Connectez-vous.");
      navigate(routes.LOGIN);
    } catch (err: any) {
      toast.error(err?.response?.data?.reason || err?.messageText || "Lien invalide ou expiré");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="reset-password-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${Colors.primaryColor} 0%, #001a3f 100%)`,
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 460, width: "100%", background: "white", padding: "44px 36px", borderRadius: 10, boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <Logo />
        </div>
        <h2 style={{ color: Colors.primaryColor, fontWeight: 700, fontSize: 24, textAlign: "center", marginBottom: 24 }}>
          Nouveau mot de passe
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            data-testid="reset-password-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #d6d6d6", borderRadius: 6, fontSize: 15, marginBottom: 12 }}
          />
          <input
            data-testid="reset-confirm-input"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmer le mot de passe"
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #d6d6d6", borderRadius: 6, fontSize: 15, marginBottom: 16 }}
          />
          <button
            data-testid="reset-submit-button"
            type="submit"
            disabled={loading || !token}
            style={{
              width: "100%", padding: "13px", background: Colors.primaryColor, color: "white",
              border: "none", borderRadius: 6, fontSize: 16, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Mise à jour..." : "Réinitialiser"}
          </button>
        </form>
        {!token && <p style={{ color: Colors.redColor, fontSize: 13, textAlign: "center", marginTop: 14 }}>Token manquant dans l'URL.</p>}
      </div>
    </div>
  );
};
