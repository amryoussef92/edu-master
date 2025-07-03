import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, auth } = useAuth();
  const { mutate, isPending, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (res) => {
        login({ token: res.data.token }); // Save token & decode role
      },
    });
  };

  // 🔥 Auto-redirect if already logged in
  useEffect(() => {
    if (auth.role === "super-admin") navigate("/super-admin");
    else if (auth.role === "admin") navigate("/admin");
    else if (auth.role === "student") navigate("/student");
  }, [auth.role, navigate]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
        {isError && (
          <p>❌ {error?.response?.data?.message || "Login failed"}</p>
        )}
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
