import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import "./App.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, createContext } from "react";
import userService from "./services/user.ts";
import { getGlobalData, setGlobalData } from "./global";
import GlobalBackground from "./components/GlobalBackground";

// Create Auth context for sharing accessToken across components
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
                console.log("Got Auth0 token");
                setAccessToken(token);
            } catch (error) {
                console.error("Failed to get token:", error);
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
                    console.log("User data retrieved:", userData);
                }
            } catch (error) {
                console.error("Failed to get user data:", error);
            }
        }
        if (accessToken) {
            getCurrentUser();
            
            setGlobalData({accessToken: accessToken});
            const myGlobalData = getGlobalData();
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken }}>
            <GlobalBackground>
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
            </GlobalBackground>
        </AuthContext.Provider>
    );
}

export default App;
