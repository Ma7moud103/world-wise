function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export { convertToEmoji , baseUrl };
