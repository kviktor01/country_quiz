import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import image from "../undraw_winners_ao2o 2.svg";
export default function EndScreen({answerCount,correctAnswerCount,isEnd,isSurvival}) {
    useEffect(()=>{
        if(!isEnd) {
            navigate("/");
        }
    },[])
    console.log(answerCount,correctAnswerCount);
    const navigate=useNavigate();
    
  return (
    <div className="quiz-container">
			
				<>
					<div className="quiz-header">
						<h1>Country quiz</h1>
					</div>

					<div className="winner-body">
            <div>
                        <img src={image} alt=""></img>
                        <h1>Results</h1>
                        <span className="answers"> You got <span className="answer-count">{correctAnswerCount}</span> correct answers</span>
                        {!isSurvival ? <span className="answers">You got <span className="fail-answer-count">{answerCount-correctAnswerCount}</span>fail answers</span> : ""}
            </div>
            <div>
              
            </div>
					</div>

				</>
			
			
		</div>
  )
}
