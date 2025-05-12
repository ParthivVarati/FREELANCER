
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm, { AuthFormFields } from '../components/ui/AuthForm';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

const ProviderLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { providerLogin, isAuthenticated, userType } = useAuth();

  useEffect(() => {
    // If already authenticated as provider, redirect to dashboard
    if (isAuthenticated && userType === 'provider') {
      toast.info('Already logged in. Redirecting to dashboard...');
      navigate('/provider/dashboard');
    }
  }, [isAuthenticated, userType, navigate]);

  const handleSubmit = async (data: AuthFormFields) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting provider login with:', data.email);
      await providerLogin(data.email, data.password);
      toast.success('Login successful!');
      
      // Add a small delay to ensure state updates are processed
      setTimeout(() => {
        navigate('/provider/dashboard');
      }, 100);
    } catch (error) {
      console.error('Provider login error:', error);
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
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute top-8 left-8 w-64 h-64 bg-freelancer-purple/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-8 right-8 w-64 h-64 bg-freelancer-teal/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-freelancer-dark mb-6">Welcome Back, Provider!</h2>
                    <p className="text-freelancer-gray mb-6">
                      Sign in to access your account and discover new opportunities that match your skills and expertise.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-freelancer-dark font-bold">1</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Browse Projects</h3>
                          <p className="text-sm text-freelancer-gray">Find projects that match your skills and interests</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-freelancer-teal font-bold">2</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Connect with Clients</h3>
                          <p className="text-sm text-freelancer-gray">Communicate directly with potential clients</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-freelancer-purple font-bold">3</span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Get Hired & Paid</h3>
                          <p className="text-sm text-freelancer-gray">Secure work and receive payment through our platform</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-freelancer-dark/5 rounded-lg">
                      <p className="text-sm text-freelancer-gray italic">
                        "FREELANCER has transformed how I find clients. The platform is intuitive 
                        and the connections are high-quality." — Michael P., Web Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <AuthForm 
                  type="login"
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

export default ProviderLogin;
