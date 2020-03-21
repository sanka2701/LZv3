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
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeLocale, logoutUser } from '../../actions/index';

import UserLoggedIn from '../../components/header/logged_in';
import UserLoggedOut from '../../components/header/logged_out';

class SiteNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            isNavbarOpen: false
        };
    }

    toggleNavbar() {
        this.setState({
            isNavbarOpen: !this.state.isNavbarOpen
        });
    }

    render() {

        console.log('Navbar user: ', this.props.currentUser);

        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand tag={Link} to='/' >
                            LiptovŽije
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.isNavbarOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            {/*<NavItem>*/}
                                {/*<NavLink tag={Link} to='/'>*/}
                                    {/*<FormattedMessage id='nav.home' defaultMessage='Home' />*/}
                                {/*</NavLink>*/}
                            {/*</NavItem>*/}
                            <NavItem>
                                <NavLink tag={Link} to='/events'>
                                    <FormattedMessage id='nav.events' defaultMessage='Events' />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/articles'>
                                    <FormattedMessage id='nav.articles' defaultMessage='Articles' />
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            {
                                this.props.currentUser ? (
                                    <UserLoggedIn
                                        onLogOut={this.props.logoutUser}
                                        userName={this.props.currentUser.username}
                                        role={this.props.currentUser.role}
                                    />
                                ) : (
                                    <UserLoggedOut />
                                )
                            }

                            {/*<UncontrolledDropdown nav inNavbar>*/}
                                {/*<DropdownToggle nav caret>*/}
                                    {/*{this.props.currentLocale}*/}
                                {/*</DropdownToggle>*/}
                                {/*<DropdownMenu right>*/}
                                    {/*<DropdownItem onClick={() => this.props.changeLocale('sk')}>Slovensky</DropdownItem>*/}
                                    {/*<DropdownItem onClick={() => this.props.changeLocale('pl')}>Polski</DropdownItem>*/}
                                    {/*<DropdownItem onClick={() => this.props.changeLocale('en')}>English</DropdownItem>*/}
                                {/*</DropdownMenu>*/}
                            {/*</UncontrolledDropdown>*/}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentLocale: state.locale.locale,
        currentUser: state.auth.user
    }
}

export default connect(mapStateToProps, {changeLocale, logoutUser})(SiteNavigation);