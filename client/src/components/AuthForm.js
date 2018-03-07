import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {checkEmail} from '../utils/utils';

class AuthForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameErrorMsg: null,
    emailErrorMsg: null,
    passwordErrorMsg: null,
    asyncDummy: null 
  }

  //VALIDATION-----------------
  validateLength = (type, obj) => {
    const length = this.state[type].length;
    if(length > obj.success) return 'success';
    else if (length > obj.warning) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  validateEmail = () => {
    const valid = checkEmail(this.state.email);
    if(valid) return 'success';
    else if (valid === false) return 'error';
    else if (valid === null) return null;
  }

  //Update State--------------
  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState(() => ({username, usernameErrorMsg: null}));
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email, emailErrorMsg: null}));
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password, passwordErrorMsg: null}));
  }

  renderUserName = () => {
    if(this.props.formType === 'register') {
      return (
        <FormGroup controlId="username"
          validationState={this.validateLength('username', {success: 7, warning: 5})}
        >
        <ControlLabel>Username</ControlLabel>
        <FormControl type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        <span className="authform__error">
          {this.state.usernameErrorMsg}
        </span>
        </FormGroup>
      );
    }
  }

  setErrorMessages = () => {
    if(this.props.formType === 'register') {
      if(this.state.username.length < 5) {
        this.setState(() => ({usernameErrorMsg: 'Please provide a username of at least 5 characters.'}));
      }
    }
    
    if(!checkEmail(this.state.email)) {
      this.setState(() => ({emailErrorMsg: 'Please provide a proper email.'}));
    }

    if(this.state.password.length <= 5) {
      this.setState(() => ({passwordErrorMsg: 'Please provide a password of at least 6 characters.'}));
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setErrorMessages();
    
    this.setState({asyncDummy: null}, () => {
      if(this.state.emailErrorMsg !== null || this.state.passwordErrorMsg !== null ) {
        return;
      } 
      if(this.props.formType === 'register') {
        if(this.state.usernameErrorMsg === null) {
          return console.log('REGISTER SUBMITTED');        
        }
        return;
      }
      return console.log('LOGIN SUBMITTED');    
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.renderUserName()}
        <FormGroup controlId="email"
          validationState={this.validateEmail()}>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}/>
          <span className="authform__error">
            {this.state.emailErrorMsg}
          </span>
        </FormGroup>

        <FormGroup controlId="password"
          validationState={this.validateLength('password', {success: 8, warning: 5})}>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}/>
            <span className="authform__error">
              {this.state.passwordErrorMsg}
            </span>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  formType: ownProps.formType
});

export default connect(mapStateToProps)(AuthForm);