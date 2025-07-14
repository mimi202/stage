import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";

/**
 * Page de connexion administrateur
 * Interface dédiée pour l'accès admin avec sécurité renforcée
 */
function AdminLogin() {
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
      setErrors({ form: "Tous les champs sont obligatoires" });
      setLoading(false);
      return;
    }
    
    try {
      const data = await authService.login({ username, password });
      
      // Vérifier que l'utilisateur est bien admin
      if (data.user.role !== 'ADMIN') {
        setErrors({ form: "Accès non autorisé. Seuls les administrateurs peuvent accéder à cette interface." });
        setLoading(false);
        return;
      }
      
      // Mise à jour du store Redux
      dispatch(updateUser({ 
        username: data.user.username, 
        isAuthentificated: true,
        role: data.user.role,
        user: data.user
      }));
      
      navigate("/admin");
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

  const handleBackToUser = () => {
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow border-warning">
            <div className="card-header bg-warning text-dark text-center">
              <h4>
                <i className="fas fa-user-shield me-2"></i>
                Accès Administrateur
              </h4>
              <small>Interface réservée aux administrateurs MENPS</small>
            </div>
            <div className="card-body">
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Accès sécurisé :</strong> Cette interface est réservée aux administrateurs autorisés du système de management de la sécurité de l'information (SMSI).
              </div>
              
              <form onSubmit={handleLogin}>
                {errors.form && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {errors.form}
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-user-tie me-2"></i>Identifiant Administrateur
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    ref={usernameRef}
                    disabled={loading}
                    placeholder="Identifiant administrateur"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-key me-2"></i>Mot de passe Administrateur
                  </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    ref={passwordRef}
                    disabled={loading}
                    placeholder="Mot de passe sécurisé"
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-warning text-dark fw-bold" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Vérification...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-shield-alt me-2"></i>
                        Accéder à l'administration
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <hr />
              
              <div className="text-center">
                <button 
                  className="btn btn-outline-primary"
                  onClick={handleBackToUser}
                  disabled={loading}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Retour à la connexion utilisateur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;