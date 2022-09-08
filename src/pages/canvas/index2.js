import React from "react-native";
import Paint from "./paint";

var { View, WebView } = React;

const Canvas = React.createClass({
  render() {
    return (
      <WebView
        html={Paint}
        style={this.props.style}
        javaScriptEnabledAndroid={true}
      />
    );
  },
});

export default Canvas;
