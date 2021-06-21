import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import MessageAuth from '../messages/MessageAuth'

export default function FormRegister() {
    const [message, setMessage] = useState({
        isSuccess: false,
        text: ''
    })

    const [form, setForm] = useState({  
        email: '',
        password: ''
    })

    const { email, password } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(email && password){
            setMessage({
                isSuccess: true,
                text: 'Register success'
            })
            console.log("Register", form)
        }else{
            setMessage({
                isSuccess: false,
                text: 'Register failed!'
            })
        }
    }

    return (
        <Form onSubmit={(e)=> handleOnSubmit(e)}>
            <MessageAuth message={message} />

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={onChange} name="email" value={email} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={onChange} name="password" value={password} type="password" placeholder="Password" />
            </Form.Group>
            
            <div className="d-grid gap-2 mt-3">
                <Button variant="primary" type="submit" size="sm">
                    Regist
                </Button>
            </div>
        </Form>
    )
}
