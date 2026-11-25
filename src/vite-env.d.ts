declare module "*.json" {
  const value: { version: string; name: string };
  export default value;
  export const version: string;
  export const name: string;
}
