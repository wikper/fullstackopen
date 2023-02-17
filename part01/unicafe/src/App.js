import { useState } from 'react'

const Button = ({ value, onClick }) => {
  return (
    <button onClick={onClick} value={value}>
      {value}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({
  good,
  neutral,
  bad,
  all,
  averageScore,
  positiveCount,
}) => {
  const average = all === 0 ? '0' : averageScore / all
  const positive = all === 0 ? '0' : `${(positiveCount / all) * 100} %`

  return (
    <div>
      <h2>statistics</h2>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [positiveCount, setPositiveCount] = useState(0)

  const handleButtonClick = (event) => {
    const value = event.target.value

    switch (value) {
      case 'good':
        setGood(good + 1)
        setAll(all + 1)
        setAverageScore(averageScore + 1)
        setPositiveCount(positiveCount + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        setAll(all + 1)
        break
      case 'bad':
        setBad(bad + 1)
        setAll(all + 1)
        setAverageScore(averageScore - 1)
        break
      default:
        break
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button value="good" onClick={handleButtonClick} />
      <Button value="neutral" onClick={handleButtonClick} />
      <Button value="bad" onClick={handleButtonClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        averageScore={averageScore}
        positiveCount={positiveCount}
      />
    </div>
  )
}

export default App
