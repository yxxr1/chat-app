declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare const __API_URL__ = string;
declare const __WS_URL__ = string;
