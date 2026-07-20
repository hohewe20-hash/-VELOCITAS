import { useState } from "react";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const res = await axios.post("https://robust-education-production-6271.up.railway.app/api/auth/register", {
                name,
                email,
                password
            });

            alert(res.data.message);
            console.log(res.data);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Register</h1>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <br /><br />

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />

            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <br /><br />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;