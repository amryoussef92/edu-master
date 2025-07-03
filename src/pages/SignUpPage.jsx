import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function SignUpPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpassword: "",
    classLevel: "",
  });

  const { mutate, isPending, isSuccess, isError, error } = useSignup();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div>
      <h2>Student Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <input
          name="cpassword"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
        />
        <input
          name="classLevel"
          placeholder="Class Level"
          onChange={handleChange}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
        {isSuccess && <p>✅ Signup successful!</p>}
        {isError && (
          <p>❌ {error.response?.data?.message || "Signup failed"}</p>
        )}
      </form>
    </div>
  );
}
