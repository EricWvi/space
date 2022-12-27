import { Button, Image as AntdImg, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function Image(props) {
  const { atom, edit, onSave, onCancel } = props;
  return (
    <>
      {edit ? (
        <ImageEditor atom={atom} onSave={onSave} onCancel={onCancel} />
      ) : (
        <AntdImg src={atom.link} alt={atom.name} />
      )}
    </>
  );
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export function ImageEditor(props) {
  const { atom, onSave, onCancel } = props;
  const [blob, setBlob] = useState(null);
  const [contentType, setContentType] = useState("");
  const [base64, setBase64] = useState("");
  const [show, setShow] = useState(false);

  const getClipboardContents = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      console.log(clipboardItems);
      loop: for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.indexOf("image") !== -1) {
            setContentType(type);
            const blob = await clipboardItem.getType(type);
            setBlob(blob);
            getBase64(blob, (rst) => {
              setBase64(rst);
              setShow(true);
            })
            break loop;
          }
        }
      }
    } catch (err) {
      console.error(err.name, err.message);
      message.error(err.name, err.message);
    }
  };
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

  return (
    <div>
      <Button onClick={getClipboardContents}>c</Button>
      {show && <img src={base64} alt={""} />}
    </div>
  );
}

export const AddImageModal = (ok, cancel) => {
  return {
    open: true,
    title: "Add image",
    ok,
    cancel,
    // use key to avoid state preserving
    children: <ImageEditor key={Date.now()} />,
  };
};



