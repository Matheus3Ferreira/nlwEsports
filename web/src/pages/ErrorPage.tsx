import { useRouteError } from "react-router-dom";

interface IError {
  status: number;
  statusText: string;
  data: any;
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Where we are?</h1>
      <h2>Also I don't know.</h2>
    </div>
  );
}
