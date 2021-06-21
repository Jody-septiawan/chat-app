import { useContext } from 'react';
import { UserContext } from "../../contexts/userContext"

import ListContact from '../ListContact'

export default function LeftSide({imgAdrien, imgJack, setDataUser, dataUser}) {
    const [state, dispatch] = useContext(UserContext);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
    }

    return (
        <>
            <div style={{backgroundColor: "#184e77", height: '7vh'}} className="d-flex justify-item-center p-2">
                <div>
                    <img src={imgJack} style={{width: '35px', height: '35px'}} className="img-fluid rounded-circle" />
                    <span className="ms-2 text-light">{state.user.username}</span>
                </div>
            </div>
            <div className="overflow-auto" style={{height: "88vh"}}>
                <ListContact imgAdrien={imgAdrien} dataUser={dataUser} setDataUser={setDataUser} />
            </div>
            <div onClick={handleLogout} style={{height: "5vh", backgroundColor: "#61a5c2"}} className="d-grid gap-2 p-1">
                <button className="btn btn-danger btn-sm">
                    Logout
                </button>
            </div>
        </>
    )
}
