import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';

/**
 * Tableau de bord administrateur
 * Interface principale pour la gestion du SMSI
 */
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalContents: 0,
    averageScore: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [usersRes, quizRes, contentsRes] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllQuizResults(),
        adminService.getAllContents()
      ]);

      setUsers(usersRes.data);
      setQuizResults(quizRes.data);
      setContents(contentsRes.data);

      // Calcul des statistiques
      const totalScore = quizRes.data.reduce((sum, result) => sum + result.score, 0);
      const averageScore = quizRes.data.length > 0 ? (totalScore / quizRes.data.length).toFixed(1) : 0;

      setStats({
        totalUsers: usersRes.data.length,
        totalQuizzes: quizRes.data.length,
        totalContents: contentsRes.data.filter(c => c.isActive).length,
        averageScore: averageScore
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir désactiver cet utilisateur ?')) {
      try {
        await adminService.deleteUser(userId);
        loadDashboardData();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteContent = async (contentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      try {
        await adminService.deleteContent(contentId);
        loadDashboardData();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
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
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <i className="fas fa-tachometer-alt me-2 text-primary"></i>
              Tableau de Bord Administrateur
            </h2>
            <span className="badge bg-success fs-6">SMSI - MENPS</span>
          </div>

          {/* Statistiques */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.totalUsers}</h4>
                      <p className="mb-0">Utilisateurs</p>
                    </div>
                    <i className="fas fa-users fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.totalQuizzes}</h4>
                      <p className="mb-0">Quiz Réalisés</p>
                    </div>
                    <i className="fas fa-clipboard-check fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.totalContents}</h4>
                      <p className="mb-0">Contenus Actifs</p>
                    </div>
                    <i className="fas fa-book fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-dark">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>{stats.averageScore}/20</h4>
                      <p className="mb-0">Score Moyen</p>
                    </div>
                    <i className="fas fa-chart-line fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-chart-pie me-2"></i>Vue d'ensemble
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <i className="fas fa-users me-2"></i>Utilisateurs
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'quiz' ? 'active' : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                <i className="fas fa-clipboard-list me-2"></i>Résultats Quiz
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'contents' ? 'active' : ''}`}
                onClick={() => setActiveTab('contents')}
              >
                <i className="fas fa-folder me-2"></i>Contenus
              </button>
            </li>
          </ul>

          {/* Contenu des onglets */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5><i className="fas fa-chart-bar me-2"></i>Activité Récente</h5>
                    </div>
                    <div className="card-body">
                      <p>Derniers quiz réalisés :</p>
                      {quizResults.slice(0, 5).map(result => (
                        <div key={result.id} className="d-flex justify-content-between border-bottom py-2">
                          <span>{result.user.nom} {result.user.prenom}</span>
                          <span className="badge bg-primary">{result.score}/{result.totalQuestions}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5><i className="fas fa-exclamation-triangle me-2"></i>Alertes SMSI</h5>
                    </div>
                    <div className="card-body">
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        Système opérationnel - Aucune alerte critique
                      </div>
                      <div className="alert alert-warning">
                        <i className="fas fa-clock me-2"></i>
                        {users.filter(u => !u.lastLogin).length} utilisateurs n'ont jamais accédé à la plateforme
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5><i className="fas fa-users me-2"></i>Gestion des Utilisateurs</h5>
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-plus me-2"></i>Nouvel Utilisateur
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Nom Complet</th>
                          <th>Email</th>
                          <th>Rôle</th>
                          <th>Académie</th>
                          <th>Statut</th>
                          <th>Dernière Connexion</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id}>
                            <td>{user.nom} {user.prenom}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>{user.academie}</td>
                            <td>
                              <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                {user.isActive ? 'Actif' : 'Inactif'}
                              </span>
                            </td>
                            <td>
                              {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Jamais'}
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-1">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="card">
                <div className="card-header">
                  <h5><i className="fas fa-clipboard-list me-2"></i>Résultats des Quiz</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Utilisateur</th>
                          <th>Score</th>
                          <th>Temps</th>
                          <th>Date</th>
                          <th>Pourcentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizResults.map(result => (
                          <tr key={result.id}>
                            <td>{result.user.nom} {result.user.prenom}</td>
                            <td>{result.score}/{result.totalQuestions}</td>
                            <td>{result.timeTaken ? `${Math.floor(result.timeTaken / 60)}min` : 'N/A'}</td>
                            <td>{new Date(result.completedAt).toLocaleDateString()}</td>
                            <td>
                              <div className="progress" style={{ height: '20px' }}>
                                <div 
                                  className={`progress-bar ${
                                    (result.score / result.totalQuestions) * 100 >= 70 ? 'bg-success' : 
                                    (result.score / result.totalQuestions) * 100 >= 50 ? 'bg-warning' : 'bg-danger'
                                  }`}
                                  style={{ width: `${(result.score / result.totalQuestions) * 100}%` }}
                                >
                                  {Math.round((result.score / result.totalQuestions) * 100)}%
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contents' && (
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5><i className="fas fa-folder me-2"></i>Gestion des Contenus</h5>
                  <button className="btn btn-success btn-sm">
                    <i className="fas fa-plus me-2"></i>Nouveau Contenu
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Type</th>
                          <th>Auteur</th>
                          <th>Date Création</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contents.map(content => (
                          <tr key={content.id}>
                            <td>{content.titre}</td>
                            <td>
                              <span className="badge bg-info">{content.type}</span>
                            </td>
                            <td>{content.author?.nom} {content.author?.prenom}</td>
                            <td>{new Date(content.createdAt).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge ${content.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                {content.isActive ? 'Actif' : 'Inactif'}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-1">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteContent(content.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;