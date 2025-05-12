
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm, { AuthFormFields } from '../components/ui/AuthForm';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { api } from '../services/api';

const ProviderRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: AuthFormFields) => {
    setIsLoading(true);
    
    try {
      // Format the data for the API
      const formattedData = {
        name: data.name || '',
        phone_number: data.phone || '',
        email: data.email,
        password: data.password
      };
      
      console.log('Submitting provider registration data:', formattedData);
      const response = await api.providerRegister(formattedData);
      
      console.log('Provider registration response:', response);
      toast.success('Account created successfully!');
      navigate('/provider/login');
    } catch (error) {
      console.error('Provider registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center pt-28 pb-16 px-6">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute top-8 left-8 w-64 h-64 bg-freelancer-purple/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-8 right-8 w-64 h-64 bg-freelancer-teal/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-freelancer-dark mb-6">Become a Provider</h2>
                    <p className="text-freelancer-gray mb-6">
                      Join our community of skilled professionals and start connecting with clients who need your expertise.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-freelancer-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Create Your Profile</h3>
                          <p className="text-sm text-freelancer-gray">Showcase your skills, experience, and portfolio</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-freelancer-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Find Opportunities</h3>
                          <p className="text-sm text-freelancer-gray">Discover projects matching your skills and preferences</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-freelancer-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Grow Your Business</h3>
                          <p className="text-sm text-freelancer-gray">Build your reputation and expand your client base</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-freelancer-dark/5 rounded-lg">
                      <p className="text-sm text-freelancer-gray">
                        Join over 10,000 skilled professionals already growing their business with FREELANCER.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <AuthForm 
                  type="register"
                  userType="provider"
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProviderRegister;
