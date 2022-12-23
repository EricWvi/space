import { sortAtoms } from "../../api/editor.js";

export const DELETE_ATOM = "DELETE_ATOM";
export const EDIT_ATOM = "EDIT_ATOM";
export const INIT = "INIT";
export const INSERT_ATOM = "INSERT_ATOM";
export const REORDER = "REORDER";

export function deleteAtomAction(index, next) {
  return {
    type: DELETE_ATOM,
    index,
    next,
  };
}

export function editAtomAction(atom) {
  return {
    type: EDIT_ATOM,
    atom,
  };
}

export function initAction(atoms) {
  return {
    type: INIT,
    atoms,
  };
}

export function insertAtomAction(index, atom) {
  return {
    type: INSERT_ATOM,
    index,
    atom,
  };
}

export function reorder(src, dst) {
  return {
    type: REORDER,
    src,
    dst,
  };
}

export function atomsReducer(atoms, action) {
  let result;
  switch (action.type) {
    case DELETE_ATOM:
      result = Array.from(atoms);
      const [deleted] = result.splice(action.index, 1);
      const prev = deleted.prevId;
      return result.map((a) => {
        if (a.sid === action.next) {
          a.prevId = prev;
        }
        return a;
      });

    case EDIT_ATOM:
      return atoms.map((a) => {
        if (a.sid === action.atom.sid) {
          return action.atom;
        }
        return a;
      });

    case INIT:
      return action.atoms;

    case INSERT_ATOM:
      result = Array.from(atoms);
      result.splice(action.index, 0, action.atom);
      return result.map((a, i) => {
        if (action.index === i) {
          a.prevId = action.atom.sid;
        }
        return a;
      });

    case REORDER:
      result = Array.from(atoms);
      const [removed] = result.splice(action.src, 1);
      result.splice(action.dst, 0, removed);
      const list = [];
      const updateList = result.map((atom, index) => {
        let prevId = "";
        if (index !== 0) {
          prevId = result[index - 1].sid;
        }
        if (atom.prevId !== prevId) {
          list.push({
            sid: atom.sid,
            prevId: prevId,
          });
          atom.prevId = prevId;
        }
        return atom;
      });
      if (list.length !== 0) {
        sortAtoms(list, () => {});
      }

      return updateList;
  }
}
