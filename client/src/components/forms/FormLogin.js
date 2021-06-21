import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'

import { API, setAuthToken } from '../../config/api'

// Contexts
import { UserContext } from "../../contexts/userContext"

import MessageAuth from '../messages/MessageAuth'

export default function FormLogin() {
    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState({
        isSuccess: false,
        text: ''
    })

    const [form, setForm] = useState({  
        username: '',
        password: ''
    })

    const { username, password } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault()

                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                }

                const body = JSON.stringify({
                    username,
                    password
                })

                const response = await API.post("/login", body, config)

                

                if(response.data.status == 'Failed'){
                    setMessage({
                        isSuccess: false,
                        text: response.data.message
                    })
                }else{
                    setMessage({
                        isSuccess: true,
                        text: 'Login success'
                    })

                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: response.data.data.user
                    })
                }

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <Form  onSubmit={(e)=> handleOnSubmit(e)}>
            <MessageAuth message={message} />

            <Form.Group className="mb-3" controlId="formBasicusername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={onChange} name="username" value={username} type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={onChange} name="password" value={password} type="password" placeholder="Password" />
            </Form.Group>
            
            <div className="d-grid gap-2 mt-3">
                <Button variant="primary" type="submit" size="sm">
                    Sign in
                </Button>
            </div>
        </Form>
    )
}
