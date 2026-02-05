import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function TestAuth() {
  const login = async () => {
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        "test@email.com",      // 👈 your test user
        "password123"          // 👈 your test password
      );

      const token = await cred.user.getIdToken();
      console.log("🔥 Firebase ID Token:", token);

      alert("Login success — check console");
    } catch (e: any) {
      console.error(e);
      alert(e.message);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={login}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Test Firebase Login
      </button>
    </div>

    
  );
}
