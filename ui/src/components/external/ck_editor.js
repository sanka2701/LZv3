import React, { Component } from 'react';
const loadScript = require('load-script');

const CKEDITOR_LIB_PATH = '/assets/ckeditor/ckeditor.js';
const EDITOR_INSTANCE = 'lz_editor';

class CKEditor extends Component {
    componentDidMount() {
        // debugger;
        if(window.CKEDITOR) {
            this.initInstance();
        } else {
            loadScript(CKEDITOR_LIB_PATH, this.onScriptLoad.bind(this));
        }
    }

    componentWillUnmount() {
        if(window.CKEDITOR) {
            this.editorInstance.destroy();
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    initInstance() {
        this.editorInstance = window.CKEDITOR.replace(this.refs.ckEditorAnchor, {language:"sk"});
        for (const event in this.props.events) {
            const eventHandler = this.props.events[event];
            this.editorInstance.on(event, eventHandler);
        }
    }

    onScriptLoad() {
        if(!window.CKEDITOR) {
            console.error('Unable to load CKEditor');
            return;
        }
        this.initInstance();
    }

    render() {
        return (
            <textarea
                name={EDITOR_INSTANCE}
                ref='ckEditorAnchor'
                defaultValue={this.props.value}
            >
            </textarea>
        )
    }
}

CKEditor.defaultProps = {
    value: '',
    events: {}
};

export default CKEditor;