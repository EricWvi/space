import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDocAtoms} from "../../api/editor.js";
import Text from "./Text";

export default function Doc() {
    const { colId, docId } = useParams();
    const [atoms, setAtoms] = useState([]);

    useEffect(() => {
        getDocAtoms(docId, (body) => {
            setAtoms(body.message.atoms);
        });
    }, []);

    return(
        <>
            {atoms.map((i) => (
                <Text value={i.content} key={i.sid} />
            ))}
        </>
    )
}