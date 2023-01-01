export default function remarkHoistFrontmatter() {
  return (_, file) => {
    Object.assign(file.data, file.data.frontmatter);
    delete file.data.frontmatter;
  };
}
