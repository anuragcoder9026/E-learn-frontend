import React, { useState, useEffect } from "react";
import "./Classroom.css";
import { useParams, useHistory, useLocation } from "react-router-dom";
import MobileHeader from "../partials/Header/MobileHeader";
import Header from "../partials/Header/Header";
import FooterNav from "../partials/FooterNav/FooterNav";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utilities";
import Content from "./CreateContent";
import Assignments from "./Assignments";
import Contents from "./Contents";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Button } from "reactstrap";
import CreateAssignment from "./CreateAssignment";
import CreateContent from "./CreateContent";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUserData, SET_ERROR_NULL } from "../../reduxSlices/authSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const Course = () => {
  const storeData = useSelector(selectUserData);
  const history = useHistory();
  const location = useLocation().pathname;
  const classCode = useParams().id;
  const [className, setClassName] = useState();
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [classYear, setClassYear] = useState();
  const [subject, setSubject] = useState();
  const [meetLink, setMeetLink] = useState();
  const [reminders, setReminders] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const [activeTab, setActiveTab] = useState(useParams().tab);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);

  const [showContent, setShowContent] = useState(false);
  const toggleContent = () => setShowContent((prevState) => !prevState);

  const [loading, setLoading] = useState(false);
  const [isAssignmentCreated, setIsAssignmentCreated] = useState(false);
  const [isContentCreated, setIsContentCreated] = useState(false);
  const [reminderLoading, setReminderLoading] = useState(false);

  useEffect(() => {
    if (!activeTab) setActiveTab("content");
    if (activeTab === "content") {
      history.replace("/courses/" + classCode + "/contents");
    } else if (activeTab === "assignments") {
      history.replace("/courses/" + classCode + "/assignments");
    }
  }, [activeTab]);
  const toggle_dropdown = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    setLoading(true);
    // axios Request for getting className, adminName, adminEmail, year, subject
    axios
      .post(
        "https://e-learn-backend.onrender.com/courses/getCourse",
        {
          classCode: classCode,
        },
        { headers: { Authorization: "Bearer " + storeData.token } }
      )
      .then((res) => {
        setClassName(res.data.className);
        setAdminName(res.data.adminName);
        setAdminEmail(res.data.adminEmail);
        setClassYear(res.data.classLevel);
        setSubject(res.data.fieldName);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        history.replace("/courses");
      });
  }, []);

  useEffect(async () => {
    if (storeData.token) {
      setReminderLoading(true);
      axios
        .post(
          "https://e-learn-backend.onrender.com/courses/getReminders",
          {
            userEmail: storeData.userEmail,
          },
          { headers: { Authorization: "Bearer " + storeData.token } }
        )
        .then(async (res) => {
          let reminders = [];
          for (let reminder of res.data) {
            await axios
              .post("https://e-learn-backend.onrender.com/courses/getCourse", {
                classCode: reminder.classCode,
              })
              .then((classDetails) => {
                reminders.push({
                  ...reminder,
                  className: classDetails.data.className,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
          setReminders(reminders);
          setReminderLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setReminderLoading(false);
        });
    }
  }, [storeData.token]);

  const deleteClass = () => {
    axios
      .delete(
        "https://e-learn-backend.onrender.com/courses/deleteCourse",
        {
          data: { classCode: classCode },
        },
        { headers: { Authorization: "Bearer " + storeData.token } }
      )
      .then((res) => {
        console.log("deleted");
        history.push("/courses");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="Classroom">
          <div className="d-none d-md-block">
            <Header />
          </div>
          <div className="d-block d-md-none">
            <MobileHeader />
          </div>
          <div className="row m-0 justify-content-center">
            <div className="Classroom_Info col-11 col-md-10 col-lg-9 col-xl-8 d-flex justify-content-between content-box mt-4 py-2 px-2 py-sm-3 px-sm-4">
              <div className="d-flex">
                <div className="Horizontal_Line"></div>
                <div className="d-flex flex-column">
                  <div>
                    <h2 className="ClassName ms-1">{className}</h2>
                  </div>
                  <div className="d-flex Classroom_Desc">
                    <div className="Side_Border">{adminName}</div>
                    <div className="Side_Border">{classYear}</div>
                    <div>{subject}</div>
                  </div>
                  <div className="Class_Code mt-4 mb-2">
                    Class Code - <b>{classCode}</b>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between">
                {adminName === storeData.userName ? (
                  <Dropdown
                    className="me-2"
                    isOpen={dropdownOpen}
                    toggle={toggle_dropdown}
                  >
                    <DropdownToggle nav>
                      <MoreHorizIcon />
                    </DropdownToggle>
                    <DropdownMenu
                      className="bg-transparent"
                      style={{ border: "none" }}
                    >
                      <button className="join-create-btn" onClick={deleteClass}>
                        Delete Classroom
                      </button>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  ""
                )}
                <a href={meetLink} target="_blank"></a>
              </div>
            </div>
            <div className="col-11 col-md-10 col-lg-9 col-xl-8">
              <div className="row d-flex">
                <div className="d-flex justify-content-between Classroom_Navtab mt-3">
                  <div
                    onClick={() => setActiveTab("content")}
                    className={activeTab === "content" ? "active" : ""}
                  >
                    Course Content
                  </div>
                  <div
                    onClick={() => setActiveTab("assignments")}
                    className={activeTab === "assignments" ? "active" : ""}
                  >
                    Assignments
                  </div>
                  {/* <div
                    onClick={() => setActiveTab("attendees")}
                    className={activeTab === "attendees" ? "active" : ""}
                  >
                    Attendees
                  </div> */}
                </div>
              </div>
              <div className="row justify-content-between mt-3">
                <div className="Classroom_Body m-0 p-0">
                  {activeTab === "content" ? (
                    <Contents
                      setIsContentCreated={setIsContentCreated}
                      isContentCreated={isContentCreated}
                      classCode={classCode}
                      adminEmail={adminEmail}
                    />
                  ) : activeTab === "assignments" ? (
                    <Assignments
                      setIsAssignmentCreated={setIsAssignmentCreated}
                      isAssignmentCreated={isAssignmentCreated}
                      classCode={classCode}
                      adminEmail={adminEmail}
                    />
                  ) : null}
                </div>
                <div className="Reminders">
                  <div className="content-box py-3 px-2 px-md-4 py-md-3 mb-3">
                    <h6 className="ms-1">Reminders</h6>
                    {reminders
                      .slice(0, seeAll ? reminders.length : 3)
                      .map((reminder, index) => {
                        let style = {};
                        if (
                          index !== reminders.length - 1 &&
                          !(!seeAll && index == 2)
                        ) {
                          style.borderBottom = "1px solid #ccc";
                        }
                        return (
                          <a
                            key={reminder._id}
                            href={
                              "/courses/" +
                              reminder.classCode +
                              "/assignment/" +
                              reminder._id
                            }
                          >
                            <div
                              className="d-flex flex-column Reminder px-2 py-2 py-md-3"
                              style={style}
                            >
                              <div className="Reminder_className">
                                {reminder.className}
                              </div>
                              <div className="Reminder_name">
                                {reminder.name}
                              </div>
                              <div className="Reminder_Desc">
                                {getTimeFromTimestamp(reminder.dueDate)} -{" "}
                                {getDateFromTimestamp(reminder.dueDate)}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    {reminderLoading ? (
                      <div className="d-flex justify-content-center mt-3">
                        <CircularProgress size={30} />
                      </div>
                    ) : reminders.length > 3 ? (
                      <div className="See_All d-flex justify-content-end">
                        {seeAll ? (
                          <div onClick={() => setSeeAll(false)}>See Less</div>
                        ) : (
                          <div onClick={() => setSeeAll(true)}>See All</div>
                        )}
                      </div>
                    ) : reminders.length == 0 ? (
                      <div
                        className="ms-1 mt-2"
                        style={{ fontSize: "13px", color: "gray" }}
                      >
                        No work due!
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {adminName === storeData.userName ? (
                      <div className="d-flex justify-content-center">
                        <Button
                          outline
                          color="primary"
                          className="Button_Hover d-flex align-items-center py-2 px-3 fs-6"
                          onClick={() => setShow(true)}
                        >
                          <AddRoundedIcon
                            style={{ fontSize: "28px", margin: "-2px 3px 0 0" }}
                          />
                          Create Assignment
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {adminName === storeData.userName ? (
                      <div className="d-flex justify-content-center">
                        <Button
                          outline
                          color="primary"
                          className="Button_Hover d-flex align-items-center py-2 px-3 fs-6"
                          onClick={() => setShowContent(true)}
                        >
                          <AddRoundedIcon
                            style={{ fontSize: "28px", margin: "-2px 3px 0 0" }}
                          />
                          Add Course Content
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-block d-md-none">
            <FooterNav />
          </div>
          <CreateAssignment
            setIsAssignmentCreated={setIsAssignmentCreated}
            classCode={classCode}
            isModalOpen={show}
            toggleModal={toggle}
            setShow={setShow}
          />
          <CreateContent
            setIsContentCreated={setIsContentCreated}
            classCode={classCode}
            isModalOpen={showContent}
            toggleModal={toggleContent}
            setShowContent={setShowContent}
          />
        </div>
      ) : (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <CircularProgress size={80} className="display-block" />
        </div>
      )}
    </>
  );
};

export default Course;
