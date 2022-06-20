import React from "react";
import Link from "next/link";
import convertMarkdownToHtml from "../../utils/convertMarkdownToHtml";
import formatUnixTimeToDateTime from "../../utils/formatUnixTimeToDateTime";

const Quote = ({ quote, hasLink = false }) => {
  const { date, time } = formatUnixTimeToDateTime(quote.timestamp);

  return (
    <div data-cy="quote">
      {hasLink ? (
        <Link href={`/quotes/${encodeURIComponent(quote.timestamp)}`}>
          <a>
            <h2>
              {date} at {time}
            </h2>
          </a>
        </Link>
      ) : (
        <h2>
          {date} at {time}
        </h2>
      )}

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
};

export default Quote;
