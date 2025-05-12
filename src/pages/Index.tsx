
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRightCircle, CheckCircle, Code, Brush, PenTool, Lightbulb, Briefcase, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  
  // Features section with different services
  const services = [
    {
      icon: <Code className="h-8 w-8 text-freelancer-purple" />,
      title: 'Web Development',
      description: 'Skilled developers ready to build responsive, modern websites tailored to your needs.'
    },
    {
      icon: <Brush className="h-8 w-8 text-freelancer-teal" />,
      title: 'Graphic Design',
      description: 'Creative designers who bring your visual identity and brand to life through stunning graphics.'
    },
    {
      icon: <PenTool className="h-8 w-8 text-freelancer-dark" />,
      title: 'Content Writing',
      description: 'Professional writers creating engaging content that connects with your audience.'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: 'Digital Marketing',
      description: 'Marketing experts to grow your online presence and increase your brand visibility.'
    }
  ];
  
  const benefits = [
    'Access to top industry talent',
    'Cost-effective project solutions',
    'Quick turnaround times',
    'Transparent communication',
    'Secure payment processing',
    'Quality work guaranteed'
  ];

  const handleProviderClick = () => {
    if (isAuthenticated && userType === 'provider') {
      navigate('/provider/dashboard');
    } else {
      navigate('/provider/login');
    }
  };

  const handleSeekerClick = () => {
    if (isAuthenticated && userType === 'seeker') {
      navigate('/seeker/profile');
    } else {
      navigate('/seeker/login');
    }
  };

  useEffect(() => {
    document.title = 'FREELANCER | Place Where Skilled Meet Work';
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col overflow-hidden">
        <Header />
        
        {/* Hero Section */}
        <motion.section 
          className="pt-32 pb-20 px-6 relative"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-b from-blue-100/40 to-transparent rounded-bl-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-t from-teal-100/30 to-transparent rounded-tr-full -z-10"></div>
          
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-2 bg-freelancer-teal rounded-full mr-3"></div>
                  <span className="text-freelancer-dark/70 font-medium">Freelance Marketplace</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-6 leading-tight">
                  <span className="block text-freelancer-dark">FREELANCER</span>
                  <span className="block text-2xl sm:text-3xl text-freelancer-gray font-normal mt-2">
                    Place Where Skilled Meet Work
                  </span>
                </h1>
                <p className="text-lg text-freelancer-dark/70 mb-8 max-w-xl">
                  Connect with top talent or find your dream projects on our seamless
                  platform designed for freelancers and clients alike.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button 
                      onClick={handleProviderClick}
                      className="block w-full button-primary text-center"
                    >
                      I'm a Freelancer
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button 
                      onClick={handleSeekerClick}
                      className="block w-full button-secondary text-center"
                    >
                      I'm Looking to Hire
                    </button>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-[450px] hidden lg:block"
              >
                <div className="absolute top-0 left-10 w-64 h-64 glass-card rounded-xl p-6 shadow-xl animate-float">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-freelancer-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-freelancer-dark mb-2">Find Opportunities</h3>
                  <p className="text-sm text-freelancer-gray">Discover projects that match your skills and interests</p>
                </div>
                
                <div className="absolute bottom-0 right-10 w-64 h-64 glass-card rounded-xl p-6 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-freelancer-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-freelancer-dark mb-2">Hire Experts</h3>
                  <p className="text-sm text-freelancer-gray">Connect with skilled professionals for your projects</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Main Selection Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-freelancer-dark mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Choose Your Path
              </motion.h2>
              <motion.p 
                className="text-lg text-freelancer-gray max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Whether you're offering services or seeking talent, we've got you covered.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass-card rounded-xl p-8 text-center relative overflow-hidden group cursor-pointer"
                onClick={handleProviderClick}
              >
                <div className="absolute inset-0 bg-freelancer-dark/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 relative">
                  <Code className="h-10 w-10 text-freelancer-dark" />
                </div>
                <h3 className="text-2xl font-bold text-freelancer-dark mb-4">I'm a Provider</h3>
                <p className="text-freelancer-gray mb-6 relative">
                  Showcase your skills, find clients, and grow your freelance business.
                </p>
                <div 
                  className="inline-flex items-center text-freelancer-dark font-medium relative"
                >
                  Get Started <ArrowRightCircle className="ml-2 h-5 w-5" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass-card rounded-xl p-8 text-center relative overflow-hidden group cursor-pointer"
                onClick={handleSeekerClick}
              >
                <div className="absolute inset-0 bg-freelancer-teal/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6 relative">
                  <Briefcase className="h-10 w-10 text-freelancer-teal" />
                </div>
                <h3 className="text-2xl font-bold text-freelancer-dark mb-4">I'm a Seeker</h3>
                <p className="text-freelancer-gray mb-6 relative">
                  Find and hire skilled professionals for your projects with ease.
                </p>
                <div 
                  className="inline-flex items-center text-freelancer-teal font-medium relative"
                >
                  Get Started <ArrowRightCircle className="ml-2 h-5 w-5" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* About Us Section */}
        <section className="py-16 px-6" ref={aboutRef}>
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-freelancer-dark mb-4">About Us</h2>
                <p className="text-lg text-freelancer-gray">
                  We're on a mission to revolutionize how freelancers and clients connect.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
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
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
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
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
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
            </div>
          </div>
        </section>
        
        {/* We Provide Section */}
        <section className="py-16 px-6 bg-gray-50" ref={featuresRef}>
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-freelancer-dark mb-4">We Provide</h2>
              <p className="text-lg text-freelancer-gray max-w-3xl mx-auto">
                Access a wide range of services from skilled professionals across various industries.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-card rounded-xl p-6 h-full"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-freelancer-dark mb-3">{service.title}</h3>
                  <p className="text-sm text-freelancer-gray">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-freelancer-dark rounded-2xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1/3 h-full bg-freelancer-purple/20 rounded-r-full blur-3xl transform -translate-x-1/2"></div>
              <div className="absolute bottom-0 right-0 w-1/3 h-full bg-freelancer-teal/20 rounded-l-full blur-3xl transform translate-x-1/2"></div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6 relative"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/90 text-lg mb-8 max-w-2xl mx-auto relative"
              >
                Join thousands of freelancers and clients who are already
                using our platform to connect and collaborate.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <button 
                  onClick={() => navigate('/provider/register')}
                  className="px-8 py-3 bg-white text-freelancer-dark rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Join as a Provider
                </button>
                <button 
                  onClick={() => navigate('/seeker/register')}
                  className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Join as a Seeker
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

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

export default Index;
