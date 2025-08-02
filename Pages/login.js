import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          signIn("credentials", { email, password });
        }}
      >
        <input type="email" name="email" placeholder="Email" className="mb-2 w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" className="mb-4 w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}