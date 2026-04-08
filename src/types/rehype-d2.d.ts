declare module "rehype-d2" {
  import type { Root } from "hast";

  interface RehypeD2Options {
    /** Light theme ID (default: 0) */
    theme?: number;
    /** Dark theme ID (default: 200) */
    darkTheme?: number;
    /** Enable sketch mode (default: false) */
    sketch?: boolean;
    /** Path to d2 binary (default: "d2") */
    binPath?: string;
    /** Timeout in milliseconds (default: 10000) */
    timeoutMs?: number;
  }

  function rehypeD2(options?: RehypeD2Options): (tree: Root) => void;
  export default rehypeD2;
}
