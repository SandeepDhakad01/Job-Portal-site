import React, { useEffect ,useState} from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { useMyContext } from "../../contexts/MyContext";
import axios from "axios";

const HeroSection = () => {

  const {allJobs} =useMyContext();

  const [recruiters,setRecruiters]=useState();
  const [jobSeekers,setJobSeekers]=useState();
 const [companies,setCompanies]= useState();

     const st=new Set();

  

 useEffect(()=>{
  allJobs.forEach((element) => {
    st.add(element.company)
 });

 setCompanies(st.size)

 const fetch=async()=>{
 try{
      const response=await axios.get(`${String(import.meta.env.VITE_BACKEND_API_BASEURL)}/v1/user/getusercount`,
        {
          withCredentials: true,
        }
      );
    
     
      setJobSeekers(response?.data?.data?.jobSeekers.length)
      setRecruiters(response?.data?.data?.recruiters.length)

 }
 catch(err){
      
 }
 }

 fetch();

 },[])
 
  

  const details = [
    {
      id: 1,
      title: allJobs.length,
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title:companies,
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: jobSeekers+30,
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: recruiters+10,
      subTitle: "Recruiters",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find a job that suits</h1>
            <h1>your interests and skills</h1>
            <p>
            JobZee matches your unique skills with opportunities perfectly tailored for your career growth. Find jobs that align with your expertise and passion effortlessly with JobZee!
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
