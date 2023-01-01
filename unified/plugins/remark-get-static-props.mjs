import AST from "abstract-syntax-tree";

export default function remarkGetStaticProps(callback) {
  return (tree, file) => {
    const exportStr = `
      export const getStaticProps = () => (callback => callback())(${callback.toString()})
    `.trim();
    tree.children.push(
      ...Object.keys(file.data).map((attr) => ({
        type: "mdxjsEsm",
        value: exportStr,
        data: {
          estree: AST.parse(exportStr),
        },
      }))
    );
  };
}
