import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return <div>{currentUser ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
}

export default PrivateRoute;

//useNavigate is a hook and Navigate is a component
//Outlet is a children component
