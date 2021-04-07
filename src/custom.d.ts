declare module "*.svg" {
  const content: any;
  export default content;
}
declare namespace JSX {
  interface IntrinsicElements {
    wgss: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
  }
}
