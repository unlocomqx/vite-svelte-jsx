import { FilterPattern } from "@rollup/pluginutils";
import { Plugin } from "vite";

declare interface FilterOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

declare function createPlugin (
  options?: FilterOptions & { babelPlugins?: any[] }
): Plugin

export default createPlugin;
