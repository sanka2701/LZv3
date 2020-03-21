import React from 'react';
import SideBar  from '../../sidebar/side_bar';
import { Row, Col } from 'reactstrap';

const withSideBar = (WrappedComponent) => ({ ...props }) => (
    <Row>
        <Col md={8} >
            <WrappedComponent {...props} />
        </Col>
        <Col md={4} className={"d-none d-md-block"} >
            <SideBar />
        </Col>
    </Row>
);

export default withSideBar;