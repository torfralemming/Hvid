import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CATEGORY_WASHING_MACHINES } from '../data/questions';
import { QuestionOption } from '../types';

function WashingMachineForm() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, QuestionOption[]>>(new Map());

  const questions = CATEGORY_WASHING_MACHINES.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (option: QuestionOption) => {
    const questionId = currentQuestion.id;
    const currentSelections = selectedAnswers.get(questionId) || [];

    if (currentQuestion.multiSelect) {
      const isSelected = currentSelections.some(o => o.value === option.value);
      if (isSelected) {
        setSelectedAnswers(
          new Map(selectedAnswers).set(
            questionId,
            currentSelections.filter(o => o.value !== option.value)
          )
        );
      } else {
        setSelectedAnswers(
          new Map(selectedAnswers).set(questionId, [...currentSelections, option])
        );
      }
    } else {
      setSelectedAnswers(new Map(selectedAnswers).set(questionId, [option]));
    }
  };

  const isOptionSelected = (option: QuestionOption): boolean => {
    const currentSelections = selectedAnswers.get(currentQuestion.id) || [];
    return currentSelections.some(o => o.value === option.value);
  };

  const canProceed = (): boolean => {
    const currentSelections = selectedAnswers.get(currentQuestion.id);
    return currentSelections !== undefined && currentSelections.length > 0;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const allSelectedOptions: QuestionOption[] = [];
      selectedAnswers.forEach(options => {
        allSelectedOptions.push(...options);
      });
      navigate('/washing-machine/recommendations', {
        state: { selectedOptions: allSelectedOptions }
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-orange-600 hover:text-orange-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til kategorier
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-600">
                Spørgsmål {currentQuestionIndex + 1} af {questions.length}
              </h2>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {currentQuestion.question}
          </h1>

          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                  isOptionSelected(option)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">{option.label}</span>
                  {isOptionSelected(option) && (
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg"
            >
              Tilbage
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-orange-600 text-white py-4 px-6 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Næste <ChevronRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                'Se anbefalinger'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WashingMachineForm;
