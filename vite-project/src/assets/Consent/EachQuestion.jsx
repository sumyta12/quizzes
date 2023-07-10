const EachQuestion = (props) => {
  const {
    index,
    question,
    correctAnswer,
    multipleanswers = [],
  } = props?.question || {};
  // correctAnswer,

  const stylevalue = !props.btnchangevalue ? ["#D6DBF5", ""] : ["#F8BCBC", "#94D7A2"];

  const multipleChoice = multipleanswers.map((choice) => (
    <h1
      key={choice.name}
      className="answers--text"
      style={
        choice.click
          ? { background: stylevalue[0] }
          : { background: stylevalue[1] }
      }
      onClick={() => props.handlerClick(choice.name, index)}>
      {choice.name}
    </h1>
  ));
  const options =
    props.btnchangevalue === true &&
    multipleanswers.map((choice) => {
      if (choice.name === correctAnswer) {
        return (
          <h1
            key={choice.name}
            className="answers--text"
            style={{ background: stylevalue[1] }}>
            {choice.name}
          </h1>
        );
      } else {
        return (
          <h1
            key={choice.name}
            className="answers--text"
            style={{ background: stylevalue[0] }}>
            {choice.name}
          </h1>
        );
      }
    });

  return (
    <div className="question--div">
      <h1 className="question--text">{question}</h1>
      <div className="all--question--display">
        {" "}
        {props.btnchangevalue ? options : multipleChoice}
      </div>
    </div>
  );
};

export default EachQuestion;
