export const calculateInitials = (fullName?: string): string => {
  if (!fullName || fullName.trim() === "") {
    return ""; // Return empty string if name is not provided or is just whitespace
  }

  // Split by any whitespace and filter out empty strings (e.g., from multiple spaces)
  const words = fullName
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return ""; // Should be caught by the initial check, but defensive
  }

  // Ensure the first word is not empty (e.g. if name was just symbols that got filtered)
  // Although `filter(word => word.length > 0)` should prevent empty words.
  // And `words[0][0]` would error if words[0] was empty.
  // The filter ensures words[0] is not empty.
  const firstInitial = words[0][0];

  if (words.length > 1) {
    // Second word is present (and also non-empty due to filter)
    const secondInitial = words[1][0];
    return `${firstInitial}${secondInitial}`.toUpperCase();
  }

  return firstInitial.toUpperCase();
};
