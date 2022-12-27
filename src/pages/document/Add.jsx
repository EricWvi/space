import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AtomType, insertAtom } from "../../api/editor.js";
import { insertAtomAction } from "./reducer.js";
import {
  FileImageOutlined,
  FileTextOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { AtomEditor } from "./Atom.jsx";
import { Modal, Popover } from "antd";
import { DispatchContext, EditContext } from "./Doc.jsx";
import { AddImageModal } from "./Image.jsx";

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
        setModal(
          AddImageModal(
            () => {
              setModal(modalInit);
              onCancel();
            },
            () => {
              setModal(modalInit);
              onCancel();
            }
          )
        );
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
