import "./theme.css";
import styles from "./theme.module.css";

export function Theme() {
  return (
    <div id="theme" className={styles.theme}>
      <label htmlFor="theme">Theme: </label>
      <select name="theme" defaultValue="os-default">
        <option value="os-default">os-default</option>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
    </div>
  );
}
