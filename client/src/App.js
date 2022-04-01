// Page Importing
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import Signup from "./pages/Signup";
import Room from "./pages/Room"
import Chat from "./pages/Chat"
import DonationsPage from "./pages/DonationsPage.js";
import Success from "./pages/Success";
// Importing Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom' //react npm plug in to control routes



// import './App.css';  // Currently using one page to style so this isn't needed, can reimplement as we change to multiple styling pages.

const App = () => {
  return (
    <BrowserRouter>
    <Routes> {/* Routes within the router, each new page is added below following this format */}
      <Route path='/' element= {<Home/>}/>
      <Route path='/dash' element= {<Dash/>}/>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/room' element= {<Room/>}/>
      <Route path='/chat' element= {<Chat/>}/>
      <Route path='/DonationsPage' element={<DonationsPage/>}/>
      <Route path='/success' element={<Success/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
