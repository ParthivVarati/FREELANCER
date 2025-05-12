
import React from 'react';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  id: string;
  name: string;
  skill: string;
  experience: number;
  location: string;
  timePeriod: string;
  basePrice: number;
  rating: number;
  reviews: number;
  delay?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  skill,
  experience,
  location,
  timePeriod,
  basePrice,
  rating,
  reviews,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-freelancer-dark">{name}</h3>
            <p className="text-sm text-freelancer-gray">{skill}</p>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="ml-1 text-xs text-freelancer-gray">({reviews})</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-freelancer-gray">
            <MapPin size={16} className="mr-2 text-freelancer-teal" />
            {location}
          </div>
          <div className="flex items-center text-sm text-freelancer-gray">
            <Clock size={16} className="mr-2 text-freelancer-purple" />
            {timePeriod}
          </div>
          <div className="flex items-center text-sm text-freelancer-gray">
            <DollarSign size={16} className="mr-2 text-green-500" />
            ${basePrice}/hr
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-freelancer-gray">
            <span className="font-medium text-freelancer-dark">{experience}</span> years exp.
          </div>
          <Link
            to={`/seeker/profile/${id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-freelancer-dark rounded-lg hover:bg-freelancer-dark/90 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
