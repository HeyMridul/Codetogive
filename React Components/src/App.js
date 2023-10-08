import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Register from "./components/Register";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";


// function App()
// {

// // const App = () => {
// //   const [user, setUser] = useState(null);

//   // return (
//   //   <BrowserRouter>
//   //     <Navbar user={user} />
//   //     <Routes>
//   //       <Route path="/" element={<Home />} />
//   //       <Route path="/about" element={<About />} />
//   //       <Route path="/pricing" element={<Pricing />} />
//   //       <Route path="/login" element={<Login setUser={setUser} />} />
//   //       <Route path="/profile" element={<Profile user={user} />} />
//   //       <Route path="/profile/edit" element={<EditProfile user={user} />} />
//   //       <Route path="/register" element={<Register setUser={setUser} />} />
//   //       <Route path="/Loginbutton" element={<Loginbutton setUser={setUser} />} />
//   //       <Route path="/Logoutbutton" element={<Logoutbutton setUser={setUser} />} />
//   //     </Routes>
//   //   </BrowserRouter>
//   // );


//   return (
//     <h1>PriDIx Test</h1>
//     {error && <p>Authentication Error</p>}
//     {!error && isLoading && <p>Loading...</p>}
//     {!error && !isLoading && (
//       <>
//         <LoginButton />
//         <LogoutButton />
//         <Profile />
//       </>
//     };

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <main className="column">
      <h1>PriDIx Test</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
}

export default App;
