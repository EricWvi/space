import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, getCollectionDocs } from "../../api/editor.js";
import { Link, useParams } from "react-router-dom";
import { Button, Input } from "antd";

const DocContext = createContext(null);

export default function Collection() {
  const { colId } = useParams();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getCollectionDocs(colId, (msg) => {
      setDocs(msg.docs);
    });
  }, []);

  return (
    <>
      <ul>
        {docs.map((i) => (
          <li key={i.sid}>
            <Link to={`/doc/${colId}/${i.sid}`}>{i.title}</Link>
          </li>
        ))}
      </ul>
      <DocContext.Provider value={{ docs, setDocs }}>
        <AddDoc collectionId={colId} />
      </DocContext.Provider>
    </>
  );
}

function AddDoc({ collectionId }) {
  const [title, setTitle] = useState("");
  const { setDocs } = useContext(DocContext);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onClick = () => {
    setTitle("");
    addDoc({ title, collectionId }, (msg) => {
      setDocs((docs) => [...docs, { sid: msg.sid, collectionId, title }]);
    });
  };

  return (
    <div style={{ width: 200 }}>
      <Input value={title} onChange={onChange} />
      <Button onClick={onClick}>Add</Button>
    </div>
  );
}
