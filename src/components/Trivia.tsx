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

  let hasFetched = false; // Plain variable to track if the API was called

  useEffect(() => {
    if (hasFetched) return; // Prevents multiple API calls
    hasFetched = true; // Mark as fetched to prevent additional calls

    const fetchTrivia = async () => {
      console.log("Fetching trivia questions...");
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
        );
        setQuestions(response.data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trivia questions.");
        setLoading(false);
      }
    };

    fetchTrivia();
  }, []); // The empty dependency array ensures this runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Trivia Questions</h1>
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
          <ul>
            {[...question.incorrect_answers, question.correct_answer]
              .sort(() => Math.random() - 0.5)
              .map((answer, i) => (
                <li key={i}>
                  <button>{answer}</button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Trivia;
