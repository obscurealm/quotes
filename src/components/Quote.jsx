import { useEffect, useState } from "react";
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
  const [formattedTimestamp, setFormattedTimestamp] = useState({});

  useEffect(() => {
    setFormattedTimestamp(formatUnixTimeToDateTime(quote.timestamp));
  }, [quote]);

  const { date, time } = formattedTimestamp;

  const replaceEmojiText = (emojiText) =>
    emojiText
      .split(/(:[a-z-]+?:)/g)
      .map((text) => {
        if (!text) return "";
        if (emojis[text])
          return `<img src="${emojis[text].src}" alt="${emojis[text].alt}" width="18.5px" style="vertical-align:text-bottom;" />`;

        return text;
      })
      .flat()
      .join("");

  return (
    <div data-testid="quote" className="mb-5">
      <h2>
        {hasLink ? (
          <Link href={`/quotes/${encodeURIComponent(quote.timestamp)}`}>
            {date} at {time}
          </Link>
        ) : (
          `${date} at ${time}`
        )}
      </h2>

      {quote.meta?.workspacePage && (
        <div className="mb-3">
          <em>From {quote.meta?.workspacePage}</em>
        </div>
      )}

      {quote.dialogue.map((dialogue, index) => {
        return (
          <p key={index}>
            {dialogue.author && (
              <>
                <strong>{dialogue.author}</strong>:{" "}
              </>
            )}
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
