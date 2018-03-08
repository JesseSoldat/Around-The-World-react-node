import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, Navbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {renderIcon} from '../utils/utils';

class Header extends Component {

  renderBrandIcon = () => {
    if(this.props.isAuthenticated) {
      return (
        <LinkContainer to="profile" key="icon">
          <a href="/profile">{renderIcon('user')}</a>
        </LinkContainer>
      );
    }
  }

  renderBrand = () => {
    if(this.props.isAuthenticated) {
      return (
        <LinkContainer to="dashboard" key="brand">
          <a href="/dashboard">Around The World</a>
        </LinkContainer>
      );
    }
    return (
      <LinkContainer to="/" key="brand">
        <a href="/">Around The World</a>
      </LinkContainer>
    );
  }



  renderRightSideLinks = () => {
    if(this.props.isAuthenticated) {
      return (
        <Nav pullRight>
          <LinkContainer to="/map">
            <NavItem eventKey={1}>
              {renderIcon('plus')}
              <span className="header__link">
                Map It
              </span>  
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/friends">
            <NavItem eventKey={2}>
              {renderIcon('users')}
              <span className="header__link">
                Friends
              </span>  
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/logout">
            <NavItem eventKey={3}>
              {renderIcon('sign-out-alt')}
              <span className="header__link">
                Logout
              </span>  
            </NavItem>
          </LinkContainer>
        </Nav>
      );
    }

    return (
      <Nav pullRight>
         <LinkContainer to="/login">
          <NavItem eventKey={1}>
            Login
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/register">
          <NavItem eventKey={2}>
            Register
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            {this.renderBrandIcon()}
          </Navbar.Brand>
          <Navbar.Brand>
            {this.renderBrand()}
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderRightSideLinks()} 
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  isAuthenticated: !!auth._id
});

export default connect(mapStateToProps)(Header);