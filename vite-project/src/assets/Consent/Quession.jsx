import { useEffect, useState } from "react";
import { decode } from "html-entities";
import EachQuestion from "./EachQuestion";
import PicutreDisplayHtml from "./PicutreDisplayHtml";
import "./Quession.css";

const Quession = () => {
  const [allquestion, setquestion] = useState([]);
  const [totalcount, setCount] = useState(0);
  const [btnClik, setbtnvalue] = useState(false);

  useEffect(() => {
    gettingdata().then((data) => setquestion(data));
  }, []);

  useEffect(() => {
    let count = 0;
    if (allquestion?.length > 1) {
      for (const data of allquestion) {
        const ans = data.correctAnswer;
        for (const each of data.multipleanswers) {
          if (each.click === true) {
            if (each.name === ans) {
              count++;
            }
          }
        }
      }
    }
    setCount(count);
  }, [allquestion]);

  async function gettingdata() {
    const url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
    const getPromise = await fetch(url);
    const response = await getPromise.json();

    return response?.results?.map(
      ({ question, correct_answer, incorrect_answers } = {}, i) => {
        
        const allans = (data) => {
          return data?.sort().map((mul) => {
            return {
              name: mul,
              click: false,
            };
          });
        };

        return {
          index: i + 1,
          in_click: false,
          question: decode(question, { level: "html5" }),
          correctAnswer: correct_answer,
          multipleanswers: allans([correct_answer, ...incorrect_answers]),
        };
      }
    );
  }

  const QuestionRender =
    allquestion.length > 1 &&
    allquestion?.map((question) => {
      {
        const { index } = question;
        return (
          <EachQuestion
            key={index}
            question={question}
            handlerClick={Answerhandler}
            btnchangevalue={btnClik}
          />
        );
      }
    });

  function Answerhandler(text, index) {
    setquestion((prev) =>
      prev.map((eachquesitem) => {
        return eachquesitem.index === index
          ? {
              ...eachquesitem,
              multipleanswers: eachquesitem.multipleanswers.map((eachans) => {
                return eachans.name === text
                  ? {
                      ...eachans,
                      click: !eachans.click,
                    }
                  : eachans;
              }),
            }
          : eachquesitem;
      })
    );
  }

  function handlerbtnChecker() {
    if (btnClik === true) {
      gettingdata().then((data) => setquestion(data));
      setbtnvalue(false);
    } else {
      setbtnvalue((prev) => !prev);
    }
  }

  return allquestion.length === 0 ? (
    <h1>comming ...</h1>
  ) : (
    <div>
      <PicutreDisplayHtml />
      <div className="main--question--div">{QuestionRender}</div>
      <div className="button-main-css">
        {btnClik && (
          <p className="result--text">
            Your total score is {totalcount} / {allquestion?.length}
          </p>
        )}
        <button className="check--button" onClick={handlerbtnChecker}>
          {btnClik ? "Play Again" : "Check answers"}
        </button>
      </div>
    </div>
  );
};

export default Quession;
