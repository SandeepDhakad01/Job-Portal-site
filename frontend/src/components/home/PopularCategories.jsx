import React, { useEffect, useState } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { useMyContext } from "../../contexts/MyContext";

const PopularCategories = () => {
   
  const {allJobs}=useMyContext();
  

   const [categoryCount,setCategoryCount]=useState()
 
   const obj={};

   useEffect(()=>{
    allJobs.forEach((element) => {
    //  console.log(element.category)
       if(obj[element.category])
          obj[element.category]++;
       else obj[element.category]=1;
   })

   setCategoryCount(obj)
   },[])
    

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: `${categoryCount?.["Graphics & Design"] || 0} Open Positions`,
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle:  `${categoryCount?.["Mobile App Development"] || 0} Open Positions`,
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle:  `${categoryCount?.["Frontend Web Development"] || 0} Open Positions`,
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: `${categoryCount?.["MERN Stack Development"] || 0} Open Positions`,
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle:  `${categoryCount?.["Account & Finance"] || 0} Open Positions`,
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: `${categoryCount?.["Artificial Intelligence"] || 0} Open Positions`,
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle:  `${categoryCount?.["Video Animation"] || 0} Open Positions`,
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Data Entry Operator",
      subTitle: `${categoryCount?.["Data Entry Operator"] || 0} Open Positions`,
      icon: <IoGameController />,
    },
  ];
  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <h6>{element.title}</h6>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
