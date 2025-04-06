import React, { useState } from 'react'
import { Button } from '@mui/material';

//function to handle the questions
// it should take in 2 props, question and answerSelected
function TriviaQuestions({ question, answerSelected }) {

    //we should have our consts for selectedAns
    const [selectedAns, setSelectedAns] = useState(null);
    const [answered, setAnswered] = useState(false);

    //we need to handle when an answer is selected and see if it is correct
    const handleAnswerSelected = (answer) => {
        setSelectedAns(answer);
        setAnswered(true);
        answerSelected(answer === question.correctAnswer);
    }

    //now we perform the return where we can have shuffled answers not to make it obvious
    // the user will get feedbck regarding if they chose the correct answer or not
    return (
        <div className="question">
            <p>{question.question.text}</p>
            {[question.correctAnswer, ...question.incorrectAnswers].sort().map((answer, index) => (
                <Button className="myButton"
                    key={index}
                    variant="contained"
                    color={
                        answered
                            ? answer === question.correctAnswer
                                ? 'success'
                                : answer === selectedAns
                                    ? 'error'
                                    : 'primary'
                            : 'primary'
                    }
                    onClick={() => !answered && handleAnswerSelected(answer)}
                >
                    {answer}
                </Button>
            ))}
        </div>
    );
}


export default TriviaQuestions;


