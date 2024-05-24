class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div/>
    }
  };
  
  const appString = ReactDOMServer.renderToString(<App />);