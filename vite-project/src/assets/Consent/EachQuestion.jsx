const EachQuestion = (props) => {
  const { index, question, multipleanswers = [] } = props?.question || {};

  //   const style = {
  //     backgroundColor: click ? "#D6DBF5" : "",
  //   };

  const multipleChoice = multipleanswers.map((choice) => (
    <h1
      key={choice.name}
      className="answers--text"
      style={choice.click ? { background: "#D6DBF5" } : { background: "" }}
      onClick={() => props.handlerClick(choice.name, index)}>
      {choice.name}
    </h1>
  ));
  
  return (
    <div className="question--div">
      <h1 className="question--text">{question}</h1>
      <div className="all--question--display">{multipleChoice}</div>
    </div>
  );
};

export default EachQuestion;
