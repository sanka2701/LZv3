import React from 'react';
import BorderCol from '../../components/ui/content/bordered_content';
import { Row, Col } from 'reactstrap';
import FormInput from '../../components/ui/fields/form/form_input';
import FormFileUpload from '../../components/ui/fields/form/form_file_upload';
import PostContextMenu from '../../components/ui/menu/post_context_menu';
import { reduxForm } from 'redux-form';
import { required } from "../../utils/valdiators";

const PhotoEditForm = ({
    reset,
    handleSubmit,
    onCancel,
    onSubmit,
}) => (
    <div>
        <PostContextMenu
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
            onCancel={onCancel}
        />

        <BorderCol>
            <form>
                <Row>
                    <Col>
                        <FormInput
                            messageId={'potw.title'}
                            defaultMessage={'Photo title'}
                            name={'title'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput
                            messageId={'potw.description'}
                            defaultMessage={'Short Description'}
                            name={'description'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormFileUpload
                            name={'photoUrl'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
            </form>
        </BorderCol>
    </div>
);

export default reduxForm({ form: 'potw' })(PhotoEditForm);

