import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Mode from '../components/Mode'

import { getIsLogin} from '../state/AuthSlice';

export default function ModePage({setIsSurvival}) {
  useEffect(() => {
    setIsSurvival(false);
  },[]); 
  
  const navigate=useNavigate();
  const isLogin=useSelector(getIsLogin);
  //const userData = useSelector(getUserData);
  const normalModeClick=()=>{
    navigate("/game/normal");
  }
  const survivalModeClick=()=>{
    if(isLogin) {
      navigate("game/survival");
    }
  }
  let mode1="Normal"
  let text1="The questions continuously appears. The game end when you hit the End button. Then you see the results"
  let mode2="Survival"
  let text2="The questions continuously appears. The game end when you add a wrong answer. This mode have a ranking"
  return (
    <div className="mode-container">
        <Mode type={mode1} text={text1} onClick={normalModeClick}/>
        <Mode type={mode2} text={text2} onClick={survivalModeClick} survival={true}/>
    </div>
  )
}
