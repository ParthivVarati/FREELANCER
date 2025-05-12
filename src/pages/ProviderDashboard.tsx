import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Search, User, Settings, LogOut, Bell, AlertTriangle } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SearchForm from '../components/ui/SearchForm';
import ProfileCard from '../components/ui/ProfileCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { api, Seeker, SearchCriteria } from '../services/api';
import { API_BASE_URL } from '../services/types';

const ProviderDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [seekers, setSeekers] = useState<Seeker[]>([]);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      setTimeout(() => {
        navigate('/provider/login');
      }, 2000);
      return;
    }

    const fetchInitialSeekers = async () => {
      try {
        setApiError(false);
        const results = await api.searchSeekers({
          skill: '',
          location: '',
          timePeriod: '',
          rating: ''
        });
        console.log('Initial seekers loaded:', results);
        setSeekers(results);
      } catch (error) {
        console.error('Failed to fetch initial seekers:', error);
        setApiError(true);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          toast.error('Unable to connect to the API server. Using demo data instead.');
          // Set some demo data
          setSeekers([
            {
              id: 1,
              name: 'Demo User 1',
              skill: 'Web Development',
              experience: 4,
              location: 'Remote',
              timePeriod: 'Full-time',
              basePrice: 50,
              rating: 4.5,
              reviews: 15
            },
            {
              id: 2,
              name: 'Demo User 2',
              skill: 'Mobile Development',
              experience: 3,
              location: 'New York',
              timePeriod: 'Contract',
              basePrice: 65,
              rating: 4.8,
              reviews: 12
            }
          ]);
        } else {
          toast.error('Failed to load seekers data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialSeekers();
  }, [isAuthenticated, navigate]);

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    
    try {
      setApiError(false);
      console.log('Dashboard searching with criteria:', criteria);
      const results = await api.searchSeekers(criteria);
      console.log('Dashboard search results:', results);
      setSeekers(results);
      toast.success(`Found ${results.length} matching results`);
    } catch (error) {
      console.error('Dashboard search error:', error);
      setApiError(true);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('API server is not accessible. Using demo filtered data.');
        // Generate some filtered demo data based on search criteria
        const demoData = [
          {
            id: 1,
            name: 'Demo ' + (criteria.skill || 'Developer'),
            skill: criteria.skill || 'Web Development',
            experience: 4,
            location: criteria.location || 'Remote',
            timePeriod: criteria.timePeriod || 'Full-time',
            basePrice: 50,
            rating: 4.5,
            reviews: 15
          },
          {
            id: 2,
            name: 'Demo Freelancer',
            skill: criteria.skill || 'UI/UX Design',
            experience: 3,
            location: criteria.location || 'Remote',
            timePeriod: criteria.timePeriod || 'Contract',
            basePrice: 65,
            rating: 4.8,
            reviews: 12
          }
        ];
        setSeekers(demoData);
      } else {
        toast.error('Search failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/provider/login');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="container mx-auto">
            {!isAuthenticated ? (
              <div className="flex items-center justify-center h-64">
                <div className="glass-card rounded-xl p-8 text-center max-w-md animate-pulse-subtle">
                  <h2 className="text-2xl font-semibold text-freelancer-dark mb-4">Please Login First</h2>
                  <p className="text-freelancer-gray mb-6">
                    You need to be logged in to access the provider dashboard.
                  </p>
                  <button 
                    onClick={() => navigate('/provider/login')}
                    className="px-6 py-3 bg-freelancer-dark text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-freelancer-dark mb-2">Find Clients</h1>
                    <p className="text-freelancer-gray">
                      Discover opportunities that match your skills and preferences
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-5 mt-4 md:mt-0">
                    <button className="relative text-freelancer-dark hover:text-freelancer-teal transition-colors">
                      <Bell size={22} />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="text-freelancer-dark hover:text-freelancer-teal transition-colors">
                      <User size={22} />
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
                
                {apiError && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center">
                    <AlertTriangle className="text-amber-500 mr-3" size={20} />
                    <p className="text-sm text-amber-700">
                      API server is not accessible. Using demo data instead. Make sure your backend server is running at {API_BASE_URL}.
                    </p>
                  </div>
                )}
                
                <SearchForm onSearch={handleSearch} />
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
                    ))}
                  </div>
                ) : seekers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seekers.map((seeker, index) => (
                      <ProfileCard
                        key={seeker.id}
                        id={String(seeker.id)}
                        name={seeker.name}
                        skill={seeker.skill}
                        experience={seeker.experience}
                        location={seeker.location}
                        timePeriod={seeker.timePeriod}
                        basePrice={seeker.basePrice}
                        rating={seeker.rating}
                        reviews={seeker.reviews}
                        delay={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-freelancer-dark mb-2">No results found</h3>
                    <p className="text-freelancer-gray">
                      Try adjusting your search criteria to find more matches.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProviderDashboard;
