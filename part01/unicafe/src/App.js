import { useState } from 'react'

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
        <div>
          good {good}
          <br />
          neutral {neutral}
          <br />
          bad {bad}
          <br />
          all {all}
          <br />
          average {average}
          <br />
          positive {positive}
          <br />
        </div>
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
      <div>
        <button onClick={handleButtonClick} value="good">
          good
        </button>
        <button onClick={handleButtonClick} value="neutral">
          neutral
        </button>
        <button onClick={handleButtonClick} value="bad">
          bad
        </button>
      </div>
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
