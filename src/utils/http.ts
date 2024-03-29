import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";
import { cleanObj } from "utils";

// 封装Restful请求，每个请求都要包含token

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  // fetch的第二个参数options为RequestInit对象
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  // 处理headers
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // 处理get请求的数据
  if (config.method === "GET") {
    endpoint += `?${qs.stringify(cleanObj(data || {}))}`;
  } else {
    // 处理其他请求的数据
    config.body = JSON.stringify(cleanObj(data || {}));
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // 未登录或token失效（restful规范）
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data); // fetch 需要手动抛出错误
      }
    });
};

// 从当前user状态获取token并发送请求
export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
