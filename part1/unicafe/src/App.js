import React, { useState } from 'react'
import "./App.css"

const Title = ( {text} ) => <h2>{text}</h2>
const Button = ( { onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ( {text, value}) => {
  return (
        <table>
          <tbody>
            <tr>
              <td>{text}</td>
              <td className="Val">{value}</td>
            </tr>
          </tbody>
        </table>
  )
}
const NoFeedback = () => <p>No feedback given.</p>
const Anecdote = ({ anecdote }) => <p><em>"{anecdote}"</em></p>
const Votes = ( {vote} ) => <p>{vote} votes</p>
const HighestVote = ( {value} ) => <p>{value} votes</p>
           

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [avgGood, setAvgGood] = useState(0);
  const [avgBad, setAvgBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0 , 0, 0])
  


const handleGood = () => {
  setGood(good + 1)
  setAvgGood(avgGood + 1)
  
}

const handleNeutral = () => {
  setNeutral(neutral + 1)
}

const handleBad = () => {
  setBad(bad + 1)
  setAvgBad(avgBad - 1)
}

const total = good + neutral + bad;


const handlePoints = () => {
      const tempState = [...points];
      tempState[selected] += 1;
      setPoints(tempState);
}

const max = arr => Math.max(...arr);



  return (
    <div>
      <Title text="Give feedback:"/>
      <Button onClick={handleGood} text="Good"/>
      <Button onClick={handleNeutral} text="Neutral"/>
      <Button onClick={handleBad} text="Bad"/>
      <Title text="Statistics:"/>
      {good === 0 && neutral === 0 && bad === 0 ? 
      <NoFeedback /> 
      : 
      <div>
      <StatisticLine text="Good: " value={good}/>
      <StatisticLine text="Neutral: " value={neutral}/>
      <StatisticLine text="Bad: " value={bad}/>
      <StatisticLine text="All: " value={total}/>
      <StatisticLine text="Average: " value={total === 0 ? 0 : Math.round((avgGood + avgBad)/total *10)/10}/>
      <StatisticLine text="Positive: " value={total === 0 ? 0 : `${Math.round((good/total * 100)*10)/10}%`}/>
      </div>
      }
      <Title text="Anecdote of the day:"/>
      <Anecdote anecdote={anecdotes[selected]}/>
      {points[selected] === 0 ? " " : 
      <div>
        <Votes vote={points[selected]}/>
      </div>
      }
      <Button text="Vote" onClick={handlePoints}/>
      <Button onClick={() => setSelected(Math.floor(Math.random() * (6 - 0 + 1) + 0))} text="New Anecdote"/>
      <Title text="Anecdote with most votes:"/>
      {max(points) === 0 ? "" :
      <div>
        <Anecdote anecdote={anecdotes[points.indexOf(max(points))]}/>
        <HighestVote value={max(points)}/>
      </div>
      }
    </div>
  )
}

export default App
