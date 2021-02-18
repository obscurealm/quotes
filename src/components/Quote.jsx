import React from 'react';
import convertMarkdownToHtml from "../../utils/convertMarkdownToHtml";

const Quote = ({quote}) => {
  return (
    <div data-cy="quote">
      <h2>{quote.timestamp}</h2>
      {quote.dialogue.map((dialogue, index) => (
        <p key={index}>
          <strong>{dialogue.author}</strong>:{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: convertMarkdownToHtml(dialogue.text),
            }}
          />
        </p>
      ))}
    </div>
  );
}

export default Quote;
