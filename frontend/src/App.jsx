
import { MyContextProvider } from './contexts/MyContext.js'
import { useState ,useEffect} from "react";
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import "./App.css";
import axios from 'axios';



import Layout from './pages/Layout.jsx';
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import AllJobs from './pages/Alljobs.jsx'
import JobDetails from "./pages/JobDetails.jsx"
import PostJob from "./pages/PostJob.jsx"
import MyJobs from "./pages/MyJobs.jsx"
import Application from "./pages/Application.jsx"
import MyApplications from "./pages/MyApplications.jsx"
import NotFound from "./components/notFound/NotFound.jsx"
import RecievedApplication from './pages/RecievedApplications.jsx';



const router=createBrowserRouter(
  createRoutesFromElements(
   <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>

        <Route path="job/getall"  element={<AllJobs/>}/>
        <Route path="job/:id" element={<JobDetails />} />
        <Route path="job/post" element={<PostJob/>}/>
        <Route path="job/me" element={<MyJobs/>} />
        
        <Route path="application/:id" element={<Application/>} />
        <Route path="myApplications" element={<MyApplications/>} />
        <Route path="receivedapplication/:postId" element={<RecievedApplication/>}/>


        <Route path="*" element={<NotFound />} />
   </Route>

  )
)

function App() {
 
const [isAuthorized,setIsAuthorized]=useState(false);
const [user,setUser] =useState({});
const [loading,setLoading]=useState(true);
const [allJobs, setAllJobs] = useState([]);

console.log("app re-renders....")

useEffect(() => {
  const fetchUser = async () => {
    console.log("App fetching")
    try {
      //console.log("App useEffect...")
      const response = await axios.get(
       `${String(import.meta.env.VITE_BACKEND_API_BASEURL)}/v1/user/getuser`,
        {
          withCredentials: true,
        }
      );
      
      setIsAuthorized(true);
      setLoading(false)
     setUser(response.data.data.user);

     console.log("App..... fetching success")
      console.log(isAuthorized)
    } catch (error) {
      setIsAuthorized(false);
      setLoading(false)
    }
  };


  fetchUser();
},[]);


useEffect(()=>{
  const fetch=async()=>{
     try {
    const res=await axios
      .get("http://localhost:8000/api/v1/job/getall", {
        withCredentials: true,
      })

      const arr = res.data.data.jobs;
     
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setAllJobs(arr);

     } catch (err) {
      console.log("error vale section me h")
        setAllJobs([]);
     }
    }

    fetch()
},[loading])

  return (
   <>
   <MyContextProvider value={
      {
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        loading,
        setLoading,
        allJobs,
        setAllJobs
      }
      } >

        <RouterProvider router={router}/>

    </MyContextProvider>
   </>
  )
}

export default App
