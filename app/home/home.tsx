import styles from "./Home.module.css";

const descriptionCode = `
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
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.spacer} />
        <h1 className={styles.title} aria-label="Pablo Garcia">
          {"<PabloGarcia />"}
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
          <code>{descriptionCode.trim()}</code>
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
      </footer>
    </div>
  );
}
