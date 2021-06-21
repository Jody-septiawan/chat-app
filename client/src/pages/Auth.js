import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

import FormLogin from '../components/forms/FormLogin'
import FormRegister from '../components/forms/FormRegister'

export default function Auth() {
    const [ isRegis, setIsRegis ] = useState(false)

    const moveAuth = () => {
        setIsRegis(!isRegis)
    }

    return (
        <div style={{height: '100vh'}} className="d-flex justify-content-center align-items-center bg-auth">
            <Card style={{width: '380px'}} className="card-dark">
                <Card.Header className="text-center"  variant="transparent">
                    {isRegis ? 'Register' : 'Login' }
                </Card.Header>
                <Card.Body>
                {isRegis ? 
                <FormRegister /> 
                : 
                <FormLogin /> }
                </Card.Body>
                <Card.Footer className="text-muted text-center btn-auth">
                    {isRegis ? (
                       <small>Sudah punya akun?<Button onClick={()=> moveAuth()} className="p-0 ms-2" variant="link" size="sm">Login</Button></small> 
                    ) : <small>Belum punya akun?<Button onClick={()=> moveAuth()} className="p-0 ms-2" variant="link" size="sm">Register</Button></small> }
                </Card.Footer>
            </Card>
        </div>
    )
}
