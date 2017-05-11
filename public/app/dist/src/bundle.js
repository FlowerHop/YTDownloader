(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
$('#submit').click(function () {
  var url = $('#ytURL').val();
  // console.log (url);
  $.ajax({
    type: "POST",
    url: 'http://140.115.51.30:8204/video',
    data: { url: url },
    success: function success(fileName) {
      var str = "<li><a href='http://140.115.51.30:8204/file/" + fileName + "'>" + fileName.replace(/.mp4/g, "") + " " + "<span class='glyphicon glyphicon-download'></span></a></li>";
      $('#dlList').append(str);
      $('#dlList > li').click(function () {
        // console.log ($(this));
        $(this).css("text-decoration", "line-through");
        // console.log ($(this).children ('a'));
        var li = $(this);
        setTimeout(function () {
          var a = li.children('a');
          a.css('color', 'red');
          a.removeAttr("href");
        }, 3000);
      });
    },
    dataType: 'text'
  });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsU0FBRixFQUFhLEtBQWIsQ0FBb0IsWUFBWTtBQUM5QixNQUFJLE1BQU0sRUFBRSxRQUFGLEVBQVksR0FBWixFQUFWO0FBQ0E7QUFDQSxJQUFFLElBQUYsQ0FBTztBQUNMLFVBQU0sTUFERDtBQUVMLFNBQUssaUNBRkE7QUFHTCxVQUFNLEVBQUMsS0FBSyxHQUFOLEVBSEQ7QUFJTCxhQUFTLGlCQUFDLFFBQUQsRUFBYztBQUNyQixVQUFJLE1BQU0saURBQWlELFFBQWpELEdBQTRELElBQTVELEdBQW1FLFNBQVMsT0FBVCxDQUFrQixPQUFsQixFQUEyQixFQUEzQixDQUFuRSxHQUFvRyxHQUFwRyxHQUEwRyw2REFBcEg7QUFDQSxRQUFFLFNBQUYsRUFBYSxNQUFiLENBQXFCLEdBQXJCO0FBQ0EsUUFBRSxjQUFGLEVBQWtCLEtBQWxCLENBQXlCLFlBQVk7QUFDbkM7QUFDQSxVQUFFLElBQUYsRUFBUSxHQUFSLENBQWEsaUJBQWIsRUFBZ0MsY0FBaEM7QUFDQTtBQUNBLFlBQUksS0FBSyxFQUFFLElBQUYsQ0FBVDtBQUNBLG1CQUFZLFlBQVk7QUFDdEIsY0FBSSxJQUFJLEdBQUcsUUFBSCxDQUFhLEdBQWIsQ0FBUjtBQUNBLFlBQUUsR0FBRixDQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFDQSxZQUFFLFVBQUYsQ0FBYyxNQUFkO0FBQ0QsU0FKRCxFQUlHLElBSkg7QUFLRCxPQVZEO0FBV0QsS0FsQkk7QUFtQkwsY0FBVTtBQW5CTCxHQUFQO0FBcUJELENBeEJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbi8vIGltcG9ydCBGb3JtQm94IGZyb20gJy4vRm9ybUJveC5qcyc7XG4vLyBpbXBvcnQgaW5qZWN0VGFwRXZlbnRQbHVnaW4gZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbic7XG4vLyBpbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcicgXG4vLyAvLyBpbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJyBpbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnIGNvbnN0IGxpZ2h0TXVpVGhlbWUgPSBnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSk7IFxuLy8gaW5qZWN0VGFwRXZlbnRQbHVnaW4gKCk7XG5cbi8vIGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4vLyAgICAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4vLyAgICAgICBzdXBlciAocHJvcHMpO1xuLy8gICAgIH1cbi8vICAgICByZW5kZXIoKSB7XG4vLyAgICAgICByZXR1cm4gKFxuLy8gICAgICAgICA8TXVpVGhlbWVQcm92aWRlcj5cbi8vICAgICAgICAgPEZvcm1Cb3gvPlxuLy8gICAgICAgICA8L011aVRoZW1lUHJvdmlkZXI+XG4vLyAgICAgICApO1xuLy8gICAgIH1cbi8vICB9XG4vLyBSZWFjdERPTS5yZW5kZXIgKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICgnYXBwJykpO1xuXG4vLyBjb25zb2xlLmxvZyAoeXRkbCAoJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9TUNHS3BzT1hsaU0nKSk7XG4kKCcjc3VibWl0JykuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHVybCA9ICQoJyN5dFVSTCcpLnZhbCAoKTtcbiAgLy8gY29uc29sZS5sb2cgKHVybCk7XG4gICQuYWpheCh7XG4gICAgdHlwZTogXCJQT1NUXCIsXG4gICAgdXJsOiAnaHR0cDovLzE0MC4xMTUuNTEuMzA6ODIwNC92aWRlbycsXG4gICAgZGF0YToge3VybDogdXJsfSxcbiAgICBzdWNjZXNzOiAoZmlsZU5hbWUpID0+IHtcbiAgICAgIGxldCBzdHIgPSBcIjxsaT48YSBocmVmPSdodHRwOi8vMTQwLjExNS41MS4zMDo4MjA0L2ZpbGUvXCIgKyBmaWxlTmFtZSArIFwiJz5cIiArIGZpbGVOYW1lLnJlcGxhY2UgKC8ubXA0L2csIFwiXCIpICsgXCIgXCIgKyBcIjxzcGFuIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLWRvd25sb2FkJz48L3NwYW4+PC9hPjwvbGk+XCI7XG4gICAgICAkKCcjZGxMaXN0JykuYXBwZW5kIChzdHIpO1xuICAgICAgJCgnI2RsTGlzdCA+IGxpJykuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cgKCQodGhpcykpO1xuICAgICAgICAkKHRoaXMpLmNzcyAoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJsaW5lLXRocm91Z2hcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nICgkKHRoaXMpLmNoaWxkcmVuICgnYScpKTtcbiAgICAgICAgbGV0IGxpID0gJCh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBhID0gbGkuY2hpbGRyZW4gKCdhJyk7XG4gICAgICAgICAgYS5jc3MgKCdjb2xvcicsICdyZWQnKTtcbiAgICAgICAgICBhLnJlbW92ZUF0dHIgKFwiaHJlZlwiKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRhdGFUeXBlOiAndGV4dCdcbiAgfSk7XG59KTtcblxuIl19
