import React, { useEffect, useState } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { useMyContext } from "../../contexts/MyContext";
import Alljobs from "../../pages/Alljobs";


const PopularCompanies = () => {

  const {allJobs} =useMyContext();
  const [microsoft,setMicrosoft]=useState(0);
  const [tesla,setTesla]=useState(0);
  const [apple,setApple]=useState(0);
  
  
  useEffect(()=>{
    let ms=0;
  let ts=0;
  let ap=0;
    allJobs.forEach(job=>{
      if(job.company?.toLowerCase()=="microsoft")
        ms++;
      else if(job.company?.toLowerCase()=="tesla")
        ts++;
      else if(job.company?.toLowerCase()=="apple")
        ap++;
    })
    setApple(ap);
    setMicrosoft(ms);
    setTesla(ts);
  },[])

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Pune, INDIA",
      openPositions: microsoft,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 21 Banglore, INDIA",
      openPositions: tesla,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street no 101, USA",
      openPositions: apple,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;

