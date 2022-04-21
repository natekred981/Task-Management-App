import './App.css';
import Form from './Components/Form/Form.js';
import Posts from './Components/Posts/Posts.js';

import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import React from 'react';

function App() {  
  return (
    <Container maxidth="lg">
      <AppBar  position="static" color="inherit">
        <Typography  variant="h2" align="center">Cool Stuff</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Form />
          </Grid>
        </Container>
      </Grow>
    </Container>

  );
}

export default App;
