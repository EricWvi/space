import { ajaxGet, ajaxPost } from "./ajax";

export const AtomType = {
  Text: 1,
  Image: 2,
  Audio: 3,
  Video: 4,
};

export function addAtom({ sid, content, name, type, docId, prevId }, callback) {
  ajaxPost(
    "/space/editor?Action=AddAtom",
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
    "/space/editor?Action=AddDoc",
    {
      title,
      collectionId,
    },
    callback
  );
}

export function deleteAtom(sid, nextId, callback) {
  ajaxPost(
    "/space/editor?Action=DeleteAtom",
    {
      sid,
      nextId,
    },
    callback
  );
}

export function getCollectionDocs(collectionId, callback) {
  ajaxPost(
    "/space/editor?Action=GetCollectionDocs",
    {
      collectionId,
    },
    callback
  );
}

export function getCollections(callback) {
  ajaxGet("/space/editor?Action=GetCollections", callback);
}

export function getDoc(docId, callback) {
  ajaxPost("/space/editor?Action=GetDoc", { docId }, callback);
}

export function getDocAtoms(docId, version, callback) {
  ajaxPost(
    "/space/editor?Action=GetDocAtoms",
    {
      docId,
      version,
    },
    callback
  );
}

export function insertAtom(
  { content, name, type, docId, prevId, nextId },
  callback
) {
  ajaxPost(
    "/space/editor?Action=InsertAtom",
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

export function sortAtoms(atoms, callback) {
  ajaxPost("/space/editor?Action=SortAtoms", { atoms }, callback);
}
