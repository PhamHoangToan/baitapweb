import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;

  useEffect(() => {
    if (!token) {
      console.error("Token is missing!");
      navigate("/login", { replace: true }); // Quay về trang login nếu không có token
      return;
    }

    const authenticateUser = async () => {
      try {
        const response = await axios.post("http://localhost:5000/auth/google", { token });
        console.log("User Info:", response.data);

        // Lưu thông tin user vào localStorage (hoặc state management)
        localStorage.setItem("user", JSON.stringify(response.data));

        // Chuyển hướng đến trang chính
        navigate("/home", { replace: true });
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login", { replace: true }); // Quay lại trang login nếu lỗi
      }
    };

    authenticateUser();
  }, [token, navigate]);

  return <div>Đang xác thực...</div>;
}

export default Callback;
