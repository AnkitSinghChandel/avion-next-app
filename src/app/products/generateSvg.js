export const generateSvg = async ({
  productName,
  productTitle,
  productWidth = 1200,
  productHeight = 800,
  color = "#256d63",
  productColor = "#256d63",
  endColor = "#256d63",
}) => {
  const response = await fetch("/avion-template.svg");

  let svg = await response.text();
  console.log("asc34 svg text", svg);

  const limitText = (text, max) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  // Replace placeholders
  svg = svg
    .replaceAll(
      "{{TITLE}}",
      limitText(productTitle, 50) || "AVION AIRCRAFT PARTS",
    )
    .replaceAll("{{NAME}}", limitText(productName, 50) || "Avionics Unit")
    .replaceAll("{{WIDTH}}", productWidth.toString())
    .replaceAll("{{HEIGHT}}", productHeight.toString())
    .replaceAll("{{LENGTH}}", length.toString());

  // Colors
  svg = svg.replaceAll("#C9A227", color); // text color

  // Icon gradient
  svg = svg.replace(
    '<stop offset="0%" stop-color="#256d63"/>',
    `<stop offset="0%" stop-color="${productColor}"/>`,
  );

  svg = svg.replace(
    '<stop offset="100%" stop-color="#75b8a7"/>',
    `<stop offset="100%" stop-color="${endColor}"/>`,
  );

  svg = svg.replace(/font-size="18"/, 'font-size="24"'); // Avion text

  svg = svg.replace(/fill="#C8A34A"/, 'fill="#8d7b68"'); // AVion text

  return svg;
};
