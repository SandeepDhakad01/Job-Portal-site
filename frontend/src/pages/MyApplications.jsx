import React, { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "../components/ResumeModel.jsx";
import {useMyContext} from '../contexts/MyContext.js'

const MyApplications = () => {
  const { user,isAuthorized } = useMyContext();
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
        axios
          .get(`${String(import.meta.env.VITE_BACKEND_API_BASEURL)}/v1/application/myallapplications`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.data.applications,res.data.data.job);
          });
      }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`${String(import.meta.env.VITE_BACKEND_API_BASEURL)}/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker"  && (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) }

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;




const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
 
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
        <p>
            <span>For</span> {element.company}
          </p>
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
         
          <p>
            <div><span>CoverLetter:</span></div> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume}
            alt="resume"
            onClick={() => openModal(element.resume)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

