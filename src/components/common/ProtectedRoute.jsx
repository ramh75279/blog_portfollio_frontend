import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../config/firebase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" aria-hidden />
        <p className="mt-4 text-gray-600 text-sm">Checking sign-in…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-16 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-8 shadow-xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in required</h1>
          <p className="text-gray-600 mb-6">
            Please log in to view this page. If you do not have an account yet, you can register first.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="inline-flex justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-orange-600 transition"
            >
              Go to login
            </Link>
            <Link
              to="/signup"
              className="inline-flex justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
