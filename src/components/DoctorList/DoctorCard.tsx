import React from 'react';
import { Doctor } from '../../types/Doctor';
import { UserRound, Building2, MapPin } from 'lucide-react';

type DoctorCardProps = {
  doctor: Doctor;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  if (!doctor) {
    return null;
  }

  const specialties = doctor.specialities?.map(s => s.name).join(', ') || '';
  const experience = doctor.experience || 'N/A';
  const fees = doctor.fees || 'N/A';

  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow p-6 mb-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">
          {doctor.photo ? (
            <img 
              src={doctor.photo} 
              alt={doctor.name} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100">
              <UserRound className="w-10 h-10 text-blue-500" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 
                data-testid="doctor-name" 
                className="text-xl font-semibold text-gray-900"
              >
                {doctor.name}
              </h3>
              <p 
                data-testid="doctor-specialty" 
                className="text-gray-600"
              >
                {specialties}
              </p>
              <p className="text-sm text-gray-500 mt-1">{doctor.doctor_introduction}</p>
            </div>
            <div className="text-right">
              <p 
                data-testid="doctor-fee" 
                className="text-xl font-semibold text-gray-900"
              >
                {fees}
              </p>
              <p 
                data-testid="doctor-experience" 
                className="text-sm text-gray-600"
              >
                {experience}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{doctor.clinic.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{`${doctor.clinic.address.address_line1}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`}</span>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DoctorCard);