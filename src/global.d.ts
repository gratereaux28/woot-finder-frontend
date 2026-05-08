/**
 * Allows importing CSS Modules without adding package-local type declarations per file.
 */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
