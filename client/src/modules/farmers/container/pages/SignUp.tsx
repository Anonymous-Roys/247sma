import { useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { User, Mail, Phone, Lock, Eye, EyeOff, Key, ArrowLeft } from 'lucide-react';

const SignUp = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (formData.emailOrPhone.includes('@')) {
      if (!validator.isEmail(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Invalid email format';
      }
    } else {
      if (!validator.isMobilePhone(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Invalid phone number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsLoading(true);
    try {
      await axios.post('https://two47sma.onrender.com/api/send-otp', { 
        emailOrPhone: formData.emailOrPhone 
      });
      setStep(2);
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('https://two47sma.onrender.com/api/verify-otp', { 
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        name: formData.name,
        otp: formData.otp
      });
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="flex min-h-screen">
      {/* Left side - Signup Form */}
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
                {step === 1 ? 'Create Account' : 'Verify OTP'}
              </h2>
              <p className="text-gray-600">
                {step === 1 
                  ? 'Join us and start your journey today'
                  : `We've sent a verification code to ${formData.emailOrPhone}`
                }
              </p>
            </div>

            <div className="space-y-6">
              {step === 1 ? (
                <div className="space-y-4 duration-300 animate-in slide-in-from-right">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email or Phone Field */}
                  <div>
                    <label htmlFor="emailOrPhone" className="block mb-2 text-sm font-medium text-gray-700">
                      Email or Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {formData.emailOrPhone.includes('@') ? (
                          <Mail className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Phone className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <input
                        id="emailOrPhone"
                        name="emailOrPhone"
                        type="text"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                          errors.emailOrPhone 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                        }`}
                        placeholder="Email or phone number"
                      />
                    </div>
                    {errors.emailOrPhone && <p className="mt-1 text-sm text-red-500">{errors.emailOrPhone}</p>}
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
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                          errors.password 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                        }`}
                        placeholder="Password (min 8 characters)"
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
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                          errors.confirmPassword 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                        }`}
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 duration-300 animate-in slide-in-from-left">
                  {/* OTP Field */}
                  <div>
                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Key className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        value={formData.otp}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 placeholder-gray-500 text-center text-lg tracking-widest ${
                          errors.otp 
                            ? 'border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                        }`}
                        placeholder="000000"
                      />
                    </div>
                    {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp}</p>}
                    
                    <div className="p-4 mt-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Mail className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-800">
                            Verification code sent to <span className="font-medium">{formData.emailOrPhone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={step === 1 ? handleSubmitStep1 : handleSubmitStep2}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  step === 1 ? 'VERIFY YOUR EMAIL' : 'VERIFY & SIGN UP'
                )}
              </button>

              {/* Back Button for OTP Step */}
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-200 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign up
                </button>
              )}

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-green-600 transition-colors duration-200 hover:text-green-500">
                    Log in
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
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-20"
                style={{
                  width: Math.random() * 80 + 40 + 'px',
                  height: Math.random() * 80 + 40 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 8 + 's',
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
              {step === 1 
                ? "Join thousands of users who trust our platform"
                : "We're securing your account with advanced verification"
              }
            </p>

            {/* Step Indicator */}
            <div className="flex items-center justify-center pt-8 space-x-4">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === 1 ? 'bg-white' : 'bg-white bg-opacity-40'
              }`}></div>
              <div className={`w-8 h-0.5 rounded-full transition-all duration-300 ${
                step === 2 ? 'bg-white' : 'bg-white bg-opacity-40'
              }`}></div>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === 2 ? 'bg-white' : 'bg-white bg-opacity-40'
              }`}></div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {step === 1 ? (
                ['Secure Registration', 'Instant Verification', 'Quick Setup'].map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-3 opacity-90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-lg font-medium">{feature}</span>
                  </div>
                ))
              ) : (
                ['OTP Verification', 'Account Protection', 'Almost Ready'].map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-3 opacity-90">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-lg font-medium">{feature}</span>
                  </div>
                ))
              )}
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

export default SignUp;