import { useState } from "react";

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const Stats = (props) => {
  return (
    <p>
      {props.name} {props.total}
    </p>
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
      <Stats name="good" total={good} />
      <Stats name="neutral" total={neutral} />
      <Stats name="bad" total={bad} />
    </div>
  );
};

export default App;
