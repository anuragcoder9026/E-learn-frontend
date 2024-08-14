import axios from 'axios';
import "./browse.css";
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import ClassList from "./ClassList";

export default function App() {
  const [browse, setBrowse] = useState([]);
  const getBrowse = () => {
     axios.post("https://e-learn-backend.onrender.com/browse/getBrowse")
    .then((res)=>{
        setBrowse(res.data);
    })
    .catch(err => {console.log(err.response);})
}

useEffect(async () => {
    getBrowse();
}, []);
  return (
    
    <section id="hero">
    <div className="dashboard">

      <div className="d-none d-md-block">
        <Header />
        <Banner />
      </div>
      <div className="d-block d-md-none">
        <MobileHeader />
        <Banner />
      </div>
       <ClassList browse={browse} />
    </div>
    </section>
    
  );
}