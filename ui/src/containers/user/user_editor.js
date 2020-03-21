import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {loadUserById, updateUser} from "../../actions";
import {Col, Row} from "reactstrap";
import BorderCol from "../../components/ui/content/bordered_content";
import PostContextMenu from "../../components/ui/menu/post_context_menu";
import FormInput from "../../components/ui/fields/form/form_input";
import {required} from "../../utils/valdiators";
import FormDropdownList from "../../components/ui/fields/form/form_dropdown_list";
import {injectIntl} from "react-intl";
import {ROLE_ADMIN, ROLE_TRUSTED_USER, ROLE_USER} from "../../utils/constant";

class UserEditor extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
    }

    componentDidMount = () => {
        const { userId } = this.props.match.params;
        userId && !this.props.user && this.props.loadUserById(userId);
    };

    onSubmit = (user) => {
        const apiData = {
            ...user,
            role: user.role.millis
        };

        const successCallback = () => {
            this.props.history.push(`/users/${user.id}`)
        };

        this.props.updateUser(apiData, successCallback);
    };

    onCancel = () => {
        this.props.history.goBack();
    };

    getSelectOptions = () => {
        const { intl } = this.props;
        return [ROLE_ADMIN, ROLE_USER, ROLE_TRUSTED_USER].map((role_key => {
            return {
                //todo: change module to accept 'value' instead of 'millis' in form_dropdown_list
                millis: role_key,
                label: intl.formatMessage({id: 'user.role.' + role_key})
            }
        }))
    };

    render = () => {
        const { handleSubmit, reset } = this.props;

        return (
            <React.Fragment>
                <PostContextMenu
                  onSubmit={handleSubmit(this.onSubmit)}
                  onCancel={this.onCancel}
                  onReset={reset}
                />
                <BorderCol>
                    <form>
                        <Row>
                            <Col>
                                <FormInput
                                  messageId={'user.username'}
                                  defaultMessage={'Username'}
                                  name={'username'}
                                  validate={[required]}
                                  disabled={true}
                                />
                            </Col>
                            <Col>
                                <FormDropdownList
                                  messageId={'user.role'}
                                  defaultMessage={'Role'}
                                  name={'role'}
                                  validate={[required]}
                                  data={this.getSelectOptions()}
                                />
                            </Col>
                        </Row>
                    </form>
                </BorderCol>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ users }, ownProps) => {
    const { userId } = ownProps.match.params;
    const user = users.byId[userId];
    return {
        initialValues: user,
        user
    }
};

export default compose(
  injectIntl,
  connect(mapStateToProps, { updateUser, loadUserById }),
  reduxForm({form: 'update_create_user'})
)(UserEditor);
