const { useState, useEffect } = React;

const Editor = ({ markdown, onChange }) => {
  return (
    <textarea
      id="editor"
      value={markdown}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const Preview = ({ markdown }) => {
    const createMarkup = () => {
      return { __html: marked(markdown, { breaks: true }) };
    };
  
    return <div id="preview" dangerouslySetInnerHTML={createMarkup()} />;
  };
  

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // Default markdown content
    const defaultMarkdown = `
# Heading 1
## Heading 2
[Link to Google](https://www.google.com)
\`inline code\`
\`\`\`
// Code block
const greet = () => {
  return 'Hello, World!';
}
\`\`\`
- List item 1
- List item 2

> Blockquote

![Image](https://via.placeholder.com/150)
**Bold text**
`;

    setMarkdown(defaultMarkdown);
  }, []);

  const handleInputChange = (value) => {
    setMarkdown(value);
  };

  return (
    <div className="container">
      <h1>Markdown Previewer</h1>
      <div className="row">
        <div className="col">
          <h2>Editor</h2>
          <Editor markdown={markdown} onChange={handleInputChange} />
        </div>
        <div className="col">
          <h2>Preview</h2>
          <Preview markdown={markdown} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'));
