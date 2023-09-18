export const quoteWithEmptyDialogue = {
  timestamp: 1593013680,
  dialogue: ["Ting: Another one!", ""],
  meta: {
    workspacePage: "Tingker Bell Quotes",
  },
};

export const quoteWithoutAnAuthor = {
  timestamp: 1593013681,
  dialogue: ["Ting: m8", "...", "Yusuf: m10"],
  meta: {
    workspacePage: "Emperor King Yusuf Quotes",
  },
};

export default [
  {
    timestamp: 1593013680,
    dialogue: ["Ting: _Hello!_", "Yusuf: Goodbye!"],
    meta: {
      workspacePage: "Emperor King Yusuf Quotes",
    },
  },
  {
    timestamp: 1593013680,
    dialogue: ["Ting: _Goodbye!_", "Yusuf: Hello!"],
    meta: {
      workspacePage: "Emperor King Yusuf Quotes",
    },
  },
  {
    timestamp: 1593013680,
    dialogue: [
      "Ting: Another one!",
      "Yusuf: What do you think of `data: data`?",
    ],
    meta: {
      workspacePage: "Tingker Bell Quotes",
    },
  },
  quoteWithEmptyDialogue,
  quoteWithoutAnAuthor,
];
