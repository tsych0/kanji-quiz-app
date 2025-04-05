// components/KanjiQuiz.js
"use client";

import React, { useState, useEffect } from 'react';
import { generateMcqOptions } from '../lib/kanjiData'; // Removed kanjiData, shuffleArray (handled by parent)

// Added onClose prop
const KanjiQuiz = ({ quizItems, onClose }) => {
    // Removed state: startIndex, endIndex, error (moved to parent)
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    // Removed: maxIndex, isQuizActive (implied by component rendering)

    // Initialize first question's options on mount or when quizItems change
    useEffect(() => {
        if (quizItems && quizItems.length > 0) {
            const options = generateMcqOptions(quizItems[0], quizItems); // Generate options from the passed items
            setCurrentOptions(options);
            setScore({ correct: 0, total: 0 }); // Reset score when items change
            setCurrentItemIndex(0);
            setSelectedOption(null);
            setFeedback({ message: '', type: '' });
            setShowResult(false);
        } else {
            setCurrentOptions([]); // Handle empty quizItems case
        }
    }, [quizItems]); // Depend on quizItems

    // Removed: handleRangeChange, startQuiz (handled by parent)

    const handleOptionSelect = (option) => {
        if (showResult) return;

        setSelectedOption(option);
        const currentItem = quizItems[currentItemIndex];
        const correctAnswer = currentItem['Hindi Meaning/Concept'].trim();
        const possibleAnswers = correctAnswer;

        if (possibleAnswers.includes(option.trim())) {
            setFeedback({ message: 'Correct!', type: 'correct' });
            setScore(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
            nextQuestion();
        } else {
            setFeedback({ message: `Incorrect. Correct: ${correctAnswer}`, type: 'incorrect' });
            setScore(prev => ({ ...prev, total: prev.total + 1 }));
            setShowResult(true);
        }
    };

    const nextQuestion = () => {
        if (currentItemIndex < quizItems.length - 1) {
            const nextIndex = currentItemIndex + 1;
            setCurrentItemIndex(nextIndex);
            const options = generateMcqOptions(quizItems[nextIndex], quizItems); // Pass quizItems for distractor pool
            setCurrentOptions(options);
            setSelectedOption(null);
            setFeedback({ message: '', type: '' });
            setShowResult(false);
        } else {
            // End of quiz - call onClose passed from parent
            onClose();
        }
    };

    // stopQuiz now just calls onClose
    const stopQuiz = () => {
        onClose();
    }

    // Added check for empty quizItems early
    if (!quizItems || quizItems.length === 0 || currentItemIndex >= quizItems.length) {
        return (
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">Loading quiz or no items selected.</p>
                <button onClick={onClose} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">Back</button>
            </div>
        );
    }

    const currentItem = quizItems[currentItemIndex];
    const correctAnswerForHighlight = currentItem['Hindi Meaning/Concept'];

    const getButtonClass = (option) => {
        // Base classes with dark mode variants
        let baseClass = "w-full text-left p-3 border border-gray-300 dark:border-gray-600 rounded-md transition duration-150 ease-in-out mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800";

        if (!showResult) {
            // Normal state
            return `${baseClass} bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-indigo-400 dark:focus:ring-indigo-500 text-gray-900 dark:text-gray-100`;
        } else {
            // Result state
            const isCorrect = correctAnswerForHighlight.trim().includes(option.trim());
            const isSelected = selectedOption === option;

            if (isCorrect) {
                // Correct answer styling
                return `${baseClass} bg-green-200 dark:bg-green-700 dark:bg-opacity-40 text-green-800 dark:text-green-200 border-green-400 dark:border-green-600 cursor-not-allowed font-medium`;
            } else if (isSelected && !isCorrect) {
                // Incorrectly selected answer styling
                return `${baseClass} bg-red-200 dark:bg-red-700 dark:bg-opacity-40 text-red-800 dark:text-red-200 border-red-400 dark:border-red-600 cursor-not-allowed`;
            } else {
                // Unselected, incorrect options styling
                return `${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed`;
            }
        }
    };

    return (
        // --- QUIZ VIEW (UI structure remains similar, logic depends on props) ---
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Progress and Stop Button */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                    Question {currentItemIndex + 1} of {quizItems.length}
                </p>
                <p className="text-sm font-semibold text-indigo-700">
                    Score: {score.correct} / {score.total}
                </p>
                <button onClick={stopQuiz} className="text-sm text-red-600 hover:text-red-800 font-medium">
                    Stop Quiz
                </button>
            </div>

            {/* Kanji Display */}
            <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-md mb-6 text-center">
                <h2 className="text-8xl font-bold text-gray-800 dark:text-gray-100 select-none">
                    {currentItem['Kanji/Radical']}
                </h2>
            </div>

            {/* Options Buttons */}
            <div className="space-y-2 mb-4">
                <p className="text-lg font-medium text-gray-700 text-center mb-3">
                    Select the Hindi Meaning:
                </p>
                {currentOptions.map((option, index) => (
                    <button
                        key={`${currentItemIndex}-${index}`} // More robust key
                        onClick={() => handleOptionSelect(option)}
                        disabled={showResult}
                        className={getButtonClass(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            {showResult && (
                <button
                    onClick={nextQuestion}
                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {currentItemIndex < quizItems.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
        </div>
    );
};

export default KanjiQuiz;