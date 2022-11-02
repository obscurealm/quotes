import React from "react";
import Link from "next/link";
import convertMarkdownToHtml from "../../utils/convertMarkdownToHtml";
import formatUnixTimeToDateTime from "../../utils/formatUnixTimeToDateTime";

const emojis = {
  ":yusuf:": {
    src: "/images/yusuf.png",
    alt: "Iconic Yusuf smirk.",
  },
  ":tingker-bell:": {
    src: "/images/tingker-bell.png",
    alt: "Iconic Tingker Bell.",
  },
};

const Quote = ({ quote, hasLink = false }) => {
  const { date, time } = formatUnixTimeToDateTime(quote.timestamp);

  const replaceEmojiText = (emojiText) =>
    emojiText
      .split(/(:[a-z-]+?:)/g)
      .map((text) => {
        if (!text) return "";
        if (emojis[text])
          return `<img src="${emojis[text].src}" alt="${emojis[text].alt}" />`;

        return text;
      })
      .flat()
      .join("");

  return (
    <div data-cy="quote">
      {hasLink ? (
        <h2>
          <Link href={`/quotes/${encodeURIComponent(quote.timestamp)}`}>
            <a>
              {date} at {time}
            </a>
          </Link>
        </h2>
      ) : (
        <h2>
          {date} at {time}
        </h2>
      )}

      {quote.dialogue.map((dialogue, index) => {
        return (
          <p key={index}>
            <strong>{dialogue.author}</strong>:{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHtml(replaceEmojiText(dialogue.text)),
              }}
            />
          </p>
        );
      })}
    </div>
  );
};

export default Quote;
