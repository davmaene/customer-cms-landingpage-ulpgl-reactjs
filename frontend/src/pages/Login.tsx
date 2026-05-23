import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../utils/utils.colors";
import { APPNAME } from "../utils/utils.constants";
import { routes } from "../utils/utils.routes";
import { Logo } from "../components/subcomponents/Logo";
import { toast } from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

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

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setApiError("");
            try {
              const res = await login(values.email, values.password);
              console.log(res)
              navigate(routes.ADMIN);
            } catch (err: any) {
              const msg =
                err?.response?.data?.reason ||
                err?.messageText ||
                "Identifiants invalides";
              setApiError(msg);
              toast.error(msg);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: 14, }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "#333",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  Adresse email
                </label>
                <Field
                  data-testid="login-email-input"
                  name="email"
                  type="email"
                  placeholder="vous@ulpgl.net"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: `1px solid ${touched.email && errors.email ? Colors.redColor : "#d6d6d6"}`,
                    borderRadius: 6,
                    fontSize: 15,
                    outline: "none",
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-dang"
                />
              </div>

              {/* Champ Mot de passe */}
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 6,
                    color: "#333",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  Mot de passe
                </label>
                <Field
                  data-testid="login-password-input"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: `1px solid ${touched.password && errors.password ? Colors.redColor : "#d6d6d6"}`,
                    borderRadius: 6,
                    fontSize: 15,
                    outline: "none",
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-dang"
                />
              </div>

              {/* Erreur de l'API (Retour serveur) */}
              {apiError && (
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
                  {apiError}
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: Colors.primaryColor,
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>

              <div style={{ marginTop: 14, textAlign: "right" }}>
                <Link
                  to={routes.FORGOT_PASSWORD}
                  data-testid="forgot-password-link"
                  style={{
                    color: Colors.primaryColor,
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </Form>
          )}
        </Formik>

        <div style={{ marginTop: 22, textAlign: "center" }}>
          <Link
            to={routes.HOME}
            style={{ color: Colors.primaryColor, textDecoration: "none", fontSize: 14 }}
          >
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
};