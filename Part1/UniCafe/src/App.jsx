import { useState } from "react";

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Stats = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / total;
  const positive = (props.good / total) * 100 + " %";

  return (
    <>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (buttonName) => {
    switch (buttonName) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button name="good" handleClick={() => handleClick("good")} />
      <Button name="neutral" handleClick={() => handleClick("neutral")} />
      <Button name="bad" handleClick={() => handleClick("bad")} />
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
