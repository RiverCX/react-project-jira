import React, { ReactNode } from "react";
import { User } from "screens/project-list/SearchPanel";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

//用全局状态保存登陆用户信息

// 初始化，获取token，发送请求获取user数据
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 创建context对象，指定value类型
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

// 在Provider中定义全局状态User以及相关函数
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    run,
    isIdle,
    isLoading,
    isError,
    error,
  } = useAsync<User | null>();

  // 在原来的fetch请求处理基础上，加上user状态的处理
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  // 初次渲染时 user初始化
  useMount(() => {
    run(bootstrapUser());
  });

  // 全屏加载页面
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // 全屏错误页面
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    ></AuthContext.Provider>
  );
};

// 包装useContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在useProvider中使用");
  }
  return context;
};
