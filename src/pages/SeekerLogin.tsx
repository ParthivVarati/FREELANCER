
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm, { AuthFormFields } from '../components/ui/AuthForm';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const SeekerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { seekerLogin, isAuthenticated, userType } = useAuth();

  useEffect(() => {
    // Only redirect if already authenticated as a seeker
    if (isAuthenticated && userType === 'seeker') {
      toast.info('Already logged in. Redirecting to profile...');
      navigate('/seeker/profile');
    }
  }, [isAuthenticated, userType, navigate]);

  const handleSubmit = async (data: AuthFormFields) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting seeker login with:', data.email);
      await seekerLogin(data.email, data.password);
      toast.success('Login successful!');
      
      // Add a small delay to ensure state updates are processed
      setTimeout(() => {
        navigate('/seeker/profile');
      }, 100);
    } catch (error) {
      console.error('Login submission error:', error);
      toast.error('Login failed. Please check your credentials and try again.');
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
              <div>
                <AuthForm 
                  type="login"
                  userType="seeker"
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute top-8 right-8 w-64 h-64 bg-freelancer-teal/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-8 left-8 w-64 h-64 bg-freelancer-purple/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-freelancer-dark mb-6">Welcome Back, Client!</h2>
                    <p className="text-freelancer-gray mb-6">
                      Sign in to access your account and connect with talented professionals for your projects.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-freelancer-dark font-bold">1</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Post Your Project</h3>
                          <p className="text-sm text-freelancer-gray">Describe what you need and set your budget</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-freelancer-teal font-bold">2</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Review Professionals</h3>
                          <p className="text-sm text-freelancer-gray">Browse profiles and select the best match</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-freelancer-purple font-bold">3</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Work & Pay Securely</h3>
                          <p className="text-sm text-freelancer-gray">Collaborate efficiently with secure payments</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-freelancer-dark/5 rounded-lg">
                      <p className="text-sm text-freelancer-gray italic">
                        "Finding qualified talent has never been easier. The quality of freelancers 
                        and the platform's ease of use exceeded my expectations." — Jennifer L., Marketing Director
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SeekerLogin;
