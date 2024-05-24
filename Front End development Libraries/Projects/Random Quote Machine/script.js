class QuoteBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quote: "loading...",
        author: ""
      };
      this.fetchNewQuote = this.fetchNewQuote.bind(this);
    }
  
    componentDidMount() {
      this.fetchNewQuote();
    }
  
    async fetchNewQuote() {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      if (response.ok) {
        this.setState({
          quote: data.content,
          author: data.author
        });
      } else {
        this.setState({
          quote: "An error occurred",
          author: ""
        });
        console.log(data);
      }
    }
  
    render() {
      return (
        <div id="quote-box" className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p id="text">{this.state.quote}</p>
              <footer className="blockquote-footer">
                <cite id="author" title="Source Title">{this.state.author}</cite>
              </footer>
            </blockquote>
          </div>
          <div className="card-footer">
            <button id="new-quote" className="btn btn-primary" onClick={this.fetchNewQuote}>
              New Quote
            </button>
            <a id="tweet-quote" className="btn btn-secondary" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${this.state.quote}" - ${this.state.author}`)}`} target="_blank" rel="noopener noreferrer">
              Tweet Quote
            </a>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<QuoteBox />, document.getElementById('root'));
  