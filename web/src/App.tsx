import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import Redirect from "./pages/Redirect";
import SignInDiscordSuccess from "./pages/SignInDiscordSuccess";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/redirect/discord"
        element={<Redirect url="http://localhost:3333/api/auth/discord" />}
      />
      <Route
        path="/sign-in/discord/success"
        element={<SignInDiscordSuccess />}
      />
    </Routes>
  );
}
