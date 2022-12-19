import styles from "./Home.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const description = `
function PabloGarcia() {
  return (
    <>
      <meta name="author" content="Pablo Garcia" />
      <meta name="description" content="Quality centered software engineer." />
      <meta name="yoe" content="${new Date().getFullYear() - 2012}+" />
      <meta
        name="education"
        content={\`
          B.Eng. in Computer Software.
          M.S. in Computer Science.
          M.S. Specialization in Computing Systems.
        \`}
      />
    </>
  );
}
`;

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
        <pre>
          <code
            className="hljs language-jsx"
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(description.trim(), { language: "jsx" })
                .value,
            }}
          />
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
