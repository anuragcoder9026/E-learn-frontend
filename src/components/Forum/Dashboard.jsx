import React, { useState, useEffect } from 'react';
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import FooterNav from '../partials/FooterNav/FooterNav';
import "./Dashboard.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Banner from './Banner';
import Discussion from "./Discussion"; 
import FAQ from './FAQ';
import Forum from './Discussion';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData} from '../../reduxSlices/authSlice';


const Dashboard = () => {
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [owned, setOwned] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading,setLoading] = useState(false);
  const storeData = useSelector(selectUserData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const [show, setShow] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const toggleJoin = () => setShowJoin(prevState=>!prevState);
  useEffect(async () => {
    if (storeData.token){
      setLoading(true);
      console.log(storeData);
      await axios.post("https://e-learn-backend.onrender.com/classes/getClassrooms", {
        userEmail: storeData.userEmail,
        type:"owned"
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setOwned(res.data);
      })
      .catch(err => console.log(err));
      await axios.post("https://e-learn-backend.onrender.com/classes/getClassrooms", {
        userEmail: storeData.userEmail,
        type:"enrolled"
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setEnrolled(res.data);
      })
      .catch(err => console.log(err));
      setLoading(false);
    }
  }, [storeData.token]);
  return (
    <>
      {
        (loading) ? (
          <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <CircularProgress size={80} className="display-block"/>
          </div>
        ) : (
          <div className="dashboard">
            <div className="d-none d-md-block">
              <Header/>
            </div>
            <div className="d-block d-md-none">
              <MobileHeader/>
            </div>
            <div className="row mx-0">
                <FAQ setLoading={setLoading} owned={owned} enrolled={enrolled} />
              <div className="col-12 col-md-9 width-80 padding-sx-0 margin-sx-0 pos">
                <div className="row mx-0 m-t-0 m-md-3">
                  <Banner/>
                </div>
                <div className="row m-3 mx-0 mx-md-3">
                  <Forum setLoading={setLoading} owned={owned} enrolled={enrolled} />
                </div>
              </div>
            </div>
            <div className="d-block d-md-none">
            <Discussion adminEmail={adminEmail} />
              <FooterNav/>
            </div>
          </div>
        ) 
      }
    </>
  );
}
export default Dashboard;

