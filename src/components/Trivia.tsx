import React, { useState, useEffect } from "react";
import axios from "axios";

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Trivia: React.FC = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  let hasFetched = false; // Plain variable to track if the API was called

  const fetchTrivia = async () => {
    if (hasFetched) return; // Prevent additional API calls
    hasFetched = true; // Mark as fetched to prevent multiple calls

    setLoading(true);
    setError(null);
    try {
      console.log("Fetching trivia questions...");
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
      );
      setQuestions(response.data.results);
      setScore(0); // Reset score
      setAnsweredQuestions(0); // Reset answered questions
      setGameOver(false); // Reset game state
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch trivia questions.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrivia(); // Fetch questions on initial render
  }, []); // The empty dependency array ensures this runs once on mount

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
    }
    if (answeredQuestions + 1 === questions.length) {
      setGameOver(true); // End the game if all questions are answered
    }
    setAnsweredQuestions((prev) => prev + 1); // Move to the next question
  };

  const handlePlayAgain = () => {
    hasFetched = false; // Reset the fetch tracker
    fetchTrivia(); // Fetch new trivia questions
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container">
      {/* Score Display */}
      <div className="position-fixed top-0 end-0 m-3 bg-light border rounded shadow p-2">
        <strong>Score: {score}</strong>
      </div>

      {!gameOver &&
        questions.slice(0, answeredQuestions + 1).map((question, index) => (
          <div key={index} className="mb-4">
            <h5
              className="text-primary"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
            <div className="row">
              {[...question.incorrect_answers, question.correct_answer]
                .sort(() => Math.random() - 0.5) // Shuffle answers
                .map((answer, i) => (
                  <div key={i} className="col-md-6">
                    <button
                      className="btn btn-outline-primary w-100 mb-2"
                      onClick={() =>
                        handleAnswer(answer === question.correct_answer)
                      }
                      disabled={answeredQuestions > index} // Disable buttons after answering
                    >
                      {answer}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}

      {/* Game Over Message */}
      {gameOver && (
        <div className="text-center mt-4">
          <div
            className="card shadow-lg p-4 border-0 game-over"
            style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}
          >
            <h1 className="text-primary fw-bold" style={{ fontSize: "3rem" }}>
              Game Over!
            </h1>
            <p
              className="text-primary fw-bold mt-3"
              style={{ fontSize: "1.5rem" }}
            >
              Your final score is: <span className="text-primary">{score}</span>
            </p>
            <button
              className="btn btn-lg btn-primary mt-4"
              onClick={handlePlayAgain}
            >
              Play Trivia Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trivia;
