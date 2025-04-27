export const generateSlug = (text: string): string =>
	text
		.normalize("NFD") // Normalize to separate accent marks
		// biome-ignore lint/suspicious/noMisleadingCharacterClass: removing diacritics safely
		.replace(/[\u0300-\u036f]/g, "") // Remove accent marks
		.toLowerCase() // Convert to lowercase
		.replace(/[^a-z0-9]+/g, "-") // Replace invalid sequences with hyphen
		.replace(/^-+|-+$/g, ""); // Remove hyphens at start and end

export const generateStamp = (): string => Date.now().toString(36);
