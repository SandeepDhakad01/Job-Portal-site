import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../contexts/MyContext";
import { IoLocationOutline } from "react-icons/io5";
import { HiCurrencyRupee } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { differenceInDays } from 'date-fns';


const Alljobs = () => {
  console.log("All jobs re-rendering ....")
 
  const [filteredJobs,setFilteredJob]=useState([]);
  const { isAuthorized,loading } = useMyContext();
  const navigateTo = useNavigate();

     const {allJobs}= useMyContext();
      
  const [category,setCategory]=useState("");
  const [company,setCompany]=useState("");
  const [worktype,setWorktype]=useState("");
  const [country,setCountry]=useState("");
  const [city,setCity]=useState("")

//  console.log(category,company,worktype,country,city)
 
  const handleFilter=(e)=>{
            e.preventDefault();
       const jobs=allJobs.filter((job)=>{
          if((!category || category==job.category) && (!company || company.toLowerCase().trim()==job.company?.toLowerCase().trim()) && (!worktype || (worktype=="remote")==job.remote) && (!country || country.toLowerCase().trim()==job.country?.toLowerCase().trim()) && (!city || city.toLowerCase().trim()==job.city?.toLowerCase().trim()))
            return job;
       })

       setFilteredJob(jobs)
  }

  // console.log(isAuthorized,"agr false h to navigate to hona tha")
  // if (!isAuthorized) {
  //   console.log("if ke under bhi hu...")
  //   navigateTo('/');
  // }




  useEffect(() => {
          console.log(" All jobs useEffect")
          if(!loading && !isAuthorized)
          navigateTo('/')

           setFilteredJob(allJobs)
    // try {
    //   axios
    //     .get("http://localhost:8000/api/v1/job/getall", {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       // console.log(res.data.data.jobs)
    //       const arr = res.data.data.jobs;
    //       arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    //       setAllJobs(arr);
    //       setFilteredJob(arr);
    //     });
    //     console.log("All jobs at last ",isAuthorized)
    // } catch (error) {
    //   console.log(error);
     
    // }
  }, [loading]);




  return (
    <section className="jobs page">
      <div className="container">

        <div className="search-container">
        <form onSubmit={handleFilter}>
      <div class="filter">
        <select class="child" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Graphics & Design">Graphics & Design</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Frontend Web Development">Frontend Web Development</option>
          <option value="MERN Stack Development">MERN Stack Development</option>
          <option value="Account & Finance">Account & Finance</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Video Animation">Video Animation</option>
          <option value="MEAN Stack Development">MEAN Stack Development</option>
          <option value="MEVN Stack Development">MEVN Stack Development</option>
          <option value="Data Entry Operator">Data Entry Operator</option>
        </select>
        <input type="text" placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)} />
        <select class="child" value={worktype} onChange={(e)=>setWorktype(e.target.value)}>
          <option value="">Select Work Type</option>
          <option value="remote">Work from Home</option>
          <option value="from office">Work from Office</option>
        </select>
        <input class="child" type="text" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)} />
        <input class="child" type="text" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />
      </div>
      <div class="btn-container">
        <input class="filter-btn" type="submit" value="Search Jobs" />
      </div>
    </form>
         
        </div>

        <h1>All AVAILABLE JOBS</h1>


        <div className="banner">
          {filteredJobs &&
            filteredJobs.map((element) => {
              return (

                <div className="card" key={element._id}>
                  <h6>{element.category}</h6>
                  <p>{element.company || "Company not found"}</p>
                  <div className="mini">
                    <div className="flex"> <div ><IoLocationOutline /></div>
                      {(element.remote) ? <div>Remote</div> : <div>{`${element.city},${element.country}`}</div>}</div>

                    <div className="flex"> <div ><HiCurrencyRupee /></div> {element.fixedSalary || (`${element.salaryFrom} - ${element.salaryTo}`)} / month</div>

                    <div className="flex"><div><MdAccessTime /></div>{(element.fullTime)? "full Time":"part Time"}</div>
                  </div>

                  <div className="foot"> <Link className="btn" to={`/job/${element._id}`}>Job Details</Link> <div>{differenceInDays(new Date(), element.createdAt)} {(differenceInDays(new Date(), element.createdAt) > 1) ? <div>days ago</div> : <div>day ago</div>} </div></div>

                </div>

              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Alljobs;
