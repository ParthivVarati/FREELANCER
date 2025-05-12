
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-freelancer-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-freelancer-dark font-bold text-xl">F</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">FREELANCER</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Place Where Skilled Meet Work. Connecting talented professionals with clients seeking quality services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-freelancer-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-freelancer-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-freelancer-teal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-freelancer-teal transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/provider/login" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  For Providers
                </Link>
              </li>
              <li>
                <Link to="/seeker/login" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  For Seekers
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Content Writing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-freelancer-teal transition-colors">
                  Mobile Development
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">support@freelancer.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Workspace Avenue, Digital City, 10001</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="pt-8 border-t border-gray-700/50 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FREELANCER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
