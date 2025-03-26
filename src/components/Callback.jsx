import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const API_URL = "https://backend-production-87c2.up.railway.app"; // Định nghĩa API_URL

function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;

  useEffect(() => {
    if (!token) {
      console.error("Token is missing!");
      navigate("/login", { replace: true });
      return;
    }

    const authenticateUser = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/something`, { token }); // Thay đổi URL
        console.log("User Info:", response.data);

        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("/home", { replace: true });
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login", { replace: true });
      }
    };

    authenticateUser();
  }, [token, navigate]);

  return <div>Đang xác thực...</div>;
}

export default Callback;
