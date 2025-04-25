import React, { useEffect, useState } from 'react';
import { fetchDoctors } from './api/api';
import { Doctor } from './types/Doctor';
import AutocompleteSearch from './components/AutocompleteSearch';
import FilterPanel from './components/FilterPanel/FilterPanel';
import DoctorList from './components/DoctorList/DoctorList';
import { useQueryParams } from './hooks/useQueryParams';
import { 
  filterByName, 
  filterByConsultationType, 
  filterBySpecialties, 
  sortDoctors,
  getAllSpecialties
} from './utils/filterUtils';

const DoctorPage: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [queryParams, updateQueryParams] = useQueryParams();
  const { search, consultationType, specialties, sortBy } = queryParams;

  // Fetch doctors data
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDoctors();
        
        if (Array.isArray(data)) {
          // Ensure each doctor has a specialties array
          const sanitizedData = data.map(doctor => ({
            ...doctor,
            specialties: Array.isArray(doctor.specialties) ? doctor.specialties : []
          }));
          
          setAllDoctors(sanitizedData);
          setAllSpecialties(getAllSpecialties(sanitizedData));
        } else {
          console.error('Data fetched was not an array:', data);
          setAllDoctors([]);
          setAllSpecialties([]);
        }
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
        setAllDoctors([]);
        setAllSpecialties([]);
      } finally {
        setIsLoading(false);
      }
    };

    getDoctors();
  }, []);

  // Apply filters when parameters or data change
  useEffect(() => {
    if (allDoctors.length === 0) return;

    let results = [...allDoctors];
    
    // Apply name filter
    if (search) {
      results = filterByName(results, search);
    }
    
    // Apply consultation type filter
    if (consultationType) {
      results = filterByConsultationType(results, consultationType);
    }
    
    // Apply specialties filter
    if (specialties.length > 0) {
      results = filterBySpecialties(results, specialties);
    }
    
    // Apply sorting
    if (sortBy) {
      results = sortDoctors(results, sortBy);
    }
    
    setFilteredDoctors(results);
  }, [allDoctors, search, consultationType, specialties, sortBy]);

  const handleSearch = (searchTerm: string) => {
    updateQueryParams({ search: searchTerm });
  };

  const handleConsultationTypeChange = (type: string) => {
    updateQueryParams({ consultationType: type });
  };

  const handleSpecialtiesChange = (selectedSpecialties: string[]) => {
    updateQueryParams({ specialties: selectedSpecialties });
  };

  const handleSortChange = (sort: string) => {
    updateQueryParams({ sortBy: sort });
  };

  const handleClearFilters = () => {
    updateQueryParams({
      search: '',
      consultationType: '',
      specialties: [],
      sortBy: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 py-4">
        <div className="container mx-auto px-4">
          <AutocompleteSearch 
            doctors={allDoctors} 
            onSearch={handleSearch}
            initialValue={search}
          />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            <FilterPanel 
              consultationType={consultationType}
              selectedSpecialties={specialties}
              sortBy={sortBy}
              allSpecialties={allSpecialties}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSpecialtiesChange={handleSpecialtiesChange}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
            />
          </aside>
          
          <div className="md:w-3/4">
            <DoctorList 
              doctors={filteredDoctors} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorPage;