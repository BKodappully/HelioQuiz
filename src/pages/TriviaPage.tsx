import React from "react";
import Trivia from "../components/Trivia";

const TriviaPage: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h1 className="card-title mb-4">Trivia Game</h1>
              <p className="text-muted mb-4">
                Test your knowledge! Answer questions and see how well you score.
              </p>
              <Trivia />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaPage;
