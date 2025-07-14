import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { userService, quizService } from "../services/api";
import { updateUser } from "../redux/MySlice";

function Profile() {
  const user = useSelector((state) => state.quiz.user);
  const [profile, setProfile] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [stats, setStats] = useState({ averageScore: 0, totalQuizzes: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [profileRes, historyRes, statsRes] = await Promise.all([
        userService.getProfile(),
        quizService.getMyHistory(),
        quizService.getMyStats()
      ]);

      setProfile(profileRes.data);
      setQuizHistory(historyRes.data);
      setStats(statsRes.data);
      setEditForm(profileRes.data);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.updateProfile(editForm);
      setProfile(response.data);
      setEditing(false);
      
      // Mettre à jour le store Redux
      dispatch(updateUser({ user: response.data }));
      
      alert('Profil mis à jour avec succès');
    } catch (error) {
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    try {
      await userService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      alert('Mot de passe modifié avec succès');
    } catch (error) {
      alert(error.response?.data || 'Erreur lors du changement de mot de passe');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-user me-2 text-primary"></i>
            Mon Profil
          </h2>
        </div>
      </div>

      <div className="row">
        {/* Informations personnelles */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5><i className="fas fa-id-card me-2"></i>Informations Personnelles</h5>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => setEditing(!editing)}
              >
                <i className={`fas ${editing ? 'fa-times' : 'fa-edit'} me-2`}></i>
                {editing ? 'Annuler' : 'Modifier'}
              </button>
            </div>
            <div className="card-body">
              {editing ? (
                <form onSubmit={handleEditProfile}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.nom || ''}
                        onChange={(e) => setEditForm({...editForm, nom: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.prenom || ''}
                        onChange={(e) => setEditForm({...editForm, prenom: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Genre</label>
                      <select
                        className="form-control"
                        value={editForm.genre || ''}
                        onChange={(e) => setEditForm({...editForm, genre: e.target.value})}
                      >
                        <option value="">Sélectionner</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Académie</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.academie || ''}
                        onChange={(e) => setEditForm({...editForm, academie: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Département</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.departement || ''}
                        onChange={(e) => setEditForm({...editForm, departement: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Responsabilité</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.responsabilite || ''}
                      onChange={(e) => setEditForm({...editForm, responsabilite: e.target.value})}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save me-2"></i>Enregistrer
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setEditing(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Nom :</strong> {profile?.nom}</p>
                    <p><strong>Prénom :</strong> {profile?.prenom}</p>
                    <p><strong>Email :</strong> {profile?.email}</p>
                    <p><strong>Genre :</strong> {profile?.genre || 'Non spécifié'}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Académie :</strong> {profile?.academie || 'Non spécifiée'}</p>
                    <p><strong>Département :</strong> {profile?.departement || 'Non spécifié'}</p>
                    <p><strong>Responsabilité :</strong> {profile?.responsabilite || 'Non spécifiée'}</p>
                    <p><strong>Rôle :</strong> 
                      <span className={`badge ms-2 ${profile?.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                        {profile?.role}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Changement de mot de passe */}
          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5><i className="fas fa-lock me-2"></i>Sécurité</h5>
              <button 
                className="btn btn-outline-warning btn-sm"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                <i className="fas fa-key me-2"></i>
                Changer le mot de passe
              </button>
            </div>
            {showPasswordForm && (
              <div className="card-body">
                <form onSubmit={handleChangePassword}>
                  <div className="mb-3">
                    <label className="form-label">Mot de passe actuel</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nouveau mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      required
                      minLength="6"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-warning">
                      <i className="fas fa-key me-2"></i>Changer le mot de passe
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowPasswordForm(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques et historique */}
        <div className="col-md-4">
          {/* Statistiques */}
          <div className="card">
            <div className="card-header">
              <h5><i className="fas fa-chart-bar me-2"></i>Mes Statistiques</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <h3 className="text-primary">{stats.averageScore.toFixed(1)}/20</h3>
                <p className="text-muted">Score moyen</p>
              </div>
              <div className="text-center">
                <h4 className="text-success">{stats.totalQuizzes}</h4>
                <p className="text-muted">Quiz réalisés</p>
              </div>
            </div>
          </div>

          {/* Historique récent */}
          <div className="card mt-3">
            <div className="card-header">
              <h5><i className="fas fa-history me-2"></i>Historique Récent</h5>
            </div>
            <div className="card-body">
              {quizHistory.length === 0 ? (
                <p className="text-muted text-center">Aucun quiz réalisé</p>
              ) : (
                <div className="list-group list-group-flush">
                  {quizHistory.slice(0, 5).map(result => (
                    <div key={result.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div>
                        <small className="text-muted">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </small>
                      </div>
                      <span className={`badge ${
                        (result.score / result.totalQuestions) * 100 >= 70 ? 'bg-success' : 
                        (result.score / result.totalQuestions) * 100 >= 50 ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {result.score}/{result.totalQuestions}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

