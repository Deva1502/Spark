
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
export const serverUrl = "http://localhost:3000"

function App() {
  /*
  redux me changes ke liye use dispatch hook kause   hota hai aur dats access karne ke liye useselector ka use krte hai
  */
 getCurrentUser()
 const {userData } = useSelector(state=>state.user)

  return (
    <Routes>
      <Route path='/' element={ userData?  <Home/>:<Navigate to="/signin"/>}/>
      <Route path='/signin' element={userData?<Navigate to="/"/>:<SignIn/>}/>
      <Route path='/signup' element={userData?<Navigate to="/"/>:<SignUp/>}/>
      <Route path='/forgot-password' element={userData?<Navigate to="/"/>:<ForgotPassword/>}/>
    </Routes>
  )
}

export default App
