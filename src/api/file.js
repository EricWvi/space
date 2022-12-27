import {ajaxPost} from "./ajax.js";

export function uploadOssFile(name, contentType, blob, callback) {
    ajaxPost(
        "/api/space/files/upload?Location=oss&Name=" + name,
        {
            sid,
            content,
            name,
            type,
            docId,
            prevId,
        },
        callback
    );
}