import { visit } from "unist-util-visit";

export default function rehypeWrapCodeTitle() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      // https://github.com/atomiks/rehype-pretty-code/blob/8aef75226da451e57a7b7cf25200a6b3c7a93b19/src/index.js#L45
      if (
        node.properties &&
        node.properties["data-rehype-pretty-code-title"] === ""
      ) {
        node.children = [
          {
            type: "element",
            tagName: "span",
            properties: { "data-language": node.properties["data-language"] },
            children: node.children,
          },
        ];
      }
    });
  };
}
