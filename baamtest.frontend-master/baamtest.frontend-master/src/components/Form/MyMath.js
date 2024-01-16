import React, { useCallback } from "react";

export const renderMath = node => {
  if (window.MathJax) {
    window.MathJax.Hub.Queue(window.MathJax.Hub.Typeset(node));
    //window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, node]);
  }
};

function MyMath({ value }) {
  const onRefChange = useCallback(
    node => {
      if (node) {
        renderMath(node);
      }
    },
    [value],
  );

  return (
    <span
      style={{
        display: "flex",
        width: "100%",
        marginRight: "10px",
      }}
      ref={onRefChange}
      // dangerouslySetInnerHTML={{ __html: value.replaceAll("_{", "_\\text{") }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default MyMath;
