import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, Bell, Edit, MessageSquare, Calendar, Briefcase, MapPin, Clock, DollarSign, Star } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';

// Mock data for seeker profile
const mockProfile = {
  id: 's1',
  name: 'Sarah Johnson',
  skill: 'Graphic Design',
  experience: 3,
  location: 'London, UK',
  timePeriod: 'Part-time',
  basePrice: 35,
  rating: 4.5,
  reviews: 18,
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Creative director with 3+ years of experience looking for skilled graphic designers for ongoing projects in branding, digital marketing, and UI/UX design.',
  notifications: [
    {
      id: 'n1',
      type: 'message',
      content: 'New message from Michael Lee',
      date: '10 min ago',
      read: false
    },
    {
      id: 'n2',
      type: 'application',
      content: 'David Miller applied to your project',
      date: '2 hours ago',
      read: false
    },
    {
      id: 'n3',
      type: 'system',
      content: 'Your profile is getting a lot of views!',
      date: '1 day ago',
      read: true
    }
  ]
};

const SeekerProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is logged in using the auth context
    if (!isAuthenticated) {
      // Allow the component to render the login prompt instead of immediately redirecting
      setIsLoading(false);
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      // Use user data from auth context or mock data
      setProfile(user ? {
        ...mockProfile,
        name: user.name || mockProfile.name,
        email: user.email || mockProfile.email,
        skill: user.skill || mockProfile.skill,
        experience: user.experience || mockProfile.experience,
        location: user.location || mockProfile.location,
        timePeriod: user.timePeriod || mockProfile.timePeriod,
        basePrice: user.basePrice || mockProfile.basePrice,
      } : mockProfile);
      
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, user]);

  const handleLogout = () => {
    const { logout } = useAuth();
    logout();
    navigate('/seeker/login');
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-grow pt-24 pb-16 px-6">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="glass-card rounded-xl p-8 mb-8 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-8"></div>
                  <div className="h-24 bg-gray-200 rounded-lg mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-8 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded-full w-1/4 mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="container mx-auto">
            {!isAuthenticated ? (
              <div className="flex items-center justify-center h-64">
                <div className="glass-card rounded-xl p-8 text-center max-w-md">
                  <h2 className="text-2xl font-semibold text-freelancer-dark mb-4">Please Login First</h2>
                  <p className="text-freelancer-gray mb-6">
                    You need to be logged in to access your profile.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                    <button 
                      onClick={() => navigate('/seeker/login')}
                      className="px-6 py-3 bg-freelancer-dark text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                    >
                      Go to Login
                    </button>
                    <button 
                      onClick={() => navigate('/seeker/register')}
                      className="px-6 py-3 bg-white border border-freelancer-dark text-freelancer-dark rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ) : profile ? (
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-freelancer-dark mb-2">My Profile</h1>
                    <p className="text-freelancer-gray">
                      Manage your information and review notifications
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-5 mt-4 md:mt-0">
                    <button className="relative text-freelancer-dark hover:text-freelancer-teal transition-colors">
                      <Bell size={22} />
                      {profile.notifications.some(n => !n.read) && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </button>
                    <button className="text-freelancer-dark hover:text-freelancer-teal transition-colors">
                      <MessageSquare size={22} />
                    </button>
                    <button className="text-freelancer-dark hover:text-freelancer-teal transition-colors">
                      <Settings size={22} />
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="text-freelancer-dark hover:text-red-500 transition-colors"
                    >
                      <LogOut size={22} />
                    </button>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-xl overflow-hidden mb-8"
                >
                  <div className="h-32 bg-gradient-to-r from-freelancer-dark to-freelancer-purple"></div>
                  <div className="p-8 relative">
                    <div className="absolute right-8 top-8">
                      <button className="p-2 text-freelancer-dark hover:text-freelancer-teal bg-white rounded-full shadow-md transition-colors">
                        <Edit size={18} />
                      </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
                      <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center -mt-16">
                        <User size={40} className="text-freelancer-dark" />
                      </div>
                      
                      <div className="pt-3">
                        <h2 className="text-2xl font-bold text-freelancer-dark">{profile.name}</h2>
                        <p className="text-freelancer-gray">{profile.email}</p>
                        
                        <div className="mt-6">
                          <p className="text-freelancer-dark/80 mb-4">{profile.bio}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                            <div className="flex items-center space-x-2 text-freelancer-gray">
                              <Briefcase size={18} className="text-freelancer-purple" />
                              <span>{profile.skill}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-freelancer-gray">
                              <Calendar size={18} className="text-freelancer-dark" />
                              <span>{profile.experience} years experience</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-freelancer-gray">
                              <MapPin size={18} className="text-freelancer-dark" />
                              <span>{profile.location}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-freelancer-gray">
                              <Clock size={18} className="text-freelancer-purple" />
                              <span>{profile.timePeriod}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-freelancer-gray">
                              <DollarSign size={18} className="text-green-500" />
                              <span>${profile.basePrice}/hr base price</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-freelancer-gray">
                              <Star size={18} className="text-yellow-400 fill-yellow-400" />
                              <span>{profile.rating} rating ({profile.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass-card rounded-xl p-8"
                >
                  <h3 className="text-xl font-semibold text-freelancer-dark mb-6">Recent Notifications</h3>
                  
                  {profile.notifications.length > 0 ? (
                    <div className="space-y-4">
                      {profile.notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          className={`p-4 rounded-lg border ${notification.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'}`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-full ${getNotificationIconBg(notification.type)}`}>
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div>
                                <p className={`font-medium ${notification.read ? 'text-freelancer-dark' : 'text-freelancer-dark'}`}>
                                  {notification.content}
                                </p>
                                <p className="text-xs text-freelancer-gray mt-1">{notification.date}</p>
                              </div>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-freelancer-gray">
                      <Bell size={32} className="mx-auto mb-3 text-gray-300" />
                      <p>No notifications at the moment</p>
                    </div>
                  )}
                </motion.div>
              </div>
            ) : null}
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

// Helper functions for notifications
const getNotificationIcon = (type) => {
  switch (type) {
    case 'message':
      return <MessageSquare size={16} className="text-white" />;
    case 'application':
      return <User size={16} className="text-white" />;
    case 'system':
      return <Bell size={16} className="text-white" />;
    default:
      return <Bell size={16} className="text-white" />;
  }
};

const getNotificationIconBg = (type) => {
  switch (type) {
    case 'message':
      return 'bg-freelancer-purple';
    case 'application':
      return 'bg-freelancer-dark';
    case 'system':
      return 'bg-freelancer-teal';
    default:
      return 'bg-gray-500';
  }
};

export default SeekerProfile;
