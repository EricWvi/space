import { useParams } from "react-router-dom";
import { createContext, useEffect, useReducer, useState } from "react";
import { getDocAtoms } from "../../api/editor.js";
import { atomsReducer, initAction } from "./reducer.js";
import History from "./History";
import DocDragDrop from "./DocDragDrop";
import Atom from "./Atom";
import { AddIcon } from "./Add.jsx";

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
                <Atom key={index} atom={item} readonly={true} />
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
