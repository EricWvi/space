import axios from "axios";
import { message } from "antd";

export function ajaxPost(url, data, callback) {
  axios
    .post("/api" + url, data, {
      headers: {
        "x-api-key": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.data.code !== 200) {
        message.error(res.data.message);
        return;
      }
      callback(res.data.message);
    })
    .catch((err) => {
      message.error(err.message);
      console.error(err);
    });
}

export function ajaxGet(url, callback) {
  axios
    .get("/api" + url, {
      headers: {
        "x-api-key": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.data.code !== 200) {
        message.error(res.data.message);
        return;
      }
      callback(res.data.message);
    })
    .catch((err) => {
      message.error(err.message);
      console.error(err);
    });
}
