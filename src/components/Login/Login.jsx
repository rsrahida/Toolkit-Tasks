import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "E-poçt ünvanı tələb olunur.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Düzgün e-poçt ünvanı daxil edin.";
    }
    if (!password) {
      errors.password = "Şifrə tələb olunur.";
    } else if (password.length < 6) {
      errors.password = "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const loginData = { email, password };
      dispatch(loginUser(loginData));
    }
  };

  useEffect(() => {
    if (user) {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        setEmail("");
        setPassword("");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="login-page">
      <div className="login-logo">🧸 e-Körpəm</div>
      <h2 className="login-header">Giriş et</h2>

      {successMessage && (
        <div className="popup-message">
          <p className="popup">Uğurla daxil oldunuz!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <label htmlFor="email">E-poçt</label>
          <input
            id="email"
            type="email"
            placeholder="E-poçtunuzu daxil edin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>

        <div className="login-input-group">
          <label htmlFor="password">Şifrə</label>
          <input
            id="password"
            type="password"
            placeholder="Şifrənizi daxil edin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Yüklənir..." : "Giriş"}
        </button>

        {error && <p className="login-error">{error}</p>}
        <p className="login-register-link">
          Hesabınız yoxdur? <a href="/register">Qeydiyyatdan keçin</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
