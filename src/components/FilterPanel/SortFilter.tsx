import React from 'react';

type SortFilterProps = {
  selectedSort: string;
  onChange: (sort: string) => void;
};

const SortFilter: React.FC<SortFilterProps> = ({ selectedSort, onChange }) => {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-sort" 
        className="text-lg font-medium mb-3 text-gray-800"
      >
        Sort by
      </h3>
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            data-testid="sort-fees"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedSort === 'fees'}
            onChange={() => onChange('fees')}
          />
          <span className="text-gray-700">Price: Low-High</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            data-testid="sort-experience"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedSort === 'experience'}
            onChange={() => onChange('experience')}
          />
          <span className="text-gray-700">Experience - Most Experience first</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(SortFilter);