import axios from "axios";

export function ajaxPost(url, data, callback) {
    let response;
    axios
        .post("/api" + url, data, {
            headers: {
                'x-api-key': localStorage.getItem("token"),
            },
        })
        .then((res) => {
            response = res;
            if (response.status !== 200) {
                return;
            }
            callback(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
}

export function ajaxGet(url, callback) {
    let response;
    axios
        .get("/api" + url, {
            headers: {
                'x-api-key': localStorage.getItem("token"),
            },
        })
        .then((res) => {
            response = res;
            if (response.status !== 200) {
                return;
            }
            callback(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
}
