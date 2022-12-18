import {useState} from "react";
import { Button } from 'antd';

export default function Text({value}) {
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState(value)

    const onSave = (c) => {
        setContent(c)
        setEdit(false)
    }

    return (
        <>
            {edit
                ? <Editor content={content} onSave={onSave} />
                : <div onClick={() => { setEdit(true) }}>{content}</div>
            }
        </>
    )
}

function Editor({content, onSave}) {
    const [c, setC] = useState(content)

    const handleChange = (event) => {
        setC(event.target.value);
    };

    return (
        <>
            <textarea name="text" style={{display: "block", fontSize: 16}} onChange={handleChange} value={c}></textarea>
            <Button onClick={() => {onSave(c)}}>Ok</Button>
        </>
    )
}
