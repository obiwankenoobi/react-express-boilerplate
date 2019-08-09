import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonMU from '@material-ui/core/Button';
import '../../css/Main.css'


class Home extends Component {
  render() {
    return (

        <div className='admin-signup-section container-signup container'>
          <h3>Home</h3>
          <Link style={{textDecoration: 'none'}} to={{pathname:'/admin'}}>
            <ButtonMU className='btn-signup' variant="contained" color="primary">Admin</ButtonMU>
          </Link>
          <br/>
        </div> 

    );
  }
}

export default Home;
