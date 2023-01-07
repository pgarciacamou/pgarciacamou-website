import path from "path";

// For this to work correctly, the file structure must follow:
//    <root>/pages/post/[name]/index.mdx
// Otherwise we can't get the filename at build, and would need to resource to
// getStaticProps to be able to access __dirname and __filename.
// In this case, we better pass a canonicalUrl
export default function remarkCanonicalUrl({
  base = "https://pgarciacamou.dev",
} = {}) {
  return (_, file) => {
    // We check in case the file doesn
    if (!file.data.canonicalUrl) {
      const route = path.relative(
        path.join(process.cwd(), "pages"),
        file.dirname
      );
      file.data.canonicalUrl = path.join(base, route);
      // console.log(file.data.canonicalUrl);
    } else {
      const isRelative = !file.data.canonicalUrl.includes("https://");
      if (isRelative) {
        file.data.canonicalUrl = path.join(base, file.data.canonicalUrl);
      }
    }
  };
}
