import styles from "./Home.module.css";

// function PabloGarcia() {
//   return (
//     <>
//       <meta name="author" content="Pablo Garcia" />
//       <meta name="description" content="Quality centered software engineer." />
//       <meta name="yoe" content="${new Date().getFullYear() - 2012}+" />
//       <meta
//         name="education"
//         content={\`
//           B.Eng. in Computer Software.
//           M.S. in Computer Science.
//           M.S. Specialization in Computing Systems.
//         \`}
//       />
//     </>
//   );
// }

export default function Home() {
  return (
    <div id={styles.wrapper} className={styles.container}>
      <main className={styles.main}>
        <div className={styles.spacer} />
        <h1 className={styles.title} aria-label="Pablo Garcia">
          <span style={{ color: "#808080" }}>{"<"}</span>
          <span style={{ color: "#4EC9B0" }}>{"PabloGarcia "}</span>
          <span style={{ color: "#808080" }}>{"/>"}</span>
        </h1>
        <p className={styles.description}>
          <a
            href="mailto:hello@pgarciacamou.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Say hello 👋!
          </a>
        </p>
        <pre className={[styles.code].join(" ")}>
          <code style={{ color: "#808080" }}>
            <span style={{ color: "#569CD6" }}>function</span>{" "}
            <span style={{ color: "#DCDCAA" }}>PabloGarcia</span>
            <span>{"() {\n  "}</span>
            <span style={{ color: "#C586C0" }}>return </span>
            <span>{"(\n    <>"}</span>
            <span>{"\n      <"}</span>
            <span style={{ color: "#569CD6" }}>meta </span>
            <span style={{ color: "#9CDCFE" }}>name</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>"author" </span>
            <span style={{ color: "#9CDCFE" }}>content</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>"Pablo Garcia"</span>
            <span>{" />"}</span>
            <span>{"\n      <"}</span>
            <span style={{ color: "#569CD6" }}>meta </span>
            <span style={{ color: "#9CDCFE" }}>name</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>"description" </span>
            <span style={{ color: "#9CDCFE" }}>content</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>
              "Quality centered software engineer."
            </span>
            <span>{" />"}</span>
            <span>{"\n      <"}</span>
            <span style={{ color: "#569CD6" }}>meta </span>
            <span style={{ color: "#9CDCFE" }}>name</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>"yoe" </span>
            <span style={{ color: "#9CDCFE" }}>content</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>
              "{new Date().getFullYear() - 2012}+"
            </span>
            <span>{" />"}</span>
            <span>{"\n      <"}</span>
            <span style={{ color: "#569CD6" }}>meta</span>
            <span>{"\n        "}</span>
            <span style={{ color: "#9CDCFE" }}>name</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#CE9178" }}>"education" </span>
            <span>{"\n        "}</span>
            <span style={{ color: "#9CDCFE" }}>content</span>
            <span style={{ color: "#D4D4D4" }}>=</span>
            <span style={{ color: "#569CD6" }}>{"{"}</span>
            <span style={{ color: "#CE9178" }}>
              {"`"}
              {"\n          B.Eng. in Computer Software."}
              {"\n          M.S. in Computer Science."}
              {"\n          M.S. Specialization in Computing Systems."}
              {"\n        `"}
            </span>
            <span style={{ color: "#569CD6" }}>{"}"}</span>
            <span>{"\n      />"}</span>
            <span>{"\n    </>"}</span>
            <span>{"\n  )"}</span>
            <span style={{ color: "#D4D4D4" }}>;</span>
            <span>{"\n}"}</span>
          </code>
        </pre>
      </main>

      <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/pgarciacamou"
          className={styles.contactLink}
          style={{
            backgroundImage: "url('/images/iconmonstr-twitter.svg')",
          }}
        >
          Twitter
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/pgarciacamou"
          className={styles.contactLink}
          style={{
            backgroundImage: "url('/images/iconmonstr-github.svg')",
          }}
        >
          GitHub
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/pablogarciacamou"
          className={styles.contactLink}
          style={{
            backgroundImage: "url('/images/iconmonstr-linkedin.svg')",
          }}
        >
          LinkedIn
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/@pgarciacamou"
          className={styles.contactLink}
          style={{
            backgroundImage: "url('/images/iconmonstr-medium.svg')",
          }}
        >
          Medium
        </a>
      </footer>
    </div>
  );
}
