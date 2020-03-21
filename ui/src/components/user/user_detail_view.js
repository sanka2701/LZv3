import React from 'react';
import BorderCol from "../ui/content/bordered_content";
import {Col, FormGroup, Label, Row} from "reactstrap";
import {FormattedMessage} from "react-intl";
import ViewText from "../ui/fields/view/view_text";

const UserDetailView = ({user}) => (
    <BorderCol>
        <Row>
            <Col>
                <FormGroup>
                    <Label>
                        <FormattedMessage id={'user.username'} defaultMessage={'Username'}/>
                    </Label>
                    <ViewText>
                        {user.username}
                    </ViewText>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label>
                        <FormattedMessage id={'user.role'} defaultMessage={'Role'}/>
                    </Label>
                    <ViewText>
                        <FormattedMessage id={'user.role.' + user.role} defaultMessage={user.role}/>
                    </ViewText>
                </FormGroup>
            </Col>
        </Row>
    </BorderCol>
);

export default UserDetailView