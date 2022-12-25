import { useParams } from "react-router-dom";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { AtomType, getDocAtoms, insertAtom } from "../../api/editor.js";
import {
  FileImageOutlined,
  FileTextOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import "./Document.css";
import PropTypes from "prop-types";
import { atomsReducer, initAction, insertAtomAction } from "./reducer.js";
import History from "./History";
import DocDragDrop from "./DocDragDrop";
import { Modal, Popover } from "antd";
import Atom, { AtomEditor } from "./Atom";

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

AddIcon.propType = {
  prev: PropTypes.string,
  next: PropTypes.string,
  index: PropTypes.number,
};

export function AddIcon(props) {
  const { prev, next, index } = props;
  const [display, setDisplay] = useState(false);
  const { globalEdit, setGlobalEdit } = useContext(EditContext);
  const { dispatch } = useContext(DispatchContext);
  const [newAtomType, setNewAtomType] = useState(AtomType.Text);
  const [pop, setPop] = useState(false);
  const modalInit = {
    open: false,
    title: "",
    ok: () => {},
    cancel: () => {},
    children: <></>,
  };
  const [modal, setModal] = useState(modalInit);

  const onClick = (type) => {
    setGlobalEdit(true);
    showEditor(type);
  };

  const showEditor = (type) => {
    switch (type) {
      case AtomType.Text:
        setDisplay(true);
        setNewAtomType(type);
        break;
      case AtomType.Image:
        setModal({
          open: true,
          title: "Add image",
          ok: () => {
            setModal(modalInit);
            onCancel();
          },
          cancel: () => {
            setModal(modalInit);
            onCancel();
          },
          children: <></>,
        });
        break;
      default:
        break;
    }
  };

  const onSave = (atom) => {
    setDisplay(false);
    setGlobalEdit(false);
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

  const optionClass = { marginLeft: "10px", fontSize: 18 };

  const atomOptions = (
    <div
      style={{
        display: "flex",
        padding: "0 10px",
        height: 40,
        alignItems: "center",
      }}
    >
      <FileTextOutlined
        style={optionClass}
        onClick={() => {
          onClick(AtomType.Text);
        }}
      />
      <FileImageOutlined
        style={optionClass}
        onClick={() => {
          setPop(false);
          onClick(AtomType.Image);
        }}
      />
    </div>
  );

  return (
    <>
      {display ? (
        <AtomEditor
          prevId={prev}
          type={newAtomType}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <>
          <Popover
            open={pop}
            onOpenChange={(newOpen) => setPop(newOpen)}
            placement="right"
            title={"Atom Type"}
            content={atomOptions}
            trigger="click"
          >
            <PlusSquareFilled className={classes} />
          </Popover>
          <AddModal modal={modal} />
          {"   "}
          {import.meta.env.MODE === "development" && (
            <code style={{ border: "1px solid" }}>{"prev:" + prev}</code>
          )}
          {"   "}
          {import.meta.env.MODE === "development" && (
            <code style={{ border: "1px solid" }}>{"next:" + next}</code>
          )}
        </>
      )}
    </>
  );
}

function AddModal({ modal }) {
  const { open, title, ok, cancel, children } = modal;
  const handleOk = () => {
    // setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      // setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={ok}
        // confirmLoading={confirmLoading}
        onCancel={cancel}
      >
        {children}
      </Modal>
    </>
  );
}
