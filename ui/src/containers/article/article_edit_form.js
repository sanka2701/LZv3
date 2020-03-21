import React from 'react';
import { reduxForm } from "redux-form";
import { required } from "../../utils/valdiators";
import { Row, Col } from 'reactstrap';
import FormInput from '../../components/ui/fields/form/form_input';
import FormFileUpload from '../../components/ui/fields/form/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form/form_content_editor';
import PostContextMenu from '../../components/ui/menu/post_context_menu';
import BorderCol from '../../components/ui/content/bordered_content';

const ArticleEditForm = ({ onCancel, reset, onSubmit, handleSubmit }) => (
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
                            messageId={'article.title'}
                            defaultMessage={'Article title'}
                            name={'title'}
                            validate={[required]}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormFileUpload
                            name={'thumbnail'}
                            validate={[required]}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormContentEditor
                            name={'content'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
            </form>
        </BorderCol>

        <PostContextMenu
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
            onCancel={onCancel}
        />
    </div>
);

export default reduxForm({form: 'create_article'})(ArticleEditForm);