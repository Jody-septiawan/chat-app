import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../contexts/userContext"

import Message from '../Message'
import FormSendMessage from '../forms/FormSendMessage'

import {io} from 'socket.io-client'

let socket
let interval

export default function RightSide({dataUser, imgAdrien, setDataUser}) {
    const [state] = useContext(UserContext);
    const [chats, setChats] = useState([])

    const idUser = dataUser.id

    // load message
    const loadMessage = async () => {
        await socket.on('message', (data) => {
            setChats(data)
        })
    }

    useEffect(() => {
        setChats([])
        socket = io('http://localhost:5000/chat', {
                auth: {
                    token: localStorage.getItem('token')
                },
                query : {
                    id: idUser
                }
            })

        return () => {
            socket.disconnect()
        }
    }, [idUser])

    if (interval) {
        clearInterval(interval)
    }

    interval = setInterval(async ()=>{
        await loadMessage()
    },3000)

    console.log(interval)

    return (
        <>
            {dataUser.id ? 
                <>
                   <div style={{backgroundColor: "#184e79", height:"7vh"}} className="border-start border-info d-flex">
                        <div className="w-100 d-flex align-items-center px-2">
                            <img src={imgAdrien} className="rounded-circle me-2" style={{width: '35px', height: '35px'}} />
                            <span style={{color: '#ade8f4'}}>
                                {dataUser.username}
                            </span>
                        </div>
                        <div className=" d-flex align-items-center">
                           <button onClick={()=> setDataUser({})} className="btn btn-danger btn-sm mx-2">X</button>
                        </div>
                   </div>
                   <div style={{backgroundColor: "#2a6f97", height:"88vh", overflowX: 'hidden', overflowY: 'auto'}}>
                        <Message chats={chats} state={state} />
                   </div>
                   <div style={{backgroundColor: "#61a5c2", height:"5vh"}}>
                        <FormSendMessage idUser={idUser}  />
                   </div>
               </> 
            :
                <div style={{backgroundColor: '#012a4a'}} className="h-100 d-flex justify-content-center align-items-center">
                    <span className="text-light h3">No Messsages</span>
                </div>
            }
        </>
    )
}
