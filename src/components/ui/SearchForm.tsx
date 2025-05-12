
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchCriteria } from '../../services/types';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    skill: '',
    location: '',
    timePeriod: '',
    rating: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = (field: keyof SearchCriteria) => {
    setCriteria(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting search criteria:', criteria);
    onSearch(criteria);
  };

  return (
    <motion.form 
      className="glass-card rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="skill" className="block text-sm font-medium text-freelancer-gray mb-2">
            Skill
          </label>
          <div className="relative">
            <input
              type="text"
              id="skill"
              name="skill"
              value={criteria.skill}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              className="input-field pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-freelancer-gray">
              <Search size={18} />
            </div>
            {criteria.skill && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-freelancer-gray hover:text-freelancer-dark"
                onClick={() => handleClear('skill')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-freelancer-gray mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={criteria.location}
            onChange={handleChange}
            placeholder="Any location"
            className="input-field"
          />
          {criteria.location && (
            <button
              type="button"
              className="absolute right-3 top-[calc(50%+10px)] -translate-y-1/2 text-freelancer-gray hover:text-freelancer-dark"
              onClick={() => handleClear('location')}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="relative">
          <label htmlFor="timePeriod" className="block text-sm font-medium text-freelancer-gray mb-2">
            Time Period
          </label>
          <input
            type="text"
            id="timePeriod"
            name="timePeriod"
            value={criteria.timePeriod}
            onChange={handleChange}
            placeholder="e.g. Full-time, Contract"
            className="input-field"
          />
          {criteria.timePeriod && (
            <button
              type="button"
              className="absolute right-3 top-[calc(50%+10px)] -translate-y-1/2 text-freelancer-gray hover:text-freelancer-dark"
              onClick={() => handleClear('timePeriod')}
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-freelancer-gray mb-2">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={criteria.rating}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Any Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Star</option>
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-freelancer-dark text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center"
        >
          <Search size={18} className="mr-2" />
          Search
        </button>
      </div>
    </motion.form>
  );
};

export default SearchForm;
