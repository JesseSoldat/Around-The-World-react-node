import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, Navbar, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Header extends Component {
  renderBrand = () => {
    if(this.props.isAuthenticated) {
      return (
        <LinkContainer to="dashboard">
          <a href="/dashboard">Around The World</a>
        </LinkContainer>
      );
    }
  }

  renderRightSideLinks = () => {
    if(this.props.isAuthenticated) {
      return (
        <Nav pullRight>
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