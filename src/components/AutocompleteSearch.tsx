import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Doctor } from '../types/Doctor';

type AutocompleteSearchProps = {
  doctors: Doctor[];
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
};

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
  doctors, 
  onSearch, 
  initialValue = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const filteredDoctors = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(lowerSearchTerm))
      .slice(0, 3);
    
    setSuggestions(filteredDoctors);
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for doctors by name..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {doctor.photo ? (
                    <img 
                      src={doctor.photo} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100">
                      <span className="text-blue-500 font-medium">
                        {doctor.name_initials || doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{doctor.name}</div>
                  <div className="text-sm text-gray-600">
                    {doctor.specialities?.map(s => s.name).join(', ')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;