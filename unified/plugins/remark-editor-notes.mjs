import { remove } from "unist-util-remove";

function hasAttributeName(attribute) {
  return (node) =>
    node &&
    node.attributes &&
    node.attributes.some(({ name }) => name === attribute);
}

export default function remarkEditorNotes() {
  return (tree) => {
    if (process.env.VERCEL_ENV === "production") {
      console.log("log   - editor notes removed");
      remove(tree, { cascade: true }, hasAttributeName("editornotes"));
    }
  };
}
