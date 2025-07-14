import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    
    if (!username || !password) {
      setErrors({ form: "Remplir tous les champs" });
      setLoading(false);
      return;
    }
    
    try {
      const data = await authService.login({ username, password });
      
      // Mise à jour du store Redux
      dispatch(updateUser({ 
        username: data.user.username, 
        isAuthentificated: true,
        role: data.user.role,
        user: data.user
      }));
      
      // Redirection selon le rôle
      if (data.user.role === 'ADMIN') {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      if (error.response?.data) {
        setErrors({ form: error.response.data });
      } else {
        setErrors({ form: "Erreur de connexion au serveur" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4><i className="fas fa-sign-in-alt me-2"></i>Connexion Utilisateur</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                {errors.form && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {errors.form}
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-user me-2"></i>Nom d'utilisateur ou Email
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    ref={usernameRef}
                    disabled={loading}
                    placeholder="Entrez votre nom d'utilisateur ou email"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-lock me-2"></i>Mot de passe
                  </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    ref={passwordRef}
                    disabled={loading}
                    placeholder="Entrez votre mot de passe"
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-primary" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Connexion...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Se connecter
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <hr />
              
              <div className="text-center">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={handleAdminLogin}
                  disabled={loading}
                >
                  <i className="fas fa-user-shield me-2"></i>
                  Accès Administrateur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
