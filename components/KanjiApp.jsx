// components/KanjiApp.js
"use client";

import React, { useState } from 'react';
import { kanjiData, shuffleArray } from '../lib/kanjiData';
import KanjiQuiz from './KanjiQuiz';
import Flashcards from './Flashcards';
import ThemeSwitcher from './ThemeSwitcher';

const KanjiApp = () => {
    const [view, setView] = useState('settings'); // 'settings', 'quiz', 'flashcards'
    const [startIndex, setStartIndex] = useState(1);
    const [endIndex, setEndIndex] = useState(10);
    const [activeItems, setActiveItems] = useState([]); // Holds items for quiz OR flashcards
    const [error, setError] = useState('');
    const maxIndex = kanjiData.length;

    const handleRangeChange = (e, type) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value)) return;

        if (type === 'start') {
            setStartIndex(value);
        } else {
            setEndIndex(value);
        }
        setError('');
    };

    const validateAndPrepareItems = () => {
        setError('');
        if (startIndex < 1 || endIndex < 1 || startIndex > maxIndex || endIndex > maxIndex) {
            setError(`Indices must be between 1 and ${maxIndex}.`);
            return null;
        }
        if (startIndex > endIndex) {
            setError('Start index cannot be greater than end index.');
            return null;
        }

        const zeroBasedStart = startIndex - 1;
        const zeroBasedEnd = endIndex;
        const selectedKanji = kanjiData.slice(zeroBasedStart, zeroBasedEnd);

        if (selectedKanji.length === 0) {
            setError('Selected range contains no Kanji.');
            return null;
        }
        return selectedKanji;
    }

    const handleStartQuiz = () => {
        const items = validateAndPrepareItems();
        if (items) {
            setActiveItems(shuffleArray([...items])); // Shuffle for quiz
            setView('quiz');
        }
    };

    const handleStartFlashcards = () => {
        const items = validateAndPrepareItems();
        if (items) {
            setActiveItems([...items]); // No shuffle needed for flashcards typically
            setView('flashcards');
        }
    };

    const handleCloseActivity = () => {
        setView('settings');
        setActiveItems([]); // Clear items when returning to settings
    };

    // --- Render Logic ---
    const renderContent = () => {
        switch (view) {
            case 'quiz':
                return <KanjiQuiz quizItems={activeItems} onClose={handleCloseActivity} />;
            case 'flashcards':
                return <Flashcards flashcardItems={activeItems} onClose={handleCloseActivity} />;
            case 'settings':
            default:
                return (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Activity</h2>
                        {/* Range Selection Inputs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <label htmlFor="start-index" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Kanji (1-{maxIndex})
                                </label>
                                <input
                                    type="number"
                                    id="start-index"
                                    min="1"
                                    max={maxIndex}
                                    value={startIndex}
                                    onChange={(e) => handleRangeChange(e, 'start')}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="end-index" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Kanji (1-{maxIndex})
                                </label>
                                <input
                                    type="number"
                                    id="end-index"
                                    min="1"
                                    max={maxIndex}
                                    value={endIndex}
                                    onChange={(e) => handleRangeChange(e, 'end')}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-600 dark:text-red-400 text-sm mb-4 text-center">{error}</p>}
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleStartFlashcards}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Study Flashcards
                            </button>
                            <button
                                onClick={handleStartQuiz}
                                className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Start MCQ Quiz
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Kanji Study Tool</h1>
            <ThemeSwitcher /> {/* <-- Add the switcher here */}
            {renderContent()}
        </div>
    );
};

export default KanjiApp;