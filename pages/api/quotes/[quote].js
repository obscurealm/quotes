export default (req, res) => {
  if (req.method === "GET") {
    res.status(200);
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
}
