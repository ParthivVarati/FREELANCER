
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isServices = location.pathname === '/services';
  const isProvider = location.pathname.includes('provider');
  const isSeeker = location.pathname.includes('seeker');

  const handleProviderAccess = (e) => {
    // Only prevent default if not authenticated as provider
    if (!isAuthenticated || userType !== 'provider') {
      e.preventDefault();
      
      // Direct to login instead of showing toast
      navigate('/provider/login');
    }
  };

  const handleSeekerAccess = (e) => {
    // Only prevent default if not authenticated as seeker
    if (!isAuthenticated || userType !== 'seeker') {
      e.preventDefault();
      
      // Direct to login instead of showing toast
      navigate('/seeker/login');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-md py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-freelancer-dark flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-freelancer-dark">FREELANCER</span>
            </h1>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-freelancer-teal ${isHome ? 'text-freelancer-teal' : 'text-freelancer-dark'}`}>
              Home
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-freelancer-teal ${isAbout ? 'text-freelancer-teal' : 'text-freelancer-dark'}`}>
              About Us
            </Link>
            <Link to="/services" className={`text-sm font-medium transition-colors hover:text-freelancer-teal ${isServices ? 'text-freelancer-teal' : 'text-freelancer-dark'}`}>
              Services
            </Link>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isProvider || isSeeker ? (
              <>
                <Link to={`/${isProvider ? 'provider' : 'seeker'}/login`} className="text-sm font-medium px-4 py-2 rounded-lg border border-freelancer-dark text-freelancer-dark hover:bg-freelancer-dark hover:text-white transition-all duration-300">
                  Login
                </Link>
                <Link to={`/${isProvider ? 'provider' : 'seeker'}/register`} className="text-sm font-medium px-4 py-2 rounded-lg bg-freelancer-dark text-white hover:bg-freelancer-dark/90 transition-colors">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/provider/login" className="text-sm font-medium px-4 py-2 rounded-lg border border-freelancer-dark text-freelancer-dark hover:bg-freelancer-dark hover:text-white transition-all duration-300">
                  For Providers
                </Link>
                <Link to="/seeker/login" className="text-sm font-medium px-4 py-2 rounded-lg bg-freelancer-dark text-white hover:bg-freelancer-dark/90 transition-colors">
                  For Seekers
                </Link>
              </>
            )}
          </motion.div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden block text-freelancer-dark" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-4 bg-white/95 backdrop-blur-lg border-t border-gray-100">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className={`py-2 font-medium ${isHome ? 'text-freelancer-teal' : 'text-freelancer-dark'}`}>Home</Link>
            <Link to="/about" className={`py-2 font-medium ${isAbout ? 'text-freelancer-teal' : 'text-freelancer-dark'}`}>About Us</Link>
            <Link to="/services" className={`py-2 font-medium ${isServices ? 'text-freelancer-teal' : 'text-freelancer-dark'}`}>Services</Link>
            
            <div className="pt-2 border-t border-gray-100">
              {isProvider || isSeeker ? (
                <>
                  <Link to={`/${isProvider ? 'provider' : 'seeker'}/login`} className="block w-full text-center py-2 my-2 rounded-lg border border-freelancer-dark text-freelancer-dark">
                    Login
                  </Link>
                  <Link to={`/${isProvider ? 'provider' : 'seeker'}/register`} className="block w-full text-center py-2 my-2 rounded-lg bg-freelancer-dark text-white">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/provider/login" className="block w-full text-center py-2 my-2 rounded-lg border border-freelancer-dark text-freelancer-dark">
                    For Providers
                  </Link>
                  <Link to="/seeker/login" className="block w-full text-center py-2 my-2 rounded-lg bg-freelancer-dark text-white">
                    For Seekers
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
