import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton= () =>{
    const {loginWithRedirect, isAuthenticated}= useAuth0();
    return (
      isAuthenticated && (
      <button onClick={()=>loginWithRedirect()}>
        Sign_Out
      </button>
      )
      
    )
  }
export default LogoutButton