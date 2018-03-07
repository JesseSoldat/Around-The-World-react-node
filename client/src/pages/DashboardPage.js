import React, {Component} from 'react';
import {Well, Grid, Row, Col} from 'react-bootstrap';

class DashboardPage extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={8} smOffset={2}>
            DashboardPage
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardPage;
