import { useContext, useEffect, useRef, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { addAtom, deleteAtom } from "../../api/editor.js";
import { DispatchContext, EditContext } from "./Doc.jsx";
import "./Document.css";
import PropTypes from "prop-types";
import { deleteAtomAction, editAtomAction } from "./reducer.js";

export function Text({ atom, readonly }) {
  const [edit, setEdit] = useState(false);
  const { globalEdit, setGlobalEdit } = useContext(EditContext);
  const { atoms, dispatch } = useContext(DispatchContext);

  const onSave = (c) => {
    setEdit(false);
    setGlobalEdit(false);
    const newAtom = {
      ...atom,
      content: c,
    };
    addAtom(newAtom, () => {
      dispatch(editAtomAction(newAtom));
    });
  };

  const onCancel = () => {
    setEdit(false);
    setGlobalEdit(false);
  };

  const hide = globalEdit ? "hide" : "";
  const classes = `edit-button ${hide}`;

  return (
    <>
      {edit ? (
        <Editor content={atom.content} onSave={onSave} onCancel={onCancel} />
      ) : (
        <div style={{ whiteSpace: "break-spaces" }}>
          {!readonly && (
            <>
              <DeleteFilled
                className={classes}
                onClick={() => {
                  const i = atoms.findIndex((a) => a.sid === atom.sid);
                  let next = "";
                  if (undefined !== atoms[i + 1]) {
                    next = atoms[i + 1].sid;
                  }
                  deleteAtom(atom.sid, next, () => {
                    dispatch(deleteAtomAction(i, next));
                  });
                }}
              />
              <EditFilled
                className={classes}
                onClick={() => {
                  setEdit(true);
                  setGlobalEdit(true);
                }}
              />
            </>
          )}
          {atom.content}
          {"   "}
          {import.meta.env.MODE === "development" && (
            <code style={{ border: "1px solid" }}>{"sid:" + atom.sid}</code>
          )}
          {"   "}
          {import.meta.env.MODE === "development" && (
            <code style={{ border: "1px solid" }}>{"prev:" + atom.prevId}</code>
          )}
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
  const { content, onSave, onCancel } = props;

  const [c, setC] = useState(content);
  const taRef = useRef(null);
  useEffect(() => {
    taRef.current.focus();
  }, [taRef]);

  const handleChange = (event) => {
    setC(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (content !== c) {
        onSave(c);
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
