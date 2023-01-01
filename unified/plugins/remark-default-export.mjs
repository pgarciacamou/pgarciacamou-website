// Inspired by https://github.com/phuctm97/phuctm97.com/blob/f500aef6054e50f8a1df11e2a8b8516dbf84ae09/unified/plugins/default-export.js
// And by https://github.com/phuctm97/phuctm97.com/blob/00b083ef8e8f252c60f61aa1fd4bf0aeefe15027/scripts/remark-page.js
import AST from "abstract-syntax-tree";

export default function remarkDefaultExport({
  path = "../../app/components/blog.layout",
  name = "Layout",
} = {}) {
  return (tree, file) => {
    const { frontmatter = {}, ...rest } = file.data;
    const data = { ...frontmatter, ...rest };
    const LAYOUT = {
      IMPORT: `import ${name} from "${path}";`,
      EXPORT: `export default ${name}(JSON.parse(\`${JSON.stringify(
        data
      )}\`));`,
    };
    tree.children.unshift(
      {
        type: "mdxjsEsm",
        value: LAYOUT.IMPORT,
        data: {
          estree: AST.parse(LAYOUT.IMPORT),
        },
      },
      {
        type: "mdxjsEsm",
        default: true,
        value: LAYOUT.EXPORT,
        data: {
          estree: AST.parse(LAYOUT.EXPORT),
        },
      }
    );
  };
}
