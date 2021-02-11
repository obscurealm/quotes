export default (req, res) => {
  if (req.method === "GET") {
    res.status(200);
    res.json({
      data: {
        quotes: getListOfQuotes(),
      },
    });
  } else {
    res.status(405);
    res.json({
      errors: [
        {
          status: "405",
          title: "Method Not Allowed",
        },
      ],
    });
  }
};

export function getListOfQuotes() {
  return [
    {
      timestamp: "1593013680",
      dialogue: [
        { author: "Ting", text: "Butt it’s wrong? *strokes beard*" },
        {
          author: "Yusuf",
          text:
            "I don’t know if you are stroking my beard or your imaginary beard…",
        },
      ],
    },
  ];
}
