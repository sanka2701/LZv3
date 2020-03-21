import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ROLE_ADMIN } from "../../utils/constant";

export default ({ onLogOut, userName, role }) => {
    return (
        <Nav navbar>
            <NavItem>
                <NavLink onClick={onLogOut} tag={Link} to='/'>
                    <span>
                        <FormattedMessage id='nav.logout' defaultMessage='Log Out' />
                    </span>
                </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <span>
                        { userName }
                    </span>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag={Link} to='/events/edit'>
                        <FormattedMessage id='nav.createEvent' defaultMessage='Create Event' />
                    </DropdownItem>
                    {role === ROLE_ADMIN && (
                        <div>
                            <DropdownItem tag={Link} to='/articles/edit'>
                                <FormattedMessage id='nav.createArticle' defaultMessage='Create Article' />
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to='/potw'>
                                <FormattedMessage id='nav.photoOfTheWeek' defaultMessage='Photo of the week' />
                            </DropdownItem>
                            <DropdownItem tag={Link} to='/events/manage'>
                                <FormattedMessage id='nav.manageEvents' defaultMessage='Manage Events' />
                            </DropdownItem>
                            <DropdownItem tag={Link} to='/places'>
                                <FormattedMessage id='nav.managePlaces' defaultMessage='Manage Places' />
                            </DropdownItem>
                            <DropdownItem tag={Link} to='/users'>
                                <FormattedMessage id='nav.manageUsers' defaultMessage='Manage Users' />
                            </DropdownItem>
                            <DropdownItem tag={Link} to='/tags'>
                                <FormattedMessage id='nav.manageTags' defaultMessage='Manage Tags' />
                            </DropdownItem>
                        </div>
                    )}
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    )
}