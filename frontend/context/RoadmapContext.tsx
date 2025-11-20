'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Roadmap, SearchFilters } from '@/lib/types';
import { initializeValidator, validateRoadmapJSON, loadRoadmapFromURL } from '@/lib/validator';
import { useApiClient } from '@/lib/api-client';

interface RoadmapContextType {
  roadmap: Roadmap | null;
  loading: boolean;
  error: string | null;
  validatorInitialized: boolean;
  loadRoadmap: (source: string | File) => Promise<void>;
  loadRoadmapById: (roadmapId: string) => Promise<void>;
  setRoadmapDirect: (roadmap: Roadmap) => void;
  clearRoadmap: () => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: ReactNode }) {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validatorInitialized, setValidatorInitialized] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  // Initialize validator on mount (optional - only needed for file uploads)
  // Commented out for now since we're using database-loaded roadmaps
  // React.useEffect(() => {
  //   const init = async () => {
  //     try {
  //       await initializeValidator();
  //       setValidatorInitialized(true);
  //     } catch (err) {
  //       console.error('Failed to initialize validator:', err);
  //       // Don't set error - validator is optional for database-loaded roadmaps
  //       console.warn('Schema validator not initialized. File uploads will not work.');
  //     }
  //   };

  //   init();
  // }, []);

  const loadRoadmap = useCallback(async (source: string | File) => {
    if (!validatorInitialized) {
      setError('Schema validator not available. Please use the database-loaded roadmaps instead.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;

      if (typeof source === 'string') {
        // Load from URL
        result = await loadRoadmapFromURL(source);
      } else {
        // Load from File
        const text = await source.text();
        result = validateRoadmapJSON(text);
      }

      if (result.valid && result.data) {
        setRoadmap(result.data);
        setError(null);
      } else {
        setError(result.errorMessage || 'Invalid roadmap data');
        setRoadmap(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roadmap');
      setRoadmap(null);
    } finally {
      setLoading(false);
    }
  }, [validatorInitialized]);

  const apiClient = useApiClient();

  const loadRoadmapById = useCallback(async (roadmapId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.get(`/api/roadmaps/${roadmapId}`);

      // Use current_roadmap for editable version
      // Backend returns the roadmap object directly, check structure
      // If backend returns { roadmap: ... }, use data.roadmap
      // Based on my implementation of GET /api/roadmaps/{roadmap_id}, it returns RoadmapResponse which has 'roadmap' field
      setRoadmap(data.roadmap.current_roadmap || data.roadmap);
    } catch (err) {
      setError((err as Error).message || 'Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setRoadmapDirect = useCallback((roadmap: Roadmap) => {
    setRoadmap(roadmap);
    setError(null);
  }, []);

  const clearRoadmap = useCallback(() => {
    setRoadmap(null);
    setError(null);
    setFilters({});
  }, []);

  const value: RoadmapContextType = {
    roadmap,
    loading,
    error,
    validatorInitialized,
    loadRoadmap,
    loadRoadmapById,
    setRoadmapDirect,
    clearRoadmap,
    filters,
    setFilters,
  };

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}
