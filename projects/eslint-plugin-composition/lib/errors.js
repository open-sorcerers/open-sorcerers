const PREFER_SELECTOR =
  'Use a selector function instead of a literal with nested property access.';
const preferNamedSelector = named =>
  PREFER_SELECTOR.replace(/a literal/, '"' + named + '"');

module.exports = { PREFER_SELECTOR, preferNamedSelector };
