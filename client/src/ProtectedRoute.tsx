import { Navigate } from "react-router-dom";

function ProtectedRoute(props: any) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return props.outlet;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
