import {Fragment, useState} from "react";

const StatisticLine = (props) => {
  const {text, value, end} = props
  return (
    <tr>
      <td>{text}</td>
      <tr>{value} {end}</tr>
    </tr>
  )
}
const Statistics = (props) => {
  const { good, neutral, bad } = props
  return (
    <Fragment>
      <h2>statistics</h2>
      {good + neutral + bad ? (
        <div>
          <table>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine
              text="statistics"
              value={good / (good + neutral + bad)}
              end="%"
            />
          </table>
        </div>
      ) : (
        <div>No feedback given</div>
      )}
    </Fragment>
  )
}
const StatisticsApp = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default StatisticsApp;