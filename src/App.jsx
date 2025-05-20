import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TotalBlog from './Blog/TotalBlog';
import Body_sigin from './SignIn/Body';
import Body_signup from './SignUp/Body_signup';
import TotalHome from "./Home/TotalHome";
import Total_ReadBlog from './ReadBlog/total_ReadBlog';
import NewBlog from './NewBlog/NewBlog';
import Profile from './profile/Profile';
import TotalEdit from './EditBlog/TotalEdit';
function App() {
 

  return (
    <>
      
       {/* <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router> */}
    <Router>
      <Routes>
      <Route path="/signin" element={<Body_sigin/>} />
      <Route path='/' element = {<TotalBlog/>}></Route>
      <Route path='/signup' element = {<Body_signup/>} > </Route>
      <Route path='/home' element = {<TotalHome/>} > </Route> 
      <Route path='/home/:blogId' element = {<Total_ReadBlog/>} > </Route> 
      <Route path='/newblog' element = {<NewBlog/>} > </Route> 
      <Route path='/profile' element = {<Profile/>} > </Route>
      <Route path='/edit/:blogId' element = {<TotalEdit/>} > </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
