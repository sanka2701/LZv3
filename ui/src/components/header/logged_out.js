import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default () => {
    return (
        <Nav navbar>
            <NavItem>
                <NavLink tag={Link} to='/login'>
                    <span>
                        <FormattedMessage id='nav.login' defaultMessage='Log In' />
                    </span>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} to='/register'>
                    <span>
                        <FormattedMessage id='nav.register' defaultMessage='Register' />
                    </span>
                </NavLink>
            </NavItem>
        </Nav>
    )
}