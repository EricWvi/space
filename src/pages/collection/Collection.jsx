import {useEffect, useState} from "react";
import {getCollectionDocs} from "../../api/editor.js";
import {useParams} from "react-router-dom";

export default function Collection() {
    const { colId } = useParams();
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        getCollectionDocs(colId, (body) => {
            setDocs(body.message.docs);
        });
    }, []);

    return (
        <>
            {docs.map((i) => (
                <div>{i.title}</div>
            ))}
        </>
    )
}
