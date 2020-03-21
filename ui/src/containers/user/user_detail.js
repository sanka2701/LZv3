import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadUserById} from "../../actions";
import PostContextMenu from "../../components/ui/menu/post_context_menu";
import UserDetailView from "../../components/user/user_detail_view";

class UserDetail extends React.Component {
    componentDidMount() {
        const { userId } = this.props.match.params;
        !this.props.user && this.props.loadUserById(userId);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onEdit = () => {
        const { user, history } = this.props;
        history.push(`/users/edit/${user.id}`)
    };

    onDelete = () => {
        // todo: confirm message
        alert('Not yet implemented')
    };

    render() {
        const { user } = this.props;

        if (!user) {
            return (<div/>)
        }

        return (
            <React.Fragment>
                <PostContextMenu
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                />
                <UserDetailView user={user} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ users }, ownProps) => {
    const { userId } = ownProps.match.params;
    return {
        user: users.byId[userId]
    }
};

export default compose(
    withRouter,
    connect(
        mapStateToProps, {
            loadUserById
        })
)(UserDetail)