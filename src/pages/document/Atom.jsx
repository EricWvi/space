import PropTypes from "prop-types";
import { addAtom, AtomType, deleteAtom, NewAtom } from "../../api/editor.js";
import { Editor, Text } from "./Text";
import Image, { ImageEditor } from "./Image.jsx";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { deleteAtomAction, editAtomAction } from "./reducer.js";
import "./Document.css";
import { DispatchContext, EditContext } from "./Doc.jsx";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

Atom.propTypes = {
  atom: PropTypes.object,
  readonly: PropTypes.bool,
};

export default function Atom(props) {
  const { atom, readonly = false } = props;
  const [edit, setEdit] = useState(false);
  const { globalEdit, setGlobalEdit } = useContext(EditContext);
  const { atoms, dispatch } = useContext(DispatchContext);

  const renderAtom = (type) => {
    switch (type) {
      case AtomType.Text:
        return (
          <Text atom={atom} edit={edit} onSave={onSave} onCancel={onCancel} />
        );
      case AtomType.Image:
        return (
          <Image atom={atom} edit={edit} onSave={onSave} onCancel={onCancel} />
        );
      default:
        return <></>;
    }
  };

  const onSave = (newAtom) => {
    setEdit(false);
    setGlobalEdit(false);
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
      {renderAtom(atom.type)}
      {"   "}
      {import.meta.env.MODE === "development" && (
        <code style={{ border: "1px solid" }}>{"prev:" + atom.prevId}</code>
      )}
      {"   "}
      {import.meta.env.MODE === "development" && (
        <code style={{ border: "1px solid" }}>{"sid:" + atom.sid}</code>
      )}
    </div>
  );
}

export function AtomEditor({ prevId, type, onSave, onCancel }) {
  const { docId } = useParams();
  const atom = NewAtom(docId, type, prevId);
  const renderNewAtom = (type) => {
    switch (type) {
      case AtomType.Text:
        return <Editor atom={atom} onSave={onSave} onCancel={onCancel} />;
      case AtomType.Image:
        return <ImageEditor atom={atom} onSave={onSave} onCancel={onCancel} />;
      default:
        return <></>;
    }
  };
  return <>{renderNewAtom(type)}</>;
}
