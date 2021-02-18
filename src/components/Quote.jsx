import React from 'react';
import convertMarkdownToHtml from "../../utils/convertMarkdownToHtml";
import formatUnixTimeToDateTime from "../../utils/formatUnixTimeToDateTime";

const Quote = ({quote}) => {
  const { date, time } = formatUnixTimeToDateTime(quote.timestamp);

  return (
    <div data-cy="quote">
      <h2>{date} at {time}</h2>
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
