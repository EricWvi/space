import { useParams } from "react-router-dom";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getDocAtoms, insertAtom } from "../../api/editor.js";
import { Editor, Text } from "./Text";
import { PlusSquareFilled } from "@ant-design/icons";
import "./Document.css";
import PropTypes from "prop-types";
import {
  atomsReducer,
  initAction,
  insertAtomAction,
  reorder,
} from "./reducer.js";
import History from "./History";
import DocDragDrop from "./DocDragDrop";

export const EditContext = createContext(null);
export const HistoryContext = createContext(null);
export const DispatchContext = createContext(null);

export default function Doc() {
  const { colId, docId } = useParams();
  const [atoms, dispatch] = useReducer(atomsReducer, []);
  const [globalEdit, setGlobalEdit] = useState(false);
  const [historyMode, setHistoryMode] = useState(false);
  let firstSid = "";
  if (atoms.length !== 0) {
    firstSid = atoms[0].sid;
  }

  useEffect(() => {
    getDocAtoms(docId, 0, (msg) => {
      dispatch(initAction(msg.atoms));
    });
  }, []);

  return (
    <DispatchContext.Provider value={{ atoms, dispatch }}>
      <EditContext.Provider value={{ globalEdit, setGlobalEdit }}>
        <HistoryContext.Provider value={{ historyMode, setHistoryMode }}>
          <History docId={docId} />
          {historyMode ? (
            <>
              {atoms.map((item, index) => (
                <Text key={index} atom={item} readonly={true} />
              ))}
            </>
          ) : (
            <>
              <div style={{ margin: "0 8px" }}>
                <AddIcon prev={""} next={firstSid} index={0} />
              </div>
              <DocDragDrop />
            </>
          )}
        </HistoryContext.Provider>
      </EditContext.Provider>
    </DispatchContext.Provider>
  );
}

AddIcon.propType = {
  prev: PropTypes.string,
  next: PropTypes.string,
  index: PropTypes.number,
};

export function AddIcon(props) {
  const { prev, next, index } = props;

  const { docId } = useParams();
  const [display, setDisplay] = useState(false);
  const { globalEdit, setGlobalEdit } = useContext(EditContext);
  const { dispatch } = useContext(DispatchContext);

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
      dispatch(insertAtomAction(index, atom));
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
