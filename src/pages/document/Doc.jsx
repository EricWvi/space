import { useParams } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { addAtom, getDocAtoms, insertAtom } from "../../api/editor.js";
import { Editor, Text } from "./Text";
import { PlusSquareFilled } from "@ant-design/icons";

export const EditContext = createContext(null);
export const AtomContext = createContext(null);
export const FirstSidContext = createContext(null);

export default function Doc() {
  const { colId, docId } = useParams();
  const [atoms, setAtoms] = useState([]);
  const [firstSid, setFirstSid] = useState("");
  const [globalEdit, setGlobalEdit] = useState(false);

  useEffect(() => {
    getDocAtoms(docId, (msg) => {
      setAtoms(msg.atoms);
      if (msg.atoms.length !== 0) {
        setFirstSid(msg.atoms[0].sid);
      }
    });
  }, []);

  return (
    <FirstSidContext.Provider value={{ firstSid, setFirstSid }}>
      <AtomContext.Provider value={{ atoms, setAtoms }}>
        <EditContext.Provider value={{ globalEdit, setGlobalEdit }}>
          <AddIcon prev={""} next={firstSid} index={0} />
          <>
            {atoms.map((item, index) => {
              let next = "";
              if (index < atoms.length - 1) {
                next = atoms[index + 1].sid;
              }
              return (
                <div key={index}>
                  <Text atom={item} />
                  <AddIcon
                    prev={atoms[index].sid}
                    next={next}
                    index={index + 1}
                  />
                </div>
              );
            })}
          </>
        </EditContext.Provider>
      </AtomContext.Provider>
    </FirstSidContext.Provider>
  );
}

function AddIcon({ prev, next, index }) {
  const { docId } = useParams();
  const [display, setDisplay] = useState(false);
  const { globalEdit, setGlobalEdit } = useContext(EditContext);
  const { atoms, setAtoms } = useContext(AtomContext);
  const { setFirstSid } = useContext(FirstSidContext);

  const onClick = () => {
    setDisplay(true);
    setGlobalEdit(true);
  };

  const onSave = (content) => {
    setDisplay(false);
    setGlobalEdit(false);
    let atom = {
      sid: "",
      docId: docId,
      type: "text",
      prevId: prev,
      content,
      name: "",
    };
    insertAtom({ nextId: next, ...atom }, (msg) => {
      atom.sid = msg.sid;
      if (index !== atoms.length) {
        atoms[index].prevId = atom.sid;
      }
      if (index === 0) {
        setFirstSid(atom.sid);
      }
      atoms.splice(index, 0, atom);
      setAtoms([...atoms]);
    });
  };

  const onCancel = () => {
    setDisplay(false);
    setGlobalEdit(false);
  };

  const hide = globalEdit ? "hide" : "";
  const classes = `add-button ${hide}`;

  return (
    <>
      {display ? (
        <Editor onSave={onSave} onCancel={onCancel} />
      ) : (
        <PlusSquareFilled className={classes} onClick={onClick} />
      )}
    </>
  );
}
