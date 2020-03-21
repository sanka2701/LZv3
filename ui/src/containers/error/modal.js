import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { dismissModalError } from '../../actions/index';
import { FormattedMessage } from 'react-intl';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: !!props.errorMessage
        };

        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps({errorMessage}) {
        if (errorMessage !== this.props.errorMessage) {
            this.setState({ isOpened: !!errorMessage })
        }
    }

    toggle() {
        this.props.dismissModalError();
    }

    render() {
        const {errorMessage, errorDetail} = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        <FormattedMessage id={'error.modalHeader'} defaultMessage='Ooops wild error has appeared'/>
                    </ModalHeader>
                    <ModalBody>
                        <FormattedMessage id={errorMessage || 'error.unexpected'} defaultMessage='Unknown error has occured'/>
                        <br/>
                        <br/>
                        {JSON.stringify(errorDetail)}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>okay</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.error.messageId,
        errorDetail: state.error.detail
    }
};

ModalExample.defaultProps = {
    errorMessage: ""
};

export default connect(mapStateToProps, { dismissModalError })(ModalExample);