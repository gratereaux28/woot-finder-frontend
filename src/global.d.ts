/**
 * Allows importing CSS Modules without adding package-local type declarations per file.
 */
declare module '*.css';

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}