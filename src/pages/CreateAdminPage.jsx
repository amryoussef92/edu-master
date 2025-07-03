import { useState } from "react";
import { useCreateAdmin } from "../hooks/useCreateAdmin";
import { useAuth } from "../context/AuthContext";

export default function CreateAdminPage() {
  const { auth } = useAuth();
  const token = auth.token;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpassword: "",
  });

  const { mutate, isPending, isSuccess, isError, error } =
    useCreateAdmin(token);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div>
      <h2>Create Admin (Super Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input name="password" onChange={handleChange} placeholder="Password" />
        <input
          name="cpassword"
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Admin"}
        </button>
        {isSuccess && <p>✅ Admin created!</p>}
        {isError && (
          <p>❌ {error.response?.data?.message || "Error occurred"}</p>
        )}
      </form>
    </div>
  );
}
