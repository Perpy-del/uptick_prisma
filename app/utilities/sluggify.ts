function sluggify(text: string): string {
    if (!text) {
        return ""
    };
  
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s-]/g, '') // Remove non-word, non-space, and non-hyphen characters
      .replace(/\s+/g, '-') // Replace whitespace with hyphens
      .replace(/-+$/, ''); // Remove trailing hyphens
}

export {sluggify};