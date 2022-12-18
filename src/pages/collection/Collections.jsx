import {getCollections} from "../../api/editor.js";
import {useEffect, useState} from "react";

export default function Collections() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        getCollections((body) => {
            setCollections(body.message.collections);
        });
    }, []);

    return (
        <>
            {collections.map((i) => (
                <div>{i.name}</div>
            ))}
        </>
    )
}
