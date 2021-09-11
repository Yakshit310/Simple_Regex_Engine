
function matchLetter(pattern, text) {
  if (!pattern) return true;
  if (!text) return false;
  return pattern === "." || text === pattern;
}

function matchQuestion(pattern, text) {
  return (
    (matchLetter(pattern[0], text[0]) && matchLetter(pattern.slice(2), text.slice(1))) ||
    matchWord(pattern.slice(2), text)
  );
}

function matchStar(pattern, text) {
  return (
    (matchLetter(pattern[0], text[0]) && matchWord(pattern, text.slice(1))) ||
    matchWord(pattern.slice(2), text)
  );
}

function search(pattern, text) {
  if (pattern[0] === "^") {
    return matchWord(pattern.slice(1), text);
  } else {
    return matchWord(".*" + pattern, text);
  }
}

function matchWord(pattern, text) {
  if (!pattern) return true;
  else if (!text && pattern === "$") return true;
  else if (pattern[1] === "?") {
    return matchQuestion(pattern, text);
  } else if (pattern[1] === "*") {
    return matchStar(pattern, text);
  } else {
    return matchLetter(pattern[0], text[0]) && matchWord(pattern.slice(1), text.slice(1));
  }
}

module.exports = {
  matchLetter,
  matchWord,
  search
};
