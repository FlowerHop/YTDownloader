// import React from 'react';
// import ReactDOM from 'react-dom';
// import FormBox from './FormBox.js';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider' 
// // import getMuiTheme from 'material-ui/styles/getMuiTheme' import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme' const lightMuiTheme = getMuiTheme(lightBaseTheme); 
// injectTapEventPlugin ();

// class App extends React.Component {
//     constructor (props) {
//       super (props);
//     }
//     render() {
//       return (
//         <MuiThemeProvider>
//         <FormBox/>
//         </MuiThemeProvider>
//       );
//     }
//  }
// ReactDOM.render (<App />, document.getElementById ('app'));

// console.log (ytdl ('https://www.youtube.com/watch?v=MCGKpsOXliM'));
$('#submit').click (function () {
  let url = $('#ytURL').val ();
  // console.log (url);
  $.ajax({
    type: "POST",
    url: 'http://140.115.51.30:8204/video',
    data: {url: url},
    success: (fileName) => {
      let str = "<li><a href='http://140.115.51.30:8204/file/" + fileName + "'>" + fileName.replace (/.mp4/g, "") + " " + "<span class='glyphicon glyphicon-download'></span></a></li>";
      $('#dlList').append (str);
      $('#dlList > li').click (function () {
        // console.log ($(this));
        $(this).css ("text-decoration", "line-through");
        // console.log ($(this).children ('a'));
        let li = $(this);
        setTimeout (function () {
          let a = li.children ('a');
          a.css ('color', 'red');
          a.removeAttr ("href");
        }, 3000);
      });
    },
    dataType: 'text'
  });
});

