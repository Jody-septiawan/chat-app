import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// side
import LeftSide from '../components/side/LeftSide'
import RightSide from '../components/side/RightSide'

// img
import imgJack from '../assets/jack.jpg'
import imgAdrien from '../assets/adrienn.jpg'

export default function Chat() {

    const [ dataUser, setDataUser ] = useState({})

    return (
        <Container fluid style={{height: '100vh'}}>
           <Row >
                <Col md={3} style={{backgroundColor: "#1e6091"}} className="px-0 d-none d-md-block">
                    <LeftSide imgAdrien={imgAdrien} imgJack={imgJack} dataUser={dataUser} setDataUser={setDataUser}/>
                </Col>
                <Col md={9} style={{backgroundColor: "green", maxHeight:"100vh"}} className="px-0">
                    <RightSide dataUser={dataUser} imgAdrien={imgAdrien} setDataUser={setDataUser} />
                </Col>
           </Row>
        </Container>
    )
}
