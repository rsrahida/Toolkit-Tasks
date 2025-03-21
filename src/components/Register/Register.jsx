import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Ad daxil edilməlidir.";
    if (!surname) errors.surname = "Soyad daxil edilməlidir.";
    if (!phone || !/^\d{10}$/.test(phone))
      errors.phone = "Mobil nömrə düzgün deyil!";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errors.email = "Düzgün e-poçt adresi daxil edin!";
    if (!password || password.length < 6)
      errors.password = "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";
    if (!termsAccepted) errors.terms = "Şərtləri qəbul etməlisiniz.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = { name, surname, email, phone, password };
      dispatch(registerUser(userData));
      setName("");
      setSurname("");
      setPhone("");
      setEmail("");
      setPassword("");
      setTermsAccepted(false);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 1000);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="logo">🧸 e-Körpəm</div>
        <h2 className="register-title">Yeni hesab yaradın</h2>
        <p className="register-subtitle">
          Korpem.az ailesinə qoşulun və unikal endirimlər, yeni kolleksiyalar və
          fərdi təkliflərdən faydalanın.
        </p>

        {successMessage && (
          <div className="popup-message">
            <p className="popup">Siz uğurla qeydiyyatdan keçdiniz!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Ad</label>
            <input
              type="text"
              id="name"
              placeholder="Adınızı daxil edin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p className="error-message">{formErrors.name}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="surname">Soyad</label>
            <input
              type="text"
              id="surname"
              placeholder="Soyadınızı daxil edin"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {formErrors.surname && (
              <p className="error-message">{formErrors.surname}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="phone">Mobil nömrə</label>
            <input
              type="text"
              id="phone"
              placeholder="Mobil nömrənizi daxil edin"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {formErrors.phone && (
              <p className="error-message">{formErrors.phone}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">E-poçt</label>
            <input
              type="email"
              id="email"
              placeholder="E-poçtunuzu daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Şifrə</label>
            <input
              type="password"
              id="password"
              placeholder="Şifrənizi daxil edin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className="error-message">{formErrors.password}</p>
            )}
          </div>

          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms">Şərtləri və qaydaları qəbul edirəm</label>
            {formErrors.terms && (
              <p className="error-message">{formErrors.terms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !termsAccepted}
            className="register-btn"
          >
            {loading ? "Yüklənir..." : "Qeydiyyatdan Keç"}
          </button>
          {error && <p className="error-message">{error}</p>}
          <p className="login-link">
            Artıq hesabınız var? <a href="/login">Giriş et</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
