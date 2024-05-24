class Results extends React.Component {
    render() {
      return (
        <div>
          <h1>{this.props.fiftyFifty ? 'You Win!' : 'You Lose!'}</h1>
        </div>
      );
    }
  }
  
  class GameOfChance extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 1
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        counter: prevState.counter + 1 
      }));
    }
  
    render() {
      const fiftyFifty = Math.random() >= 0.5;
      return (
        <div>
          <button onClick={this.handleClick}>Play Again</button>
          <Results fiftyFifty={fiftyFifty} />
          <p>{'Turn: ' + this.state.counter}</p>
        </div>
      );
    }
  }
  