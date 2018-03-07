import React from 'react';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import AuthForm from '../components/AuthForm';

const LoginPage = () => (
  <Grid>
    <Well className="auth__well">
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <h2 className="auth__title">Login</h2>
          <AuthForm formType="login"/>
        </Col>
      </Row>
    </Well>
  </Grid>
);

export default LoginPage;