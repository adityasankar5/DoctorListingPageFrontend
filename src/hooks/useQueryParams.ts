import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type QueryParams = {
  search: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
};

export const useQueryParams = (): [
  QueryParams,
  (params: Partial<QueryParams>) => void
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<QueryParams>({
    search: searchParams.get('search') || '',
    consultationType: searchParams.get('consultationType') || '',
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    sortBy: searchParams.get('sortBy') || '',
  });

  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (params.search) newParams.set('search', params.search);
    if (params.consultationType) newParams.set('consultationType', params.consultationType);
    if (params.specialties.length) newParams.set('specialties', params.specialties.join(','));
    if (params.sortBy) newParams.set('sortBy', params.sortBy);
    
    setSearchParams(newParams);
  }, [params, setSearchParams]);

  const updateParams = (newParams: Partial<QueryParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return [params, updateParams];
};