// Copied from https://github.com/nicholasray/nray.dev/blob/2d6c442c53f78ce38a1f24a394034c685ba08276/src/remark/remarkComputedFrontmatter.mjs
import { visit } from "unist-util-visit";
import { load, dump } from "js-yaml";

export default function remarkComputedFrontmatter(callback) {
  return (tree, file) => {
    visit(tree, "yaml", (node) => {
      const result = callback(load(node.value), file);
      file.data = result;
      // node.value = dump(result);
    });
  };
}
