import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar';

import * as auth from '@/actionCreators/auth'
import classes from './styles.module.scss'
import { Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Lock } from '@material-ui/icons';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }

    this.googleLogin = this.googleLogin.bind(this);
  }

  componentDidMount () {
    this.oauthSetup();
  }

  oauthSetup () {
    let that = this;
    window.init = function () {
      let gapi = window.gapi;
      if (gapi) {
        gapi.load('auth2', function () {
          window.auth2 = gapi.auth2.init({
              ux_mode: 'popup',
              scope: 'profile email'
          });

          that.setState({ isOauthReady: true, gapi: gapi })
        });
      }
      else {
        setTimeout(()=>window.init(), 100);
      }
    }
    window.init();
  }

  googleLogin () {
    if (this.state.isOauthReady) {
      this.state.gapi.auth2.getAuthInstance().signIn();
      
      window.auth2.currentUser.listen((googleUser) => {
        let id_token = googleUser.getAuthResponse().id_token;
        if (id_token) {
          this.props.googleLogin(id_token);
        }
      });
    }
    else if (!window.isOauthScriptReady) {
      console.log('wait for oauth');
    }
    else {
      this.oauthSetup();
    }
  }

  render() {
    if (this.props.auth.isLoggedIn) {
      return (<Redirect to="/" />)
    }
    return (
      <div id={classes.loginRoot}>
        <Typography className = {classes.appName} variant="h3">APOGEE 2019</Typography>
        <Typography className = {classes.appName} variant="h4">STORE WEB APP</Typography>
        <Grid container spacing={24} className={classes.loginGrid} alignContent="center" justify="center">
          <Grid item xs={8} container justify="center" alignItems="center" style = {{display: 'flex'}}>
            <AccountCircle className = {classes.inputIcon}/>
            <TextField
              id="name"
              className = {classes.inp}
              label="Name"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </Grid>
          <Grid item xs={8} container justify="center" alignItems="center">
              <Lock className = {classes.inputIcon}/>
              <TextField
                id="password-input"
                className = {classes.inp}
                label="Password"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
          </Grid>
          <Grid item xs={8} container justify="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.login(this.state.username, this.state.password);
                console.log('clicked');
                }}>
              Login
            </Button>
          </Grid>
          <Grid item xs={8} container justify="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick = {this.googleLogin}
              >
              Bitsian Login
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.props.auth.isMessageSet}
          autoHideDuration={6000} 
          message={this.props.auth.message}
          onClose={(e) => this.props.setErrorMessage(false, "")}/>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, auth), dispatch);
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

// export default Login
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))