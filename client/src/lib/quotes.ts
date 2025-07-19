export const motivationalQuotes = [
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "Your body can do it. It's your mind you have to convince.",
    author: "Unknown"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  },
  {
    text: "Physical fitness is not only one of the most important keys to a healthy body, but it is the basis of dynamic and creative intellectual activity.",
    author: "John F. Kennedy"
  },
  {
    text: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt"
  },
  {
    text: "To enjoy the glow of good health, you must exercise.",
    author: "Gene Tunney"
  }
];

export const getDailyQuote = () => {
  const today = new Date().getDate();
  const quoteIndex = today % motivationalQuotes.length;
  return motivationalQuotes[quoteIndex];
};
