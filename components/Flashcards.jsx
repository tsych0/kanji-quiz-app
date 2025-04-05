// components/Flashcards.js
"use client";

import React, { useState } from 'react';

const Flashcards = ({ flashcardItems, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    if (!flashcardItems || flashcardItems.length === 0) {
        return (
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">No flashcards available for the selected range.</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                    Back to Settings
                </button>
            </div>
        );
    }

    const currentItem = flashcardItems[currentIndex];

    const handleNext = () => {
        if (currentIndex < flashcardItems.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowDetails(false); // Reset flip state for the new card
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setShowDetails(false); // Reset flip state for the new card
        }
    };

    const handleFlip = () => {
        setShowDetails(prev => !prev);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Navigation and Close */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                    Card {currentIndex + 1} of {flashcardItems.length}
                </p>
                <button onClick={onClose} className="text-sm text-red-600 hover:text-red-800 font-medium">
                    Close Flashcards
                </button>
            </div>



            {/* Flashcard Content - Added key to force re-render on index change */}
            <div key={currentIndex} className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-md mb-6 h-80 flex flex-col justify-center items-center shadow-inner min-h-[300px] cursor-pointer select-none border border-gray-200 dark:border-gray-700" onClick={handleFlip}>
                {!showDetails ? (
                    <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-md mb-6 text-center">
                        <h2 className="text-8xl font-bold text-indigo-800 dark:text-indigo-300"> {/* Adjusted Kanji color */}
                            {currentItem['Kanji/Radical']}
                        </h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">(Click to reveal details)</p> </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-indigo-900 dark:text-indigo-200 overflow-auto p-2"> {/* Adjusted text color */}
                        <h3 className="text-xl font-semibold mb-2">Hindi Meaning:</h3>
                        <p className="text-lg mb-4">{currentItem['Hindi Meaning/Concept']}</p>
                        <h3 className="text-xl font-semibold mb-2">Readings:</h3>
                        <p className="text-md text-gray-700 dark:text-gray-300">{currentItem['Readings (Hiragana/Katakana)']}</p>
                        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">(Click to hide details)</p>
                    </div>
                )}
            </div>

            {/* Flip Button (Alternative to clicking the card) */}
            {/* <button
            onClick={handleFlip}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out mb-4"
        >
            {showDetails ? 'Hide Details' : 'Show Details'}
        </button> */}


            {/* Prev/Next Buttons */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex === flashcardItems.length - 1}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Flashcards;