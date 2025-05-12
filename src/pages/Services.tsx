
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Code, Brush, PenTool, Lightbulb, BarChart, FileCode, Smartphone, Globe } from 'lucide-react';

const Services = () => {
  useEffect(() => {
    document.title = 'Services | FREELANCER';
  }, []);

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
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: 'Data Analysis',
      description: 'Data specialists who transform raw numbers into actionable business insights.'
    },
    {
      icon: <FileCode className="h-8 w-8 text-green-500" />,
      title: 'App Development',
      description: 'Mobile app developers creating native and cross-platform applications.'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-500" />,
      title: 'UI/UX Design',
      description: 'User experience designers creating intuitive, user-friendly interfaces.'
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      title: 'SEO Optimization',
      description: 'SEO experts helping your business rank higher in search engine results.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-32 pb-16 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-freelancer-dark mb-4">Our Services</h1>
              <div className="w-24 h-1 bg-freelancer-teal mx-auto mb-6"></div>
              <p className="text-lg text-freelancer-gray max-w-3xl mx-auto">
                Access a wide range of services from skilled professionals across various industries,
                all vetted and ready to help bring your projects to life.
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
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl font-bold text-freelancer-dark mb-4">How It Works</h2>
              <p className="text-lg text-freelancer-gray mb-8">
                Getting the help you need is easy with our streamlined process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-freelancer-dark font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-freelancer-dark mb-2">Post Your Project</h3>
                  <p className="text-sm text-freelancer-gray">
                    Describe your project needs and requirements in detail
                  </p>
                </div>
                
                <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-freelancer-dark font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-freelancer-dark mb-2">Review Proposals</h3>
                  <p className="text-sm text-freelancer-gray">
                    Evaluate bids from talented freelancers who want to help
                  </p>
                </div>
                
                <div className="p-6 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-freelancer-dark font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-freelancer-dark mb-2">Collaborate & Pay</h3>
                  <p className="text-sm text-freelancer-gray">
                    Work with your chosen professional and pay when you're satisfied
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
