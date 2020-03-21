import React from 'react';
import {FaCloudUploadAlt} from 'react-icons/fa'

import './file_uploader_styles.css';

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            imageSrc: props.value,
            loaded: !!props.value
        };

        this.onDragEnter  = this.onDragEnter.bind(this);
        this.onDragLeave  = this.onDragLeave.bind(this);
        this.onDrop       = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onDragEnter(e) {
        this.setState({ active: true });
    }

    onDragLeave(e) {
        this.setState({ active: false });
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }

    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();

        if (!file.type.match(pattern)) {
            // todo: set error for invalid format
            return;
        }

        this.setState({ loaded: false });

        reader.onload = (event) => {
            this.setState({
                imageSrc: reader.result,
                loaded: true
            });
            this.props.onChange(file);
        };

        reader.readAsDataURL(file);
    }

    getFileObject() {
        return this.refs.input.files[0];
    }

    getFileString() {
        return this.state.imageSrc;
    }

    render() {
        let state = this.state;

        return (
            <div className={'upload-wrapper'}>
                <label
                    className={`uploader ${state.loaded && 'loaded'}`}
                    onDragEnter={this.onDragEnter}
                    onDragLeave={this.onDragLeave}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}>

                    <img src={state.imageSrc} className={state.loaded ? 'loaded' : ''}/>
                    <i className={`icon ${state.loaded ? 'loaded' : ''}`} >
                        <FaCloudUploadAlt />
                    </i>
                    <input type="file" accept="image/*" onChange={this.onFileChange} ref="input" hidden/>
                </label>
            </div>
        );
    }
}

export default FileUploader;