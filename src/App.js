import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import React, {useEffect} from 'react';
import Home from './components/Home/Home';
import Browse from './components/Browse/browse';
import Courses from './components/Courses/Dashboard';
import Courseroom from './components/Courses/Classroom';
import CourseAssign from './components/Courses/Assignments'
import Content from './components/Courses/Contents'
import Resources from './components/Resources/Dashboard'
import Forum from './components/Forum/Dashboard'
import Dashboard from './components/Classroom/Dashboard/Dashboard';
import Classroom from './components/Classroom/Classroom';
import ScrollToTop from './components/partials/ScrollToTop/ScrollToTop';
import AssignmentAdmin from './components/Classroom/AssignmentAdmin/AssignmentAdmin';
import StudentSubmission from './components/Classroom/StudentSubmission/StudentSubmission';
import { useDispatch, useSelector } from 'react-redux';
import { AUTOLOGIN, selectUserData } from './reduxSlices/authSlice';
import Reminders from './components/partials/Header/MobileReminder'
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AUTOLOGIN());
  }, []);

  return (
    <div className="app">
      <ScrollToTop>
        <Router>
          {
            userData.loading ? (
              <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <CircularProgress size={80} className="display-block"/>
              </div>
            ) : userData.token ? (
              <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/browse' component={Browse} exact/>
                <Route path='/courses' component={Courses} exact/>
                <Route path='/courses/:id' component={Courseroom} exact/>
                <Route path='/courses/:id/:tab' component={Courseroom} exact/>
                <Route path='/courses/:id/assignment/:assignId/admin' component={CourseAssign} exact/>
                <Route path='/courses/:id/content/:contentId/admin' component={Content} exact/>
                <Route path='/resources' component={Resources} exact/>
                <Route path='/forum' component={Forum} exact/>
                <Route path='/classes' component={Dashboard} exact/>
                <Route path='/classes/reminders' component={Reminders}/>
                <Route path='/classes/:id' component={Classroom} exact/>
                <Route path='/classes/:id/:tab' component={Classroom} exact/>
                <Route path='/classes/:id/assignment/:assignId/admin' component={AssignmentAdmin} exact/>
                <Route path='/classes/:id/assignment/:assignId' component={StudentSubmission} exact/>
                <Redirect to ="/" />
              </Switch> 
            ) : (
              <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/browse' component={Browse} exact/>
                <Redirect to ="/" />
              </Switch>
            )
          }
        </Router>
      </ScrollToTop>
    </div>
  )
} 

export default App