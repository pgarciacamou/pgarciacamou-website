// Inspired by https://github.com/mdx-js/mdx/discussions/1971
// And by https://github.com/phuctm97/phuctm97.com/blob/f500aef6054e50f8a1df11e2a8b8516dbf84ae09/unified/plugins/default-export.js
// And by https://github.com/phuctm97/phuctm97.com/blob/00b083ef8e8f252c60f61aa1fd4bf0aeefe15027/scripts/remark-page.js
// import * as acorn from "acorn";
// import jsx from "acorn-jsx";
// const JSXParser = acorn.Parser.extend(jsx());
// import AST from "abstract-syntax-tree";

export default function remarkDefaultExport({
  // @TODO Use path.cwd instead...
  path = "../../../app/components/blog.layout",
  name = "Layout",
} = {}) {
  return (tree, file) => {
    if (tree.children) {
      // const LAYOUT = {
      //   IMPORT: `import ${name} from "${path}";`,
      //   EXPORT: `export default ${name}(JSON.parse(\`${JSON.stringify(
      //     file.data
      //   )}\`));`,
      // };
      /**
       * To generate AST:
       * ===============
       * - https://astexplorer.net/
       * - https://mdxjs.com/playground/
       * - https://github.com/mdx-js/mdx/discussions/1971#discussioncomment-4576664
       */
      tree.children.unshift(
        {
          type: "mdxjsEsm",
          value: `import ${name} from "${path}";`,
          data: {
            estree: {
              type: "Program",
              body: [
                {
                  type: "ImportDeclaration",
                  specifiers: [
                    {
                      type: "ImportDefaultSpecifier",
                      local: {
                        type: "Identifier",
                        name: name,
                      },
                    },
                  ],
                  source: {
                    type: "Literal",
                    value: `${path}`,
                    raw: `'${path}'`,
                  },
                },
              ],
              sourceType: "module",
            },
            // estree: AST.parse(LAYOUT.IMPORT),
            // estree: JSXParser.parse(LAYOUT.IMPORT, {
            //   ecmaVersion: "latest",
            //   sourceType: "module",
            // }),
          },
        },
        {
          type: "mdxjsEsm",
          value: `export default ${name}(JSON.parse(\`${JSON.stringify(
            file.data
          )}\`));`,
          data: {
            // estree: AST.parse(LAYOUT.EXPORT),
            // estree: JSXParser.parse(LAYOUT.EXPORT, {
            //   ecmaVersion: "latest",
            //   sourceType: "module",
            // }),
            estree: {
              type: "Program",
              body: [
                {
                  type: "ExportDefaultDeclaration",
                  declaration: {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name,
                    },
                    arguments: [
                      {
                        type: "CallExpression",
                        callee: {
                          type: "MemberExpression",
                          object: {
                            type: "Identifier",
                            name: "JSON",
                          },
                          property: {
                            type: "Identifier",
                            name: "parse",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                              {
                                type: "TemplateElement",
                                value: {
                                  raw: JSON.stringify(file.data),
                                  cooked: JSON.stringify(file.data),
                                },
                                tail: true,
                              },
                            ],
                          },
                        ],
                        optional: false,
                      },
                    ],
                    optional: false,
                  },
                },
              ],
              sourceType: "module",
            },
          },
        }
      );
    }
  };
}
