import { Image as AntdImg } from "antd";

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

export function ImageEditor(props) {
  const { atom, onSave, onCancel } = props;

  return <></>;
}
