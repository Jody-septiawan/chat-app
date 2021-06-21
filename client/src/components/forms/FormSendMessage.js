import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../contexts/userContext"

import {io} from 'socket.io-client';

let socket
export default function FormSendMessage({ idUser }) {
    const [state] = useContext(UserContext);

    const [message,setMessage] = useState({text: ''})

    const { text } = message

    useEffect(() => {
        socket = io('http://localhost:5000/chat', {
                auth: {
                    token: localStorage.getItem('token')
                }
            })
        
        return () => {
            socket.disconnect()
        }
    }, [])


    const onChange = (e) => {
        setMessage({
            ...message,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = {
                idUserFrom: state.user.id,
                idUserTo: idUser,
                message: message.text
            }

            await socket.emit('add message', data)

            setMessage({text: ''})

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e) => handleOnSubmit(e)} id="form">
            <div className="d-flex px-1 pt-1">
                <div className="px-1 w-100">
                    <input type="text" id="input" onChange={onChange} name="text" value={text} className="rounded-pill input-message" placeholder="Write here ..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="px-1 flex-shrink-1 d-flex align-items-center">
                    <button type="submit" className="btn btn-primary btn-sm rounded-pill" id="button-send">
                        send
                    </button>
                </div>
            </div>
        </form>
    )
}
