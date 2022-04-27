import './App.css';
import Tabs from './Components/Form/Tabs.js';
import Posts from './Components/Posts/Posts.js';
//import { getPosts } from './actions/posts.js';
import * as api from './api'; 
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
function App() {  
  //every time the page is refreshed, all of the posts and info will be refreshed
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch({type: 'FETCH_ALL'});
  }, [dispatch])
  return (
    <>
    <Container maxidth="lg">
      <AppBar  position="static" color="inherit">
        <Typography  variant="h2" align="center">Task Management App</Typography>
      </AppBar>
      
        <Container> <Tabs /> </Container>
      </Container>
    </>

  );
}

export default App;
