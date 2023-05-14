declare module '*.scss' {
  const styles: { [key: string]: string };

  export default styles;
}

const base64: string;

declare module '*.svg' {
  export default base64;
}

declare module '*.gif' {
  export default base64;
}

declare module '*.png' {
  export default base64;
}

declare module '*.jpg' {
  export default base64;
}

declare module '*.jpeg' {
  export default base64;
}

declare module '*.webp' {
  export default base64;
}
