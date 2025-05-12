
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';

export interface AuthFormFields {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  skill?: string;
  experience?: string;
  location?: string;
  timePeriod?: string;
  basePrice?: string;
}

interface AuthFormProps {
  type: 'login' | 'register';
  userType: 'provider' | 'seeker';
  onSubmit: (data: AuthFormFields) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  userType,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<AuthFormFields>({
    name: '',
    email: '',
    password: '',
    phone: '',
    skill: '',
    experience: '',
    location: '',
    timePeriod: '',
    basePrice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isRegister = type === 'register';
  const isSeeker = userType === 'seeker';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-8 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-freelancer-dark mb-6 text-center">
        {isRegister ? 'Create an Account' : 'Welcome Back'}
      </h2>
      <p className="text-freelancer-gray text-sm mb-8 text-center">
        {isRegister
          ? `Join as a ${isSeeker ? 'client' : 'freelancer'} and ${
              isSeeker ? 'find skilled professionals' : 'discover opportunities'
            }.`
          : `Sign in to your ${isSeeker ? 'client' : 'freelancer'} account.`}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="relative">
            <label htmlFor="name" className="text-sm font-medium text-freelancer-gray block mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
                <User size={18} />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="input-field pl-10"
              />
            </div>
          </div>
        )}

        <div className="relative">
          <label htmlFor="email" className="text-sm font-medium text-freelancer-gray block mb-1">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
              <Mail size={18} />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="text-sm font-medium text-freelancer-gray block mb-1">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
              <Lock size={18} />
            </span>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isRegister ? 'Create password' : 'Enter password'}
              required
              className="input-field pl-10"
            />
          </div>
        </div>

        {isRegister && (
          <>
            <div className="relative">
              <label htmlFor="phone" className="text-sm font-medium text-freelancer-gray block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {isSeeker && (
              <>
                <div className="relative">
                  <label htmlFor="skill" className="text-sm font-medium text-freelancer-gray block mb-1">
                    Skill Required
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
                      <Briefcase size={18} />
                    </span>
                    <input
                      type="text"
                      id="skill"
                      name="skill"
                      value={formData.skill}
                      onChange={handleChange}
                      placeholder="e.g. Web Development"
                      required
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="experience" className="text-sm font-medium text-freelancer-gray block mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Minimum years of experience"
                    required
                    min="0"
                    className="input-field"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="location" className="text-sm font-medium text-freelancer-gray block mb-1">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
                      <MapPin size={18} />
                    </span>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Remote, New York"
                      required
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="timePeriod" className="text-sm font-medium text-freelancer-gray block mb-1">
                    Time Period
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
                      <Clock size={18} />
                    </span>
                    <input
                      type="text"
                      id="timePeriod"
                      name="timePeriod"
                      value={formData.timePeriod}
                      onChange={handleChange}
                      placeholder="e.g. Full-time, Contract"
                      required
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="basePrice" className="text-sm font-medium text-freelancer-gray block mb-1">
                    Base Price ($/hr)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
                      <DollarSign size={18} />
                    </span>
                    <input
                      type="number"
                      id="basePrice"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleChange}
                      placeholder="Your budget per hour"
                      required
                      min="0"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium mt-6 flex items-center justify-center transition-all duration-300 ${
            isLoading
              ? 'bg-freelancer-dark/70 cursor-not-allowed'
              : 'bg-freelancer-dark hover:shadow-lg'
          } text-white`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isRegister ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-freelancer-gray">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <Link
            to={`/${userType}/${isRegister ? 'login' : 'register'}`}
            className="ml-1 text-freelancer-teal hover:underline font-medium"
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthForm;
