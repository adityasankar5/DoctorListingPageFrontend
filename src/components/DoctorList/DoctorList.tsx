import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../../types/Doctor';

type DoctorListProps = {
  doctors: Doctor[];
  isLoading: boolean;
};

const DoctorList: React.FC<DoctorListProps> = ({ doctors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!doctors?.length) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No doctors found</h3>
        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors
        .filter((doctor): doctor is Doctor => doctor != null && doctor !== undefined)
        .map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
    </div>
  );
};

export default DoctorList;