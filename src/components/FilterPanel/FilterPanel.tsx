import React from 'react';
import ConsultationFilter from './ConsultationFilter';
import SpecialtiesFilter from './SpecialtiesFilter';
import SortFilter from './SortFilter';

type FilterPanelProps = {
  consultationType: string;
  selectedSpecialties: string[];
  sortBy: string;
  allSpecialties: string[];
  onConsultationTypeChange: (type: string) => void;
  onSpecialtiesChange: (specialties: string[]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  consultationType,
  selectedSpecialties,
  sortBy,
  allSpecialties,
  onConsultationTypeChange,
  onSpecialtiesChange,
  onSortChange,
  onClearFilters
}) => {
  const hasActiveFilters = consultationType || selectedSpecialties.length > 0 || sortBy;

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button 
            onClick={onClearFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      
      <SortFilter 
        selectedSort={sortBy} 
        onChange={onSortChange} 
      />
      
      <ConsultationFilter 
        selectedType={consultationType} 
        onChange={onConsultationTypeChange} 
      />
      
      <SpecialtiesFilter 
        specialties={allSpecialties} 
        selectedSpecialties={selectedSpecialties} 
        onChange={onSpecialtiesChange} 
      />
    </div>
  );
};

export default FilterPanel;