import React, { useState, useEffect } from 'react';
import { getDateStringFromTimestamp, getTimeFromTimestamp } from '../../utilities';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateContent from "./CreateContent";

const Contents = ({classCode, adminEmail, isContentCreated, setIsContentCreated}) => {
    const storeData = useSelector(selectUserData);
    const [contents, setContents] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [showCreate, setShowCreate] = useState(false);
    const toggleCreate = () => setShowCreate(prevState=>!prevState);
    const [loading, setLoading] = useState(false);

    const getContents = () => {
        setLoading(true);
        axios.post("https://e-learn-backend.onrender.com/courses/getContents", {
            classCode: classCode
        },{ headers: { Authorization: 'Bearer ' + storeData.token } }
        )
        .then((res)=>{
            setContents(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err.response);setLoading(false);})
    }

    useEffect(async () => {
        getContents();
    }, []);

    useEffect(() => {
        if (isContentCreated) {
            getContents();
            window.scrollTo(0, 0);
        }
        setIsContentCreated(false);
    }, [isContentCreated]);

    return (
        <div className="Assignments content-box py-3 px-4 pt-4">
            {
                (loading) ? (
                    <div className="col-12 d-flex justify-content-center align-items-center mt-4 mb-4">
                        <CircularProgress size={50} className="display-block"/>
                    </div>
                ) : contents.length !== 0 ? (
                    <>
                    {
                        contents.map(content => {
                            return (
                                <div key={content._id}>
                                    <a href={( storeData.userEmail=== adminEmail ) ?
                                        "/classes/"+classCode+"/contents/"+content._id+"/admin" :
                                        "/classes/"+classCode+"/contents/"+content._id
                                    } >
                                        <div className="d-flex justify-content-between">
                                            <div className="Assignment_Date">
                                                {getDateStringFromTimestamp(content.dueDate)}
                                            </div>
                                            <div className="Assignment_Time">
                                                {getTimeFromTimestamp(content.dueDate)}
                                            </div>
                                        </div>
                                        <div className="Assignment_Box d-flex flex-column justify-content-center p-1">
                                            <div className="Assignment_Img">
                                                <img src="https://firebasestorage.googleapis.com/v0/b/edeasy-90583.appspot.com/o/assignments%2FWhatsApp%20Image%202021-10-17%20at%204.55.04%20AM.jpeg?alt=media&token=db78b70d-2b09-4cbb-b5ac-d47e2392bd31" alt="" />
                                                <div className="Assignment_Name">
                                                    {content.name}
                                                </div>
                                            </div>
                                            <div className="Assignment_Desc">
                                                {content.desc}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                    </>
                 ) : <div>No content created yet.</div>
            } 
            {
                ( storeData.userEmail=== adminEmail ) ? (
                    <div className="floating-btn d-block d-md-none">
                        <Dropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle nav>
                                <Fab style={{color:'white', backgroundColor:"#1B559C"}}>
                                    <AddIcon style={{fontSize: "28px"}} />
                                </Fab>
                            </DropdownToggle>
                            <DropdownMenu className="bg-transparent" style={{border:"none"}}>
                            <button className="join-create-btn" onClick={() => setShowCreate(true)}>
                                Add Course Content
                            </button>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ) : ("")
            }
            <CreateContent 
                setIsContentCreated={setIsContentCreated} 
                isModalOpen={showCreate} 
                toggleModal={toggleCreate} 
                setShow={setShowCreate}
                classCode={classCode}
            />
        </div>
    )
}

export default Contents;