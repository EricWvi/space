import { ajaxGet, ajaxPost } from "./ajax";

export const AtomType = {
  Text: 1,
  Image: 2,
  Audio: 3,
  Video: 4,
};

export function addAtom({ sid, content, name, type, docId, prevId }, callback) {
  ajaxPost(
    "/editor?Action=AddAtom",
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

export function addDoc({ title, collectionId }, callback) {
  ajaxPost(
    "/editor?Action=AddDoc",
    {
      title,
      collectionId,
    },
    callback
  );
}

export function getCollectionDocs(collectionId, callback) {
  ajaxPost(
    "/editor?Action=GetCollectionDocs",
    {
      collectionId,
    },
    callback
  );
}

export function getCollections(callback) {
  ajaxGet("/editor?Action=GetCollections", callback);
}

export function getDocAtoms(docId, callback) {
  ajaxPost(
    "/editor?Action=GetDocAtoms",
    {
      docId,
    },
    callback
  );
}

export function insertAtom(
  { content, name, type, docId, prevId, nextId },
  callback
) {
  ajaxPost(
    "/editor?Action=InsertAtom",
    {
      content,
      name,
      type,
      docId,
      prevId,
      nextId,
    },
    callback
  );
}
