export default (req, res) => {
  if (req.method === "GET") {
    res.status(200);
    res.json({
      data: {
        quotes: [
          {
            timestamp: "1593013680",
            quote: [
              { name: "Ting", message: "Butt it’s wrong? *strokes beard*" },
              {
                name: "Yusuf",
                message:
                  "I don’t know if you are stroking my beard or your imaginary beard…",
              },
            ],
          },
        ],
      },
    });
  } else {
    res.status(405).end();
  }
};
