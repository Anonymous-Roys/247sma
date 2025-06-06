import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/shared/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
      const token = response.data.token;
      toast.success('Login successful!');

    // ✅ Store token securely in sessionStorage (or localStorage)
    sessionStorage.setItem('token', token); // or localStorage.setItem()
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

 

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="flex items-center justify-center flex-1 px-4 py-8 bg-gray-50 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo - Only shown on small screens */}
          <div className="mb-8 text-center lg:hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-500 rounded-full">
              <span className="text-xl font-bold text-white">2.S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">24/7 SMAGR1IADE</h1>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Enter your email and password to sign in
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-10 pr-12 text-gray-900 placeholder-gray-500 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'SIGN IN'
                )}
              </button>

              {/* Links */}
              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-green-600 transition-colors duration-200 hover:text-green-500">
                    Sign up
                  </a>
                </p>
                <p className="text-sm">
                  <a href="/forgot-password" className="font-medium text-green-600 transition-colors duration-200 hover:text-green-500">
                    Forgot your password?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-1 bg-gradient-to-br from-green-400 via-green-500 to-green-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-20"
                style={{
                  width: Math.random() * 100 + 50 + 'px',
                  height: Math.random() * 100 + 50 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 10 + 's',
                }}
              />
            ))}
          </div>
        </div>

        {/* Diagonal Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{stroke: 'white', strokeWidth: 0.5}} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="max-w-md space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 transition-transform duration-300 transform bg-white rounded-full shadow-2xl hover:scale-105">
                <span className="text-3xl font-bold text-green-500">2.S</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-wider xl:text-5xl drop-shadow-lg">
                24/7 SMAGR1IADE
              </h1>
              <div className="w-24 h-1 mx-auto bg-white rounded-full opacity-80"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl font-light leading-relaxed opacity-90">
              Your trusted partner for continuous growth and success
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-8">
              {['24/7 Support', 'Secure Platform', 'Global Access'].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 opacity-90">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute w-16 h-16 bg-white rounded-full top-10 right-10 bg-opacity-10 animate-pulse"></div>
        <div className="absolute w-12 h-12 bg-white rounded-full bottom-20 left-10 bg-opacity-10 animate-bounce"></div>
        <div className="absolute w-8 h-8 bg-white rounded-full top-1/3 right-1/4 bg-opacity-20 animate-ping"></div>
      </div>
    </div>
  );
};

export default Login;