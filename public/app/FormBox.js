import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class FormBox extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        url: '',
        list: false
      };
      this.handleChange = this.handleChange.bind (this);
      this.handleSubmit = this.handleSubmit.bind (this);
    } 

    handleChange (event, index, value) {
      switch (event.target.id) {
      	case "text_url":
          this.setState ({
            url: event.target.value,
          });
      	break;
      	default :
      	  this.setState ({
      	    list: value,
      	  });
      }
      
    } 

    handleSubmit () { 
      console.log (this.state);
    } 

    render () {
      return (
        <div>
          <TextField
            id="text_url"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <SelectField
            id="select_list"
            floatingLabelText="Video or Playlist"
            value={this.state.list}
            onChange={this.handleChange}
          >
            <MenuItem value={false} primaryText="Video" />
            <MenuItem value={true} primaryText="Playlist" />
          </SelectField>
          <RaisedButton 
            label="Download"
            onClick={this.handleSubmit}
          />
        </div>
      );
    }
}
