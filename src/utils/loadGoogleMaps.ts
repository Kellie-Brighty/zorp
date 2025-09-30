export const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Get API key from environment variables
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      reject(new Error('Google Maps API key not found. Please set VITE_GOOGLE_MAPS_API_KEY in your environment variables.'));
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    // Handle script load
    script.onload = () => {
      resolve();
    };
    
    // Handle script error
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps script'));
    };

    // Append script to head
    document.head.appendChild(script);
  });
};
