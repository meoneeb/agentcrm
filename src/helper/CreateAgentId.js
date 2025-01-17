export default function createAgentId(fullName) {
  if (typeof fullName !== "string") {
    throw new Error("Input must be a string");
  }

  return fullName
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .toLowerCase(); // Convert to lowercase
}
