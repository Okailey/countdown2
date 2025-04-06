import React, { useEffect, useState } from 'react'
import './App.css'
import TriviaQuestions from './components/TriviaQuestions';
import { Button } from '@mui/material';
import './styles/AnswerButton.css'

function App() {

  const [theCorrectAnswers, setTheCorrectAnswers] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://the-trivia-api.com/v2/questions"

  //we will use useEffect to get the data using async
  // the first questions will show and then when we click on the new question button, a new fetch is made
  // useEffect(() => {
  const fetchData = async () => {
    try {
      // setLoading(true);
      //get the data from the API
      const response = await fetch(API_URL);

      // Check if the response status is OK (status 200)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // wait for the response but present it in a json format
      const result = await response.json();
      console.log(result);

      // update the state of the result with the fetched data
      setData(result);
      setLoading(false);
    }

    // handle errors if something goes wrong
    //if data has been fetched or there is an error, loading will be false.
    //  Loading occurs when we are trying to get the data and it is working
    catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //after trying and catching we can actually fetch the data
  //   fetchData();
  // }, []);

  // Function to handle fetching new questions
  const handleNewQuestions = () => {
    setLoading(true);
    setTheCorrectAnswers(0)
    fetchData();
  };

  //function to handle the count of questions answered so we can display
  const countAnsSelected = (isCorrect) => {
    if (isCorrect) {
      setTheCorrectAnswers((theCorrectAnswers) => theCorrectAnswers + 1);
    }

  };


  //now if it is getting the data for us, we can display something to the user
  if (loading) {
    return (
      <> <p> Hold on a second... </p> </>
    );
  }


  //after it all, we can return 
  return (
    <div>
      <h1> Trivia Questions</h1>
      <Button className="newQuestionButton"
        variant="outlined"
        color="primary"
        onClick={handleNewQuestions}
      >
        New Questions
      </Button>

      {/* Display the number of correct answers */}
      <h3>Number of Correct Answers: {theCorrectAnswers}</h3>


      {data.map((question, index) => (
        <TriviaQuestions
          key={index}
          question={question}
          answerSelected={countAnsSelected}
        />
      ))}
    </div>
  );
}

export default App
