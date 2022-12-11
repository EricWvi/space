import {useParams} from "react-router-dom";

export default function Doc() {
    let { docId } = useParams();
    return(
        <>
            <h1>docId: {docId}</h1>
        </>
    )
}