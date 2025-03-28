import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import userService from "./services/user.ts";

const App = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const updateAccessToken = async () => {
            setAccessToken(await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                }
            }));
        }
        
        if (isAuthenticated)
            updateAccessToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    
    useEffect(() => {
        const getCurrentUser = async () => {
            setUser(await userService.getCurrentUser(accessToken));
        }
        if (accessToken) {
            getCurrentUser();
            // console.log(accessToken);
        }
    }, [accessToken]);

    return (
        <>
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
        </>
    );
}

export default App;
