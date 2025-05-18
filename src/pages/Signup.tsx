import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../utils/animations";
import { registerWithEmail, updateUserProfile } from "../services/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const userCredential = await registerWithEmail(email, password);
      await updateUserProfile(userCredential.user, displayName);
      navigate("/onboarding");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50"
      >
        <div className="animate-pulse text-2xl text-purple-600">
          Creating your mood space...
        </div>
      </motion.div>
    );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4"
    >
      <motion.div
        variants={stagger}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Decorative header with animation */}
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center"
        >
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-emerald-100 mt-2">
            Begin your mood tracking journey
          </p>
        </motion.div>

        <motion.div variants={stagger} className="p-8">
          {error && (
            <motion.div
              variants={fadeInUp}
              className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg flex items-center"
            >
              <FiAlertCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            variants={stagger}
            className="space-y-5 w-full "
          >
            <motion.div variants={fadeInUp} className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <FiLoader className="animate-spin mr-2" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Get Started <FiArrowRight className="ml-2" />
                  </span>
                )}
              </button>
            </motion.div>
          </motion.form>

          <motion.div
            variants={fadeInUp}
            className="mt-6 text-center text-sm text-gray-500"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
