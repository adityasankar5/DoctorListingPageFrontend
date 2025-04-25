import { Doctor } from '../types/Doctor';

export const filterByName = (doctors: Doctor[], searchTerm: string): Doctor[] => {
  if (!searchTerm) return doctors;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(lowerSearchTerm)
  );
};

export const filterByConsultationType = (doctors: Doctor[], consultationType: string): Doctor[] => {
  if (!consultationType || consultationType === 'All') return doctors;
  
  return doctors.filter(doctor => {
    if (consultationType === 'Video Consultation') return doctor.video_consult;
    if (consultationType === 'In-clinic Consultation') return doctor.in_clinic;
    return true;
  });
};

export const filterBySpecialties = (doctors: Doctor[], selectedSpecialties: string[]): Doctor[] => {
  if (!selectedSpecialties.length) return doctors;
  
  return doctors.filter(doctor => 
    selectedSpecialties.some(specialty => 
      doctor.specialities?.some(s => s.name === specialty)
    )
  );
};

export const sortDoctors = (doctors: Doctor[], sortBy: string): Doctor[] => {
  if (!sortBy) return doctors;
  
  const sortedDoctors = [...doctors];
  
  if (sortBy === 'fees') {
    return sortedDoctors.sort((a, b) => {
      const aFee = parseInt(a.fees.replace(/[^\d]/g, ''));
      const bFee = parseInt(b.fees.replace(/[^\d]/g, ''));
      return aFee - bFee;
    });
  } else if (sortBy === 'experience') {
    return sortedDoctors.sort((a, b) => {
      const aExp = parseInt(a.experience);
      const bExp = parseInt(b.experience);
      return bExp - aExp;
    });
  }
  
  return sortedDoctors;
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialities?.forEach(specialty => {
      if (specialty.name) {
        specialtiesSet.add(specialty.name);
      }
    });
  });
  
  return Array.from(specialtiesSet).sort();
};