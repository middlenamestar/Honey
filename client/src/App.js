// Page Importing
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import Signup from "./pages/Signup";
import Room from "./pages/Room"
import Chat from "./pages/Chat"
import DonationsPage from "./pages/DonationsPage.js";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import { useCookies } from "react-cookie";
// Importing Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom' //react npm plug in to control routes




// import './App.css';  // Currently using one page to style so this isn't needed, can reimplement as we change to multiple styling pages.

const App = () => {
  const [cookies, setCookie, removeCookie] =useCookies(['user'])

  const authToken = cookies.AuthToken




  return (
    <BrowserRouter>
    <Routes> {/* Routes within the router, each new page is added below following this format */}
      <Route path='/' element= {<Home/>}/>
      {authToken && <Route path='/dash' element= {<Dash/>}/>}
      {authToken && <Route path='/signup' element= {<Signup/>}/>}
      {authToken && <Route path='/room' element= {<Room/>}/>}
      {authToken && <Route path='/chat' element= {<Chat/>}/>}
      {authToken && <Route path='/DonationsPage' element={<DonationsPage/>}/>}
      {authToken && <Route path='/success' element={<Success/>}/>}
      {authToken && <Route path='/profile' element={<Profile/>}/>}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
