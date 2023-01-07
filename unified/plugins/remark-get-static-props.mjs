import AST from "abstract-syntax-tree";

export default function remarkGetStaticProps(callback) {
  return (tree, file) => {
    const exportStr = `
      export const getStaticProps = () => (callback => callback())(${callback.toString()})
    `.trim();
    if (tree.children && tree.children.length) {
      tree.children.push({
        type: "mdxjsEsm",
        value: exportStr,
        data: {
          estree: AST.parse(exportStr),
        },
      });
    }
  };
}
