cd quiz-app
git init
https://github.com/Antroooo/Interactive-Quiz-Application
git add .
git commit -m "Antroooo"
git branch -M main
git push -u origin main

import React, { useState } from 'react';

const quizData = [
 {
  question: "Who won the ICC Men's Cricket World Cup 2023?",
  options: ["India", "Australia", "England", "New Zealand"],
  answer: "Australia",
},
{
  question: "Who was the highest run-scorer in the ICC World Cup 2023?",
  options: ["Virat Kohli", "David Warner", "Rohit Sharma", "Babar Azam"],
  answer: "Virat Kohli",
},
{
  question: "Which country will host the ICC Champions Trophy 2025?",
  options: ["India", "England", "Pakistan", "Australia"],
  answer: "Pakistan",
},
{
  question: "Who is the current captain of the Indian men's T20 team (2024)?",
  options: ["Rohit Sharma", "Hardik Pandya", "KL Rahul", "Shubman Gill"],
  answer: "Hardik Pandya",
},
{
  question: "Which IPL team won the 2024 Indian Premier League?",
  options: ["Chennai Super Kings", "Kolkata Knight Riders", "Mumbai Indians", "Rajasthan Royals"],
  answer: "Chennai Super Kings",
},

];

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNext = () => {
    const correctAnswer = quizData[currentQuestion].answer;
    const isAnswerCorrect = selectedOption === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect. The correct answer was "${correctAnswer}".`);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
        setFeedback('');
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowScore(false);
    setFeedback('');
    setIsCorrect(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Interactive Quiz 🌟</h1>
      {showScore ? (
        <div style={styles.scoreBox}>
          <h2 style={styles.finalScore}>🎉 Your Score: {score} / {quizData.length}</h2>
          <button onClick={handleRestart} style={{ ...styles.button, backgroundColor: '#6366f1', color: 'white' }}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div style={styles.quizBox}>
          <h3 style={styles.question}>{quizData[currentQuestion].question}</h3>
          <div>
            {quizData[currentQuestion].options.map((option, index) => (
              <label key={index} style={styles.option}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  style={styles.radio}
                />
                {option}
              </label>
            ))}
          </div>
          <p style={styles.progress}>Question {currentQuestion + 1} of {quizData.length}</p>
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            style={{
              ...styles.button,
              backgroundColor: selectedOption ? '#10b981' : '#a5b4fc',
              color: 'white',
            }}
          >
            Next
          </button>
          {feedback && (
            <p style={{
              ...styles.feedback,
              color: isCorrect ? '#16a34a' : '#dc2626',
              backgroundColor: isCorrect ? '#d1fae5' : '#fee2e2',
            }}>
              {feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Segoe UI", sans-serif',
    textAlign: 'center',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: '36px',
    color: '#4f46e5',
    marginBottom: '30px',
  },
  quizBox: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  question: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#111827',
  },
  option: {
    display: 'block',
    textAlign: 'left',
    padding: '10px 15px',
    borderRadius: '10px',
    backgroundColor: '#f3f4f6',
    margin: '8px 0',
    cursor: 'pointer',
    fontSize: '16px',
  },
  radio: {
    marginRight: '10px',
  },
  button: {
    padding: '10px 25px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    marginTop: '20px',
    cursor: 'pointer',
  },
  feedback: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '10px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  scoreBox: {
    backgroundColor: '#ecfeff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  finalScore: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#0f172a',
  },
  progress: {
    marginTop: '15px',
    color: '#6b7280',
    fontStyle: 'italic',
  },
};

export default QuizApp;
