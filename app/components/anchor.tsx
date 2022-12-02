"use client";

import { useState } from "react";
import cx from "classnames";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./anchor.module.css";

type AnchorProps = {
  prefix: string;
  href: string;
  value: string;
  title: string;
};

export function Anchor({
  prefix = "",
  href,
  value,
  title,
  ...props
}: AnchorProps) {
  const [isVisible, setVisibility] = useState(false);
  const toggleVisibility = () => setVisibility((s) => !s);

  return (
    <div {...props}>
      <span className="anchor_controls">
        <button
          type="button"
          style={{ display: "inline" }}
          onClick={toggleVisibility}
          title={isVisible ? "Hide" : "Show"}
        >
          <i
            className={cx("far", {
              "fa-eye": !isVisible,
              "fa-eye-slash": isVisible,
            })}
          />
        </button>
        <a
          href={`${prefix}${href}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
        >
          <i className="fas fa-external-link-alt" />
        </a>
        <CopyToClipboard text={href}>
          <button type="button" title="Copy to clipboard">
            <i className="far fa-copy" />
          </button>
        </CopyToClipboard>
      </span>
      <a href={`${prefix}${href}`} title={title}>
        {isVisible ? href : value}
      </a>
    </div>
  );
}
