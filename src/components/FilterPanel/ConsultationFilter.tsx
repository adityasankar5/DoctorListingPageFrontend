import React from 'react';

type ConsultationFilterProps = {
  selectedType: string;
  onChange: (type: string) => void;
};

const ConsultationFilter: React.FC<ConsultationFilterProps> = ({ 
  selectedType, 
  onChange 
}) => {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-moc" 
        className="text-lg font-medium mb-3 text-gray-800"
      >
        Mode of consultation
      </h3>
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            data-testid="filter-video-consult"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedType === 'Video Consultation'}
            onChange={() => onChange('Video Consultation')}
          />
          <span className="text-gray-700">Video Consultation</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            data-testid="filter-in-clinic"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedType === 'In-clinic Consultation'}
            onChange={() => onChange('In-clinic Consultation')}
          />
          <span className="text-gray-700">In-clinic Consultation</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-blue-600"
            checked={selectedType === 'All'}
            onChange={() => onChange('All')}
          />
          <span className="text-gray-700">All</span>
        </label>
      </div>
    </div>
  );
};

export default React.memo(ConsultationFilter);