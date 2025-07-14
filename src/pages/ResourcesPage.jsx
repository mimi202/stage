import React, { useState, useEffect } from 'react';
import { contentService } from '../services/api';

/**
 * Page des ressources pédagogiques
 * Accessible aux utilisateurs authentifiés
 */
function ResourcesPage() {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const contentTypes = {
    ALL: 'Tous',
    ARTICLE: 'Articles',
    PDF: 'Documents PDF',
    VIDEO: 'Vidéos',
    LIEN: 'Liens',
    DOCUMENT: 'Documents'
  };

  useEffect(() => {
    loadContents();
  }, []);

  useEffect(() => {
    filterContents();
  }, [contents, selectedType, searchTerm]);

  const loadContents = async () => {
    try {
      setLoading(true);
      const response = await contentService.getAllContents();
      setContents(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des contenus:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContents = () => {
    let filtered = contents;

    // Filtrer par type
    if (selectedType !== 'ALL') {
      filtered = filtered.filter(content => content.type === selectedType);
    }

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (content.description && content.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredContents(filtered);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await contentService.searchContents(searchTerm);
        setFilteredContents(response.data);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      }
    } else {
      filterContents();
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ARTICLE': return 'fas fa-newspaper';
      case 'PDF': return 'fas fa-file-pdf';
      case 'VIDEO': return 'fas fa-video';
      case 'LIEN': return 'fas fa-link';
      case 'DOCUMENT': return 'fas fa-file-alt';
      default: return 'fas fa-file';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ARTICLE': return 'primary';
      case 'PDF': return 'danger';
      case 'VIDEO': return 'success';
      case 'LIEN': return 'info';
      case 'DOCUMENT': return 'warning';
      default: return 'secondary';
    }
  };

  const handleDownload = (content) => {
    if (content.fileUrl) {
      // Si c'est un fichier local
      if (content.fileUrl.startsWith('/uploads/')) {
        window.open(`http://localhost:8080${content.fileUrl}`, '_blank');
      } else {
        // Si c'est un lien externe
        window.open(content.fileUrl, '_blank');
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="fas fa-book me-2 text-primary"></i>
            Ressources Pédagogiques
          </h2>
          <p className="text-muted mb-4">
            Découvrez nos contenus de sensibilisation à la cybersécurité conformes aux standards SMSI
          </p>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="row mb-4">
        <div className="col-md-8">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher dans les ressources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {Object.entries(contentTypes).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            <strong>{filteredContents.length}</strong> ressource(s) disponible(s)
            {selectedType !== 'ALL' && ` dans la catégorie "${contentTypes[selectedType]}"`}
          </div>
        </div>
      </div>

      {/* Liste des contenus */}
      <div className="row">
        {filteredContents.length === 0 ? (
          <div className="col-12">
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">Aucune ressource trouvée</h4>
              <p className="text-muted">Essayez de modifier vos critères de recherche</p>
            </div>
          </div>
        ) : (
          filteredContents.map(content => (
            <div key={content.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className={`badge bg-${getTypeColor(content.type)}`}>
                    <i className={`${getTypeIcon(content.type)} me-1`}></i>
                    {content.type}
                  </span>
                  <small className="text-muted">
                    {new Date(content.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{content.titre}</h5>
                  <p className="card-text text-muted">
                    {content.description ? 
                      (content.description.length > 100 ? 
                        content.description.substring(0, 100) + '...' : 
                        content.description
                      ) : 
                      'Aucune description disponible'
                    }
                  </p>
                  {content.author && (
                    <small className="text-muted">
                      <i className="fas fa-user me-1"></i>
                      Par {content.author.nom} {content.author.prenom}
                    </small>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownload(content)}
                      disabled={!content.fileUrl}
                    >
                      <i className="fas fa-download me-1"></i>
                      {content.type === 'LIEN' ? 'Ouvrir' : 'Télécharger'}
                    </button>
                    {content.fileSize && (
                      <small className="text-muted">
                        {(content.fileSize / 1024 / 1024).toFixed(2)} MB
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message de sécurité */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="alert alert-warning">
            <i className="fas fa-shield-alt me-2"></i>
            <strong>Sécurité :</strong> Tous les contenus sont vérifiés et conformes aux politiques de sécurité du MENPS. 
            En cas de problème, contactez l'administrateur système.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;