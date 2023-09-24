const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Total = ({ sum }) => (
  <p>
    <b>total of {sum} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
