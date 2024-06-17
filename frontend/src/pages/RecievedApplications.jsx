
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useMyContext } from "../contexts/MyContext";
import ResumeModal from "../components/ResumeModel";

const RecievedApplications = () => {
  const { user ,isAuthorized} = useMyContext();
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();
 const { postId }=useParams();


  useEffect(() => {
    try {

      if (!isAuthorized) {
        navigateTo("/");
      }

      if (user && user.role === "Recruiter") {
        axios
          .get(`${String(import.meta.env.VITE_BACKEND_API_BASEURL)}/v1/application/recieved/${postId}`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.data);
          });
      } 
      else
      navigateTo("/");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);


  

  
  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
             Please login as a Recruiter 
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element.application._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default RecievedApplications;








const EmployerCard = ({ element, openModal }) => {
    return (
      <>
        <div className="job_seeker_card">
          <div className="detail">
            <p>
              <span>Name:</span> {element.user.name}
            </p>
            <p>
              <span>Email:</span> {element.user.email}
            </p>
            <p>
              <span>Phone:</span> {element.user.phone}
            </p>
            <p>
              <span>Address:</span> {element.address}
            </p>
            <p>
              <span>CoverLetter:</span> {element.application.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img
              src={element.application.resume}
              alt="resume"
              onClick={() => openModal(element.application.resume)}
            />
          </div>
        </div>
      </>
    );
  };
  