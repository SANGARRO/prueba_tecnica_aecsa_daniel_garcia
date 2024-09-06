/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userExists, setUserExists] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState({
    usuario: "",
    celular: "",
    ciudad: "",
  });
  const [verificationFailed, setVerificationFailed] = useState(false);
  const router = useRouter();

  const checkUser = async () => {
    if (!email.trim()) {
      setError("Por favor, ingrese un correo electrónico.");
      return;
    }

    try {
      const response = await axios.get("/api/usuarios", {
        params: { correo: email },
      });

      if (response.data.exists) {
        setUserExists(true);
        setError("");
        setShowRegisterForm(false);
      } else {
        setUserExists(false);
        setError("");
        setShowRegisterForm(true);
      }
    } catch (err) {
      console.error("Error checking user:", err);
      setError("Error al verificar el usuario. Inténtelo nuevamente.");
    }
  };

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      setError("Por favor, ingrese el código de verificación.");
      return;
    }

    try {
      const response = await axios.get("/api/usuarios", {
        params: { correo: email, codigoValidacion: verificationCode },
      });

      if (response.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));

        setError("");
        setVerificationFailed(false);
        router.push("/principal");
      } else {
        setError(
          "El código de verificación es incorrecto. Inténtelo nuevamente."
        );
        setVerificationFailed(true);
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError("Hubo un error en la verificación. Inténtelo nuevamente.");
      setVerificationFailed(true);
    }
  };

  const handleRegister = async () => {
    if (!userData.usuario.trim() || !verificationCode.trim() || !email.trim()) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post("/api/usuarios", {
        usuario: userData.usuario,
        codigoValidacion: verificationCode,
        correo: email,
        celular: userData.celular,
        ciudad: userData.ciudad,
      });

      if (response.status === 201) {
        setError("");
        setSuccessMessage("Usuario registrado exitosamente");

        setTimeout(() => {
          setSuccessMessage("");
          setEmail("");
          setVerificationCode("");
          setUserData({ usuario: "", celular: "", ciudad: "" });
          setShowRegisterForm(false);
          setUserExists(null);
        }, 1500);
      } else {
        setError("No se pudo registrar el usuario.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Error al registrar el usuario. Inténtelo nuevamente.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img
            src="https://entersite.co/wp-content/uploads/2023/01/Aecsa-Logo.png"
            alt="Aecsa Logo"
            style={{
              width: "300px",
              height: "auto",
              display: "block",
              margin: "auto",
              marginBottom: "20px",
            }}
          />

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {error && !showRegisterForm && (
            <div className="alert alert-danger">{error}</div>
          )}
          {!showRegisterForm && (
            <div className="card p-4 shadow-sm">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={checkUser}
                  >
                    Check User
                  </button>
                </form>
              </div>
            </div>
          )}
          {userExists === true && (
            <div className="card p-4 shadow-sm mt-4">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="verificationCode" className="form-label">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter verification code"
                    />
                  </div>
                  {verificationFailed && (
                    <div className="alert alert-danger">
                      El código de verificación es incorrecto. Inténtelo de
                      nuevo.
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleVerify}
                  >
                    Verify
                  </button>
                </form>
              </div>
            </div>
          )}
          {showRegisterForm && (
            <div className="card p-4 shadow-sm mt-4">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="usuario" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="usuario"
                      value={userData.usuario}
                      onChange={(e) =>
                        setUserData({ ...userData, usuario: e.target.value })
                      }
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="verificationCode" className="form-label">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter verification code"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="celular" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="celular"
                      value={userData.celular}
                      onChange={(e) =>
                        setUserData({ ...userData, celular: e.target.value })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ciudad"
                      value={userData.ciudad}
                      onChange={(e) =>
                        setUserData({ ...userData, ciudad: e.target.value })
                      }
                      placeholder="Enter city"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
