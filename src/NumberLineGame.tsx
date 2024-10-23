import React, { useState, useEffect } from 'react';
import './App.css';
import NumberLine from './components/NumberLine';
import Sidebar from './components/Sidebar';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const NumberLineGame: React.FC = () => {
  const [position, setPosition] = useState(0); // Character starts at 0
  const [prompt, setPrompt] = useState<{ operation: string; value: number }>({ operation: 'Add', value: 0 });
  const [feedback, setFeedback] = useState('');

  // Generate random prompt that keeps character within bounds
  const generatePrompt = () => {
    let operation = Math.random() < 0.5 ? 'Add' : 'Subtract';
    let value = Math.floor(Math.random() * 21) - 10; // Random between -10 and 10

    // Ensure the move does not exceed bounds
    if (operation === 'Add' && position + value > 10) value = 10 - position;
    if (operation === 'Subtract' && position - value < -10) value = position + 10;

    setPrompt({ operation, value });
  };

  // Handle User Click on Number Line
  const handleClickPosition = (newPosition: number) => {
    // Validate movement within bounds
    if (newPosition >= -10 && newPosition <= 10) {
      setPosition(newPosition);
      checkAnswer(newPosition);
    } else {
      setFeedback('Out of bounds! Please try a different move.');
    }
  };

  // OpenAI Feedback Logic
  const checkAnswer = async (newPosition: number) => {
    const isCorrect = (prompt.operation === 'Add' && newPosition === position + prompt.value) ||
                      (prompt.operation === 'Subtract' && newPosition === position - prompt.value);
    
    let expectedPosition = (prompt.operation === 'Add') ? position + prompt.value : position - prompt.value;

    // Include the new position and correct position in the message to OpenAI
    let messageContent = isCorrect 
      ? `you are a teacher trying to teach a student the number line. Dont refer to them as "the student".The student moved to the correct position: ${newPosition}. Please explain why it was correct in a friendly tone, and offer praise. keep this under 100 words`
      : `you are a teacher trying to teach a student the number line. Dont refer to them as "the student".The student moved to position ${newPosition}, but the correct position should have been ${expectedPosition}. Please deduce the likely misunderstanding and provide a helpful hint. keep this under 200 words`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'user', content: messageContent }
        ]
      });


    //   let messageContent = isCorrect 
    //   ? `you are a teacher trying to teach a student the number line. Dont refer to them as "the student". The student performed the correct operation: ${userMoveExplanation} and moved to position ${newPosition}. Please explain why it was correct in a friendly tone, and offer praise. keep this under 100 words`
    //   : `you are a teacher trying to teach a student the number line. Dont refer to them as "the student". The student incorrectly performed: ${userMoveExplanation} and ended at position ${newPosition}, while the correct operation was: ${expectedExplanation}, which should have led to position ${correctPosition}. Try to deduce the likely misunderstanding and provide a helpful hint. keep this under 200 words`;

    // try {
    //   const completion = await openai.chat.completions.create({
    //     model: 'gpt-4o',
    //     messages: [
    //       { role: 'user', content: messageContent }
    //     ],
    //   });

      const aiFeedback = completion.choices[0].message?.content || 'Unable to generate feedback.';
      setFeedback(aiFeedback);
    } catch (error) {
      console.error("OpenAI API error:", error);
      setFeedback('There was an error retrieving feedback. Please try again.');
    }
  };

  useEffect(() => {
    generatePrompt();
  }, [position]);

  return (
    <div className="App">
      <div className="main-container">
        <Sidebar 
          question={`Tutor: Try to ${prompt.operation} ${prompt.value}.`} 
          feedback={`Tutor: ${feedback}`} 
        />
        <div className="game-area">
          <h1>Number Line Game</h1>
          <NumberLine position={position} onClickPosition={handleClickPosition} />
        </div>
      </div>
    </div>
  );
};

export default NumberLineGame;
