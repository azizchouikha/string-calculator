export function add(numbers) {
  if (numbers === "") {
    return 0;
  }
  let content = numbers;
  let delimiters = /,|\n/;
  if (numbers.startsWith("//")) {
    // extraire la section des délimiteurs et le contenu
    const newlineIndex = numbers.indexOf("\n");
    const delimiterPart = numbers.slice(2, newlineIndex);
    content = numbers.slice(newlineIndex + 1);

    // gérer un ou plusieurs délimiteurs entre crochets
    let rawDelimiters;
    if (delimiterPart.startsWith("[") && delimiterPart.endsWith("]")) {
      // récupère chaque contenu entre [ ]
      rawDelimiters = Array.from(
        delimiterPart.matchAll(/\[([^\]]+)\]/g),
        m => m[1]
      );
    } else {
      rawDelimiters = [delimiterPart];
    }

    // échapper les métacaractères et construire la RegExp
    const escapedDelims = rawDelimiters.map(d =>
      d.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    );
    delimiters = new RegExp(escapedDelims.join("|"));
  } else {
    if (numbers.includes(",\n") || numbers.includes("\n,")) {
      throw new Error("Invalid input");
    }
  }
  const tokens = content.split(delimiters);

  const values = tokens.map(n => parseInt(n, 10));
  const negatives = values.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed. [${negatives.join(',')}]`);
  }

  // Ignorer les nombres strictement supérieurs à 1000
  const filtered = values.filter(n => n <= 1000);
  return filtered.reduce((acc, n) => acc + n, 0);
}
