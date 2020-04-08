import React from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Loader from 'react-loader-spinner';


class Login extends React.Component{
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    state = {
      credentials: {
        username: '',
        password: ''
      },
      isFetching: false
    }

    handleChange = e => {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [e.target.name]: e.target.value
        }
      });
    };

    login = e => {
      e.preventDefault();
      this.setState({
        isFetching: true
      });

      axiosWithAuth()
      .post('/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token',
        res.data.payload);
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err));
    }

  render(){
    return (
      <div className="loginBox">
        <h2>Welcome to Color Bubbles 🙂 </h2>
        <form onSubmit={this.login}>
          <input placeholder="Username" type="text" name="username" value={this.state.credentials.username} onChange={this.handleChange}/>
          <input placeholder="Password" type="password" name="password" value={this.state.credentials.password} onChange={this.handleChange}/>
          <button>Login</button>
          {this.state.isFetching && (
             <div className="key spinner">
              <Loader type="Puff" color="#204963" height="60" width="60" />
              <p>Loading Data</p>
            </div>
          )}
        </form>
      </div>
    )
  }
};

export default Login;
