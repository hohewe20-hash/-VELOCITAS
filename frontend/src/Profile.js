import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await axios.get("https://robust-education-production-6271.up.railway.app/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data.user);

            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
                navigate("/login");

            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
            color: "white",
            padding: "40px",
            fontFamily: "Arial"
        }}>
            <h1 style={{ marginBottom: "20px" }}>Dashboard 🚗</h1>

            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <div style={{
                    background: "#222",
                    padding: "25px",
                    borderRadius: "15px",
                    width: "300px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}>
                    <h2>Welcome 👋</h2>

                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>

                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: "15px",
                            padding: "10px 15px",
                            background: "#e60000",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>No user found</p>
            )}
        </div>
    );
}

export default Profile;