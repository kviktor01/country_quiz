import React from 'react'
import { useSelector } from 'react-redux'
import { getIsLogin } from '../state/AuthSlice'

export default function Mode({type,text,onClick, survival}) {
  const isLogin =useSelector(getIsLogin);
  return (
    <div className="mode">
        <h2>{type} Mode</h2>
        <p>{text}</p>
        {(survival && isLogin) || ! survival  ?<button onClick={onClick}>Start</button>:""}
    </div>
  )
}
