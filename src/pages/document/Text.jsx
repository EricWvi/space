import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export function Text(props) {
  const { atom, edit, onSave, onCancel } = props;

  return (
    <>
      {edit ? (
        <Editor atom={atom} onSave={onSave} onCancel={onCancel} />
      ) : (
        <div style={{ whiteSpace: "break-spaces", display: "inline" }}>
          {atom.content}
        </div>
      )}
    </>
  );
}

Editor.propTypes = {
  content: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export function Editor(props) {
  const { atom, onSave, onCancel } = props;

  const [c, setC] = useState(atom.content);
  const taRef = useRef(null);
  useEffect(() => {
    taRef.current.focus();
  }, [taRef]);

  const handleChange = (event) => {
    setC(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (atom.content !== c) {
        onSave({
          ...atom,
          content: c,
        });
      } else {
        onCancel();
      }
    }
  };

  const handleNotFocus = () => {
    onCancel();
  };

  return (
    <>
      <textarea
        name="text"
        ref={taRef}
        onBlur={handleNotFocus}
        style={{ display: "block", fontSize: 16 }}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={c}
      ></textarea>
    </>
  );
}
