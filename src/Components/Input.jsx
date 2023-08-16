import React, { Component } from "react";

class Input extends Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSendMessage(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div className="Input">
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
