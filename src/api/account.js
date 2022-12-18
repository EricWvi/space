import { ajaxGet, ajaxPost } from "./ajax";

export function login(username, password, callback) {
    ajaxPost(
        "/login?Action=LogIn",
        {
            username: username,
            password: password,
        },
        callback
    );
}