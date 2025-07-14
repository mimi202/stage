import { useDispatch, useSelector } from "react-redux";
import {
  onChooseAnswer,
  nextQuestion,
  onValidate,
  resetQuiz,
} from "../redux/MySlice";
import { useNavigate } from "react-router-dom";
import { quizService } from "../services/api";
import { useState } from "react";

export default function Quiz() {
  const state = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const isQuizFinished = state.isQuizFinished;
  const score = state.user.score;
  const currentQuestionIndex = state.currentQuestionIndex;
  const currentQuestion = state.questions[currentQuestionIndex];
  const options = currentQuestion.options;
  const isValidate = currentQuestion.isValidate;
  const selectedOption = currentQuestion.selectedOption;
  const navigate = useNavigate();

  const handlValidate = (currentQuestionIndex) => {
    dispatch(onValidate(currentQuestionIndex));
  };
  
  const handleReplay = () => {
    dispatch(resetQuiz());
    navigate("/quiz");
  };

  const handleOptionClick = (opId) => {
    dispatch(onChooseAnswer({ opId, currentQuestionIndex }));
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex === state.questions.length - 1) {
      // Dernier question - sauvegarder le résultat
      await saveQuizResult();
    }
    dispatch(nextQuestion());
  };
  
  const saveQuizResult = async () => {
    try {
      setSaving(true);
      const resultData = {
        score: score,
        totalQuestions: state.questions.length,
        timeTaken: null, // Vous pouvez ajouter un timer si nécessaire
        details: JSON.stringify({
          questions: state.questions.map(q => ({
            id: q.id,
            selectedAnswers: q.selectedOption,
            correctAnswers: q.correctAnswers,
            isCorrect: q.selectedOption.length === q.correctAnswers.length &&
                      q.selectedOption.every(id => q.correctAnswers.includes(id))
          }))
        })
      };
      
      await quizService.saveResult(resultData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du résultat:', error);
    } finally {
      setSaving(false);
    }
  };

  if (isQuizFinished) {
    return (
      <div
        style={{
          paddingTop: "50px",
          textAlign: "center",
          backgroundColor: "#F4F0E3",
          minHeight: "400px",
          borderRadius: "10px",
          padding: "30px"
        }}
      >
        <div className="card shadow-lg">
          <div className="card-header bg-success text-white">
            <h2><i className="fas fa-trophy me-2"></i>Quiz Terminé !</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="text-center mb-4">
                  <div className="display-4 mb-3">
                    {score > 15 ? (
                      <i className="fas fa-medal text-warning"></i>
                    ) : score > 10 ? (
                      <i className="fas fa-thumbs-up text-success"></i>
                    ) : (
                      <i className="fas fa-redo text-info"></i>
                    )}
                  </div>
                  <h3 className="mb-3">
                    Votre score : <span className="text-primary fw-bold">{score}/{state.questions.length}</span>
                  </h3>
                  <div className="progress mb-3" style={{ height: '30px' }}>
                    <div 
                      className={`progress-bar ${
                        (score / state.questions.length) * 100 >= 70 ? 'bg-success' : 
                        (score / state.questions.length) * 100 >= 50 ? 'bg-warning' : 'bg-danger'
                      }`}
                      style={{ width: `${(score / state.questions.length) * 100}%` }}
                    >
                      {Math.round((score / state.questions.length) * 100)}%
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-info">
                  <h5>
                    <i className="fas fa-chart-line me-2"></i>
                    Évaluation de votre niveau
                  </h5>
                  {score >= 16 ? (
                    <p className="mb-0">
                      <strong>Excellent !</strong> Vous maîtrisez très bien les concepts de cybersécurité.
                    </p>
                  ) : score >= 12 ? (
                    <p className="mb-0">
                      <strong>Bien !</strong> Vous avez de bonnes bases, continuez à vous former.
                    </p>
                  ) : score >= 8 ? (
                    <p className="mb-0">
                      <strong>Moyen.</strong> Il est recommandé de revoir les ressources pédagogiques.
                    </p>
                  ) : (
                    <p className="mb-0">
                      <strong>À améliorer.</strong> Consultez nos ressources et refaites le quiz.
                    </p>
                  )}
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    onClick={handleReplay}
                    className="btn btn-primary me-md-2"
                    disabled={saving}
                  >
                    <i className="fas fa-redo me-2"></i>
                    Refaire le quiz
                  </button>
                  <button
                    onClick={() => navigate('/resources')}
                    className="btn btn-success"
                  >
                    <i className="fas fa-book me-2"></i>
                    Consulter les ressources
                  </button>
                </div>
                
                {saving && (
                  <div className="mt-3">
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Sauvegarde en cours...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>
              <i className="fas fa-shield-alt me-2 text-primary"></i>
              Quiz de Cybersécurité
            </h1>
            <div className="badge bg-info fs-6">
              Question {state.currentQuestionIndex + 1}/{state.questions.length}
            </div>
          </div>
        </div>
      </div>
      
      <div
        className="card shadow"
        style={{
          minHeight: "500px"
        }}
      >
        <div className="card-header bg-primary text-white">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="mb-0">
                Question {state.currentQuestionIndex + 1} sur {state.questions.length}
              </h5>
            </div>
            <div className="col-md-4">
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-warning" 
                  style={{ width: `${((state.currentQuestionIndex + 1) / state.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-body p-4">
          <h4 className="mb-4 text-dark">
            {state.questions[state.currentQuestionIndex].text}
          </h4>

          <div className="row">
            <div className="col-md-10 offset-md-1">
              {options.map((op) => {
                let buttonClass = "btn btn-outline-secondary";
                let iconClass = "";
                
                if (isValidate) {
                  if (currentQuestion.correctAnswers.includes(op.id)) {
                    buttonClass = "btn btn-success";
                    iconClass = "fas fa-check me-2";
                  } else if (selectedOption.includes(op.id)) {
                    buttonClass = "btn btn-danger";
                    iconClass = "fas fa-times me-2";
                  }
                } else if (selectedOption.includes(op.id)) {
                  buttonClass = "btn btn-primary";
                  iconClass = "fas fa-check me-2";
                }

                return (
                  <div key={op.id} className="mb-3">
                    <button
                      className={`${buttonClass} w-100 text-start p-3`}
                      disabled={isValidate}
                      onClick={() => handleOptionClick(op.id)}
                      style={{ minHeight: '60px' }}
                    >
                      <i className={iconClass}></i>
                      {op.text}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="card-footer bg-light">
          <div className="row">
            <div className="col-md-6">
              <button
                onClick={() => handlValidate(currentQuestionIndex)}
                className="btn btn-warning w-100"
                disabled={selectedOption.length === 0 || isValidate}
              >
                <i className="fas fa-check-circle me-2"></i>
                {isValidate ? 'Réponse validée' : 'Valider ma réponse'}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary w-100"
                onClick={() => handleNextQuestion()}
                disabled={!isValidate || selectedOption.length === 0}
              >
                {currentQuestionIndex === state.questions.length - 1 ? (
                  <>
                    <i className="fas fa-flag-checkered me-2"></i>
                    Terminer le quiz
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-right me-2"></i>
                    Question suivante
                  </>
                )}
              </button>
            </div>
          </div>
          
          {saving && (
            <div className="text-center mt-3">
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Sauvegarde en cours...
            </div>
          )}
        </div>
      </div>
      
      {/* Aide contextuelle */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="alert alert-info">
            <i className="fas fa-lightbulb me-2"></i>
            <strong>Conseil :</strong> Prenez le temps de bien lire chaque question. 
            Certaines questions peuvent avoir plusieurs bonnes réponses.
          </div>
        </div>
      </div>
    </div>
  );
}
