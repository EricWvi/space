import { getCollections } from "../../api/editor.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections((msg) => {
      setCollections(msg.collections);
    });
  }, []);

  return (
    <>
      <ul>
        {collections.map((i) => (
          <li>
            <Link to={`/doc/${i.sid}`}>{i.name}</Link>
          </li>
        ))}
      </ul>

      <Button />
    </>
  );
}
