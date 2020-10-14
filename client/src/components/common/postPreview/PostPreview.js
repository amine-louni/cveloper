import './styles.css';
import React from 'react';
const ReactMarkdown = require('react-markdown/with-html');
export default function PostPreview(props) {
  return (
    <div>
      <ReactMarkdown source={props.markdown} />
    </div>
  );
}
