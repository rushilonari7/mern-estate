import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Singin from "./pages/Singin"
import Singout from "./pages/Singout"
import Header from './Componenets/Header';
import Toaster from "react-hot-toast"
import PrivateRoute from './Componenets/PrivateRoute.js';
import CreateListing from './pages/CreateListing.js';
import UpdateListing from './pages/UpdateListing.js';
import Listing from './pages/Listing.js';
import Search from './pages/Search.js';

function App() {
  return (
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>
    <Route element={<PrivateRoute/>}>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='/create-listing' element={<CreateListing/>}/>
  <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
    </Route>
    <Route path='/search' element={<Search/>} />
  <Route path='/Singin' element={<Singin/>}/>
  <Route path='/listing/:listingId' element={<Listing/>}/>
  <Route path='/Singout' element={<Singout/>}/>
 </Routes>
 <Toaster/>
 </BrowserRouter>
  );
}

export default App;
