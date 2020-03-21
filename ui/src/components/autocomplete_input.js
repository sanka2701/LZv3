import React, { Component } from 'react';
import PropTypes from "prop-types";
import Autocomplete from 'react-autocomplete';

class AutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        }
    }

    render() {
      const { suggestions } = this.props;
        //todo: redo shouldItemRender to take punctiatoin into consideration and word proximity
        return (
            <Autocomplete
                getItemValue={(item) => item.label}
                items={suggestions}
                shouldItemRender={
                  (item, value) => value && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                renderItem={(item, isHighlighted) =>
                    <div key={item.label} style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                        {item.label}
                    </div>
                }
                inputProps={{className:'form-control', onBlur: this.props.onBlur}}
                renderMenu={(items, value, {minWidth}) => {
                    return <div style={{ ...this.menuStyle, minWidth, zIndex:1, position: 'absolute' }} children={items}/>
                }}
                value={this.state.value}
                onChange={e => {
                    this.setState({ value: e.target.value });
                    this.props.onInputChange(e.target.value);
                }}
                wrapperStyle={{width: '100%'}}
                onSelect={(value, object)=> {
                    this.setState({ value });
                    this.props.onSuggestionSelect(object.id)
                }}
            />
        )
    }
}

AutocompleteInput.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSuggestionSelect: PropTypes.func.isRequired,
    value: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.object)
};

export default AutocompleteInput;