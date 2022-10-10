import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SignInDiscordSuccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("access_token") as string;
    localStorage.setItem("access_token_discord", token);
    navigate("/");
  }, []);

  return <h1>Success, redirecting...</h1>;
}
