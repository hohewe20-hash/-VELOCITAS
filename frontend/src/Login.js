import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://robust-education-production-6271.up.railway.app/api/auth/login", {
                email,
                password
            });

            console.log("LOGIN RESPONSE:", res.data);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);

                alert("Login successful");

                // 🔥 Redirect بعد النجاح
                navigate("/profile");

            } else {
                alert("No token received from server");
            }

        } catch (err) {
            console.log("LOGIN ERROR:", err.response?.data);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Login</h1>

            <input 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <br /><br />

            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

            <p>
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;