import { ajaxGet, ajaxPost } from "./ajax";

export function getCollectionDocs(collectionId, callback) {
    ajaxPost(
        "/editor?Action=GetCollectionDocs",
        {
            collectionId
        },
        callback
    );
}

export function getCollections(callback) {
    ajaxGet(
        "/editor?Action=GetCollections",
        callback
    );
}

export function getDocAtoms(docId, callback) {
    ajaxPost(
        "/editor?Action=GetDocAtoms",
        {
            docId
        },
        callback
    );
}


