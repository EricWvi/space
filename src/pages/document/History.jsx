import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { DispatchContext, HistoryContext } from "./Doc.jsx";
import { getDoc, getDocAtoms } from "../../api/editor.js";
import { initAction } from "./reducer.js";
import {
  BackwardFilled,
  CaretLeftFilled,
  CaretRightFilled,
  ForwardFilled,
} from "@ant-design/icons";

export default function History({ docId }) {
  const { atoms, dispatch } = useContext(DispatchContext);
  const { historyMode, setHistoryMode } = useContext(HistoryContext);
  const [docVersion, setDocVersion] = useState(0);

  useEffect(() => {
    getDocAtoms(docId, docVersion, (msg) => {
      dispatch(initAction(msg.atoms));
    });
  }, [docVersion]);

  const enterHistory = () => {
    getDoc(docId, (msg) => {
      setDocVersion(msg.version - 1);
      setHistoryMode(true);
    });
  };

  const exitHistory = () => {
    getDoc(docId, (msg) => {
      setDocVersion(msg.version);
      setHistoryMode(false);
    });
  };

  const backwardByOne = () => {
    setDocVersion((v) => (v > 1 ? v - 1 : 1));
  };

  const backwardByFive = () => {
    setDocVersion((v) => (v > 6 ? v - 5 : 1));
  };

  const forwardByOne = () => {
    setDocVersion((v) => v + 1);
  };

  const forwardByFive = () => {
    setDocVersion((v) => v + 5);
  };

  return (
    <>
      {historyMode ? (
        <>
          <div>doc version: {docVersion}</div>
          <BackwardFilled onClick={backwardByFive} />
          <CaretLeftFilled onClick={backwardByOne} />
          <CaretRightFilled onClick={forwardByOne} />
          <ForwardFilled onClick={forwardByFive} />
          <Button style={{ margin: "10px" }} onClick={exitHistory}>
            Exit
          </Button>
        </>
      ) : (
        <Button
          style={{ margin: "10px", display: "block" }}
          onClick={enterHistory}
        >
          History
        </Button>
      )}
    </>
  );
}
