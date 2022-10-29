export const regexEscape = (s: unknown) => {
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};