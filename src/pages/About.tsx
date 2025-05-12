
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CheckCircle } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'About Us | FREELANCER';
  }, []);

  const benefits = [
    'Access to top industry talent',
    'Cost-effective project solutions',
    'Quick turnaround times',
    'Transparent communication',
    'Secure payment processing',
    'Quality work guaranteed'
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-32 pb-16 px-6">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl font-bold text-freelancer-dark mb-4">About Us</h1>
                <div className="w-24 h-1 bg-freelancer-teal mx-auto mb-6"></div>
                <p className="text-lg text-freelancer-gray">
                  We're on a mission to revolutionize how freelancers and clients connect.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-freelancer-gray mb-6">
                    FREELANCER is a premium marketplace connecting skilled professionals with 
                    businesses and individuals looking for specialized expertise. Born from 
                    the belief that talent should be easily accessible, our platform simplifies 
                    the process of finding and hiring the right people for your projects.
                  </p>
                  <p className="text-freelancer-gray mb-6">
                    What sets us apart is our commitment to quality connections. We prioritize 
                    meaningful matches based on skills, experience, and compatibility to ensure 
                    successful collaborations every time.
                  </p>
                  
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-5 w-5 text-freelancer-teal mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-freelancer-gray">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-80 md:h-full min-h-[320px]"
                >
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-48 bg-freelancer-dark/5 rounded-xl -z-10"></div>
                  <div className="absolute top-0 left-0 w-48 h-48 glass-card rounded-lg p-5 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                      <Zap className="h-5 w-5 text-freelancer-teal" />
                    </div>
                    <h4 className="text-md font-semibold text-freelancer-dark mb-2">Fast Connections</h4>
                    <p className="text-xs text-freelancer-gray">Find the right match in record time with our intelligent matching system</p>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-48 h-48 glass-card rounded-lg p-5 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <Shield className="h-5 w-5 text-freelancer-purple" />
                    </div>
                    <h4 className="text-md font-semibold text-freelancer-dark mb-2">Secure Platform</h4>
                    <p className="text-xs text-freelancer-gray">Work with confidence knowing your communications and payments are protected</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-16 text-center"
              >
                <h2 className="text-2xl font-bold text-freelancer-dark mb-4">Our Mission</h2>
                <p className="text-lg text-freelancer-gray max-w-3xl mx-auto">
                  To create a world where talent knows no boundaries and where quality work is accessible to all. 
                  We're building the most trusted community of professionals and businesses, 
                  united by the pursuit of excellence and mutual growth.
                </p>
              </motion.div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

const Zap = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const Shield = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

export default About;
