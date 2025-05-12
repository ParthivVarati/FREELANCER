
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthForm from '../components/ui/AuthForm';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { api } from '../services/api';
import { AuthFormFields } from '../services/types';

const SeekerRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Map form fields to match the API expected names
      const formData: AuthFormFields = {
        name: data.name || '',
        email: data.email,
        password: data.password,
        phone: data.phone || '',
        skill: data.skill || '',
        experience: data.experience ? Number(data.experience) : 0,
        location: data.location || '',
        timePeriod: data.timePeriod || '',
        basePrice: data.basePrice ? Number(data.basePrice) : 0
      };
      
      console.log('Submitting seeker registration with data:', formData);
      const response = await api.seekerRegister(formData);
      
      console.log('Seeker registration response:', response);
      toast.success('Account created successfully!');
      navigate('/seeker/login');
    } catch (error) {
      console.error('Seeker registration error:', error);
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
              <div>
                <AuthForm 
                  type="register"
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
                    <h2 className="text-2xl font-bold text-freelancer-dark mb-6">Become a Client</h2>
                    <p className="text-freelancer-gray mb-6">
                      Join our platform to find skilled professionals for your projects and business needs.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-freelancer-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Create Your Project</h3>
                          <p className="text-sm text-freelancer-gray">Describe your needs, budget, and timeline</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-freelancer-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Connect with Talent</h3>
                          <p className="text-sm text-freelancer-gray">Browse profiles and review portfolios</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-freelancer-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-freelancer-dark">Complete Projects</h3>
                          <p className="text-sm text-freelancer-gray">Get quality work delivered on time</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-freelancer-dark/5 rounded-lg">
                      <p className="text-sm text-freelancer-gray">
                        Join thousands of businesses already finding quality talent on FREELANCER.
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

export default SeekerRegister;
