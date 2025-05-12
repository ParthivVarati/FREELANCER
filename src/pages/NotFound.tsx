
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "../components/animations/PageTransition";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = '404 - Page Not Found | FREELANCER';
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <h1 className="text-9xl font-bold text-freelancer-dark mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-freelancer-gray mb-6">Oops! Page not found</h2>
          <p className="text-freelancer-gray mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-freelancer-teal text-white rounded-lg font-medium hover:bg-freelancer-teal/90 transition-colors"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
