declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare const process = { env: Record<string, string> };
