import { useContext, useEffect } from 'react';


// Contexts
import { UserContext } from "./contexts/userContext"

// Pages
import Auth from "./pages/Auth";
import Chat from './pages/Chat';

import { API, setAuthToken } from './config/api'

document.title = 'Chat App'
// init token pada axios setiap kali aplikasi direfresh
if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')

      if(response.status === 404){
        return dispatch({
          type: "AUTH_ERROR"
        })
      }

      let payload = response.data.data.user
      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    checkUser()
  },[])

  return (
    <>
      {!state.isLogin ? <Auth /> : <Chat /> }
    </>
  );
}

export default App;
