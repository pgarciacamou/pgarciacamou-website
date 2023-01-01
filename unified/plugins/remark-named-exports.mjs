const expr = (val) => {
  if (val instanceof Date) return `new Date("${val}")`;
  return JSON.stringify(val);
};

export default function remarkNamedExports() {
  return (tree, file) => {
    tree.children.push(
      ...Object.keys(file.data).map((attr) => ({
        type: "export",
        value: `export const ${attr} = ${expr(file.data[attr])};`,
      }))
    );
  };
}
