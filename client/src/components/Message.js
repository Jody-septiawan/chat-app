import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../contexts/userContext"

import dataChat from '../fakeDatas/Chat'

export default function Message({chats, state}) {

    useEffect(()=>{
        window.scrollTo(0, document.getElementById('message').scrollHeight);
    },[chats])


    return (
        <div id="message">
            {chats.map((chat,index)=> (
                <div className={`my-3 d-flex ${state.user.id == chat.chatFrom.id && ' justify-content-end'}`}>
                    <div style={{backgroundColor: '#468faf50', maxWidth: '300px'}} className="px-2 py-1 position-relative rounded mx-2 mt-1">
                        <div style={{fontSize: '10px', color: '#ade8f4'}} className={`d-flex ${state.user.id == chat.chatFrom.id && ' justify-content-end text-info'}`}>
                             {state.user.id == chat.chatFrom.id ? 'you' : chat.chatFrom.username}
                         </div>
                         <div className="rounded p-2" style={{fontSize: '14px', backgroundColor: '#61a5c2', lineHeight: 1.2}}>
                             {chat.message} 
                         </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
