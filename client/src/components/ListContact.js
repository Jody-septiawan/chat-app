import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../contexts/userContext"


import {io} from 'socket.io-client';

let socket

export default function ListContact({imgAdrien, setDataUser, dataUser}) {
    const [state, dispatch] = useContext(UserContext);
    const [users, setUsers] = useState([])

    // Load data with socket
    const loadUsers = async (socket) => {
        await socket.emit('load users')
        await socket.on('users', (data) => {

            // data = data.map(item => {return item.id != state.user.id && item})
            data = data.filter(item => {return item.id != state.user.id})
            setUsers(data);
        })
    }

    useEffect(() => {
        // server domain/url
        socket = io('http://localhost:5000/chat',{
            auth: {
                token: localStorage.getItem('token')
            }
        })
        loadUsers(socket);

        return () => {
            socket.disconnect()
        }
    }, []);

    const getMessageById = (id) => {
        const data = users.find(item => item.id == id)
        setDataUser(data)
    }

    return (
        <div>
            {users?.map((item,index) => (
                <div className="px-2 py-3 contact" className={`px-2 py-3 contact ${dataUser?.to?.id == item?.id && 'contactIsActive'}`} onClick={()=>getMessageById(item.id)}>
                    <img src={imgAdrien} className="rounded-circle me-2" style={{width: '35px', height: '35px'}} />
                    <span style={{color: '#ade8f4'}}>
                        {item.username}
                    </span>
                </div>
            ))}
        </div>
    )
}
