import React from 'react';
import ReactDOM from 'react-dom';
import FormBox from './FormBox.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider' 
// import getMuiTheme from 'material-ui/styles/getMuiTheme' import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme' const lightMuiTheme = getMuiTheme(lightBaseTheme); 
injectTapEventPlugin ();

class App extends React.Component {
    constructor (props) {
      super (props);
    }
    render() {
      return (
        <MuiThemeProvider>
        <FormBox/>
        </MuiThemeProvider>
      );
    }
 }
ReactDOM.render (<App />, document.getElementById ('app'));