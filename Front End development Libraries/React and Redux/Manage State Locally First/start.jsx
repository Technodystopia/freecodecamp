class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }
  
    submitMessage() {
      this.setState(prevState => ({
        input: '',
        messages: [...prevState.messages, prevState.input]
      }));
    }
  
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          <input
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Enter your message"
          />
          <button onClick={this.submitMessage}>Add message</button>
          <ul>
            {this.state.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
  