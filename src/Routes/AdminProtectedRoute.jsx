import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthUser } from "react-auth-kit";

const AdminProtectedRoute = ({ children }) => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {

    const isAdminAvailable = async () => {
      if (auth() === null || auth().user !== "admin") {
        navigate(-1);
      }
    }

    isAdminAvailable()

  });

  return children
};

export default AdminProtectedRoute;
