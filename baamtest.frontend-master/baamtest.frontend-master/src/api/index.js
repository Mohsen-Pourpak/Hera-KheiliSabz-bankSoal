import axios from "axios";
import React from "react";
import * as qs from "qs";
import { toast } from "react-toastify";
import { useUserDispatch, signOut } from "../context/UserContext";

export const BASE_URL = "https://bametest-backend.liara.run";

const client = axios.create({
  baseURL: "https://bametest-backend.liara.run",
});

let USER_TOKEN = localStorage.getItem("userToken");
var userDispatch = useUserDispatch;

export const get = (path, token, withPagination) => {
  let headers = {};

  if (token) {
    headers = {
      "Authorization": `Bearer ${token}`,
    };
  }
  const onSuccess = (response) => {
    console.error("Get Request Successful!", response);
    if (withPagination) {
      return response;
    } else {
      return response.data;
    }

  };

  const onError = (error) => {
    console.error("Get Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      toast.error(error.response.data.Message ? error.response.data.Message : error.response.data.message);
      console.error("Headers:", error.response.headers);

    } else {
      console.error("Error Message ---------------:", error.message);
      localStorage.removeItem("userToken");
      localStorage.removeItem("user_type");
      window.location.reload();
    }

    return Promise.reject(error.response || error.message);
  };

  return client.get(path, {
    params: null,
    headers,
  })
    .then(onSuccess)
    .catch(onError);
};


export const delete_ = (path, token, params = null) => {
  let headers = {};

  if (token) {
    headers = {
      "Authorization": `Bearer ${token}`,
    };
  }
  const onSuccess = (response) => {
    console.error("Get Request Successful!", response);
    return response.data;
  };

  const onError = (error) => {
    console.error("Get Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      toast.error(error.response.data.Message);
      console.error("Headers:", error.response.headers);

    } else {
      console.error("Error Message:", error.message);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("user_type");
      // window.location.reload()
    }

    return Promise.reject(error.response || error.message);
  };

  return client.delete(path, {
    params,
    headers,
  })
    .then(onSuccess)
    .catch(onError);
};

export function post(path, data, token, withPagination, params) {
  let headers = {};
  if (token) {
    headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  const onSuccess = (response) => {
    console.error("Post Request Successful!", response);
    if (withPagination) {
      return response;
    } else {
      return response.data;
    }

  };

  const onError = (error) => {
    console.error("Post Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      toast.error(error.response.data.Message);
      console.error("Headers:", error.response.headers);

    } else {
      console.error("Error Message:", error.message);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("user_type");
      // window.location.reload()
    }

    return Promise.reject(error.response || error.message);
  };

  return client.post(path, data, {
    headers,
    params,
  })
    .then(onSuccess)
    .catch(onError);
}


export function put(path, data, token, headers = {}, params) {

  if (token) {
    headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  const onSuccess = (response) => {
    console.error("Post Request Successful!", response);
    return response.data;
  };

  const onError = (error) => {
    console.error("Post Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      toast.error(error.response.data.Message);
      console.error("Headers:", error.response.headers);

    } else {
      console.error("Error Message:", error.message);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("user_type");
      // window.location.reload()
    }

    return Promise.reject(error.response || error.message);
  };

  return client.put(path, data, {
    headers,
    params,
  })
    .then(onSuccess)
    .catch(onError);
}


export function get_2(path, urlData, token, headers = {}, params) {

  var data = JSON.stringify(urlData);

  if (token) {
    headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  const onSuccess = (response) => {
    console.error("Post Request Successful!", response);
    return response.data;
  };

  const onError = (error) => {
    console.error("Post Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      toast.error(error.response.data.Message);
      console.error("Headers:", error.response.headers);

    } else {
      console.error("Error Message:", error.message);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("user_type");
      // window.location.reload()
    }

    return Promise.reject(error.response || error.message);
  };

  var config = {
    method: "get",
    url: BASE_URL + path,
    headers,
    data,
    body: null,
  };

  axios(config)
    .then(onSuccess)
    .catch(onError);
}
