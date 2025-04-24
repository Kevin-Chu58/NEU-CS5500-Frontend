import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import "./App.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, createContext } from "react";
import userService from "./services/user.ts";
import { getGlobalData, setGlobalData } from "./global";

// 创建Auth上下文，用于跨组件共享accessToken
export const AuthContext = createContext({ accessToken: null });

const App = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const updateAccessToken = async () => {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                    }
                });
                console.log("获取到Auth0令牌");
                setAccessToken(token);
            } catch (error) {
                console.error("获取令牌失败:", error);
            }
        }
        
        if (isAuthenticated) {
            updateAccessToken();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                if (accessToken) {
                    const userData = await userService.getCurrentUser(accessToken);
                    setUser(userData);
                    console.log("已获取用户数据:", userData);
                }
            } catch (error) {
                console.error("获取用户数据失败:", error);
            }
        }
        if (accessToken) {
            getCurrentUser();
            // console.log(accessToken);
            
            setGlobalData({accessToken: accessToken});
            const myGlobalData = getGlobalData();
            // while (!getGlobalData("accessToken"))
                // console.log(myGlobalData);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken }}>
            <NavBar />
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
