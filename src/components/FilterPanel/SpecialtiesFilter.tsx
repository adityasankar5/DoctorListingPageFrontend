import React, { useMemo } from 'react';

type SpecialtiesFilterProps = {
  specialties: string[];
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
};

const SpecialtiesFilter: React.FC<SpecialtiesFilterProps> = ({
  specialties,
  selectedSpecialties,
  onChange
}) => {
  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(item => item !== specialty)
      : [...selectedSpecialties, specialty];

    onChange(updatedSpecialties);
  };

  const getTestId = (specialty: string) => {
    // Map specialty names to their exact data-testid values
    const testIdMap: Record<string, string> = {
      'General Physician': 'filter-specialty-General-Physician',
      'Dentist': 'filter-specialty-Dentist',
      'Dermatologist': 'filter-specialty-Dermatologist',
      'Paediatrician': 'filter-specialty-Paediatrician',
      'Gynaecologist': 'filter-specialty-Gynaecologist',
      'ENT': 'filter-specialty-ENT',
      'Diabetologist': 'filter-specialty-Diabetologist',
      'Cardiologist': 'filter-specialty-Cardiologist',
      'Physiotherapist': 'filter-specialty-Physiotherapist',
      'Endocrinologist': 'filter-specialty-Endocrinologist',
      'Orthopaedic': 'filter-specialty-Orthopaedic',
      'Ophthalmologist': 'filter-specialty-Ophthalmologist',
      'Gastroenterologist': 'filter-specialty-Gastroenterologist',
      'Pulmonologist': 'filter-specialty-Pulmonologist',
      'Psychiatrist': 'filter-specialty-Psychiatrist',
      'Urologist': 'filter-specialty-Urologist',
      'Dietitian/Nutritionist': 'filter-specialty-Dietitian-Nutritionist',
      'Psychologist': 'filter-specialty-Psychologist',
      'Sexologist': 'filter-specialty-Sexologist',
      'Nephrologist': 'filter-specialty-Nephrologist',
      'Neurologist': 'filter-specialty-Neurologist',
      'Oncologist': 'filter-specialty-Oncologist',
      'Ayurveda': 'filter-specialty-Ayurveda',
      'Homeopath': 'filter-specialty-Homeopath'
    };

    return testIdMap[specialty] || `filter-specialty-${specialty.replace(/[^a-zA-Z0-9]/g, '-')}`;
  };

  const sortedSpecialties = useMemo(() => [...specialties].sort(), [specialties]);

  return (
    <div className="mb-6">
      <h3
        data-testid="filter-header-speciality"
        className="text-lg font-medium mb-3 text-gray-800"
      >
        Specialties
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {sortedSpecialties.map(specialty => (
          <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              data-testid={getTestId(specialty)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
              checked={selectedSpecialties.includes(specialty)}
              onChange={() => handleSpecialtyChange(specialty)}
            />
            <span className="text-gray-700">{specialty}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SpecialtiesFilter);