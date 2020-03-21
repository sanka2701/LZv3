import React from 'react';
import PropTypes from "prop-types";
import { Table } from 'reactstrap';
import { map } from 'lodash';
import { FormattedMessage } from 'react-intl';

import BorderCol from '../ui/content/bordered_content';
import {withRouter} from "react-router-dom";


const UserList = ({ users, history }) => {
    const getTableRows = (users) => map(users, (user, index) => {
        return (
            <tr key={'tag-mng-' + user.id} onClick={() => redirectToUserDetail(user.id)}>
                <th scope="row">
                    {parseInt(index) + 1}
                </th>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.firstName || '-' }
                </td>
                <td>
                    {user.lastName  || '-' }
                </td>
                <td>
                    {user.email  || '-' }
                </td>
                <td>
                    <FormattedMessage id={'user.role.' + user.role} defaultMessage={user.role}/>
                </td>
            </tr>
        )
    });

    const redirectToUserDetail = (userId) => history.push(`/users/${userId}`);

    return (
        <BorderCol>
            <Table responsive hover striped>
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        <FormattedMessage id={'user.username'} defaultMessage={'Username'}/>
                    </th>
                    <th>
                        <FormattedMessage id={'user.firstName'} defaultMessage={'First Name'}/>
                    </th>
                    <th>
                        <FormattedMessage id={'user.lastName'} defaultMessage={'Last Name'}/></th>
                    <th>
                        <FormattedMessage id={'user.email'} defaultMessage={'E-mail'}/></th>
                    <th>
                        <FormattedMessage id={'user.role'} defaultMessage={'Role'}/></th>
                </tr>
                </thead>
                <tbody>
                { getTableRows(users) }
                </tbody>
            </Table>
        </BorderCol>
    );
};

UserList.propTypes = {
    users: PropTypes.array.isRequired
};

export default withRouter(UserList);