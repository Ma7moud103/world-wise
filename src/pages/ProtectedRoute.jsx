import { useNavigate } from "react-router-dom";
import { AuthContextConsumer } from "../context/AuthContext";
import {  useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const {   token } = AuthContextConsumer();
    console.log(token)
    const navigate = useNavigate();

    useEffect(() => {
      if (!token)  navigate("/", { replace: true });
      
    }, [token, navigate]);

  return token ? children : null;
}
export default ProtectedRoute