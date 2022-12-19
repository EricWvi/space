import { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import { addAtom } from "../../api/editor.js";
import { EditContext } from "./Doc.jsx";
import "./Document.css";

export function Text({ atom }) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(atom.content);

  useEffect(() => {
    setContent(atom.content);
  }, [atom]);

  const { globalEdit, setGlobalEdit } = useContext(EditContext);

  const onSave = (c, hasChange) => {
    setContent(c);
    setEdit(false);
    setGlobalEdit(false);
    if (hasChange) {
      addAtom(
        {
          sid: atom.sid,
          content: c,
          name: atom.name,
          type: atom.type,
          docId: atom.docId,
          prevId: atom.prevId,
        },
        () => {}
      );
    }
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
        <Editor content={content} onSave={onSave} onCancel={onCancel} />
      ) : (
        <div>
          <EditFilled
            className={classes}
            onClick={() => {
              setEdit(true);
              setGlobalEdit(true);
            }}
          />
          {content}
        </div>
      )}
    </>
  );
}

export function Editor({ content, onSave, onCancel }) {
  const [c, setC] = useState(content);

  const handleChange = (event) => {
    setC(event.target.value);
  };

  return (
    <>
      <textarea
        name="text"
        style={{ display: "block", fontSize: 16 }}
        onChange={handleChange}
        value={c}
      ></textarea>
      <Button
        onClick={() => {
          if (content === c) {
            onSave(c, false);
          } else {
            onSave(c, true);
          }
        }}
      >
        Ok
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
      <br />
    </>
  );
}
