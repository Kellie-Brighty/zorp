import { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { MapPin } from 'lucide-react';
import { loadGoogleMapsScript } from '../utils/loadGoogleMaps';

interface LocationPickerProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string, place?: google.maps.places.PlaceResult) => void;
  disabled?: boolean;
  className?: string;
}

const LocationPicker = ({ 
  placeholder = "Enter location", 
  value, 
  onChange, 
  disabled = false,
  className = ""
}: LocationPickerProps) => {
  const inputRef = useRef<InputRef>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        // Load Google Maps script if not already loaded
        await loadGoogleMapsScript();
        
        if (inputRef.current?.input && window.google && window.google.maps && window.google.maps.places) {
          // Clear any existing autocomplete
          if (autocompleteRef.current) {
            window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
          }

          // Initialize Google Places Autocomplete
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current.input, {
            types: ['establishment', 'geocode'],
            fields: ['place_id', 'formatted_address', 'geometry', 'name']
          });

          // Listen for place selection
          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place && place.formatted_address) {
              setInputValue(place.formatted_address);
              onChange?.(place.formatted_address, place);
            }
          });

          // Prevent form submission when selecting from dropdown
          inputRef.current.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.querySelector('.pac-item-selected')) {
              e.preventDefault();
            }
          });
        }
      } catch (error) {
        console.warn('Failed to load Google Maps or initialize Autocomplete:', error);
      }
    };

    // Wait for the component to be fully mounted
    const timer = setTimeout(initializeAutocomplete, 200);

    return () => {
      clearTimeout(timer);
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        prefix={<MapPin className="text-primary-red" size={16} />}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        disabled={disabled}
        className={`h-12 border-gray-300 rounded-lg focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 transition-all duration-200 ${className}`}
        style={{
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      />
      <style>{`
        .pac-container {
          border-radius: 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #e5e7eb !important;
          margin-top: 4px !important;
          font-family: 'Open Sans', sans-serif !important;
          z-index: 9999 !important;
        }
        
        @media (max-width: 768px) {
          .pac-container {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
          }
        }
        
        .pac-item {
          padding: 12px 16px !important;
          border-bottom: 1px solid #f3f4f6 !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          transition: background-color 0.2s ease !important;
          cursor: pointer !important;
        }
        
        .pac-item:hover,
        .pac-item-selected {
          background-color: #fef2f2 !important;
        }
        
        .pac-item-query {
          color: #1f2937 !important;
          font-weight: 500 !important;
        }
        
        .pac-matched {
          color: #dc2626 !important;
          font-weight: 600 !important;
        }
        
        .pac-icon {
          margin-right: 12px !important;
        }
        
        .pac-item:last-child {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
};

export default LocationPicker;
