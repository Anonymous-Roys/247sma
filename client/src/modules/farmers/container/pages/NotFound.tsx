
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Message */}
      <div className="flex items-center justify-center flex-1 px-4 py-8 bg-gray-50 lg:px-8">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-500 rounded-full">
              <span className="text-xl font-bold text-white">2.S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">24/7 SMAGR1IADE</h1>
          </div>

          <motion.h2
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Page Not Found
          </motion.h2>
          <p className="text-gray-600">The page you are looking for doesn’t exist.</p>

          <button
            onClick={handleGoHome}
            className="px-6 py-3 mt-4 text-sm font-medium text-white transition-all duration-200 bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Go to Homepage
          </button>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-1 bg-gradient-to-br from-green-400 via-green-500 to-green-600">
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

        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: 'white', strokeWidth: 0.5 }} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="max-w-md space-y-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-2xl">
                <span className="text-3xl font-bold text-green-500">2.S</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-wider xl:text-5xl drop-shadow-lg">
              24/7 SMAGR1IADE
            </h1>
            <div className="w-24 h-1 mx-auto bg-white rounded-full opacity-80"></div>

            <p className="text-xl font-light leading-relaxed opacity-90">
              Empowering your digital journey — 24/7
            </p>
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

export default NotFound;
