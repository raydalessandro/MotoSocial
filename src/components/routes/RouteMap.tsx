'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface RouteMapProps {
  routes?: Array<{
    id: string;
    title: string;
    points: Array<{ lat: number; lng: number }>;
  }>;
  height?: string;
}

export default function RouteMap({ routes = [], height = '400px' }: RouteMapProps) {
  useEffect(() => {
    // Fix Leaflet icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Initialize map
    const map = L.map('map').setView([45.4642, 9.1900], 10); // Milano

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add routes
    routes.forEach(route => {
      if (route.points.length > 0) {
        const polyline = L.polyline(
          route.points.map(p => [p.lat, p.lng]),
          { color: 'red', weight: 3 }
        ).addTo(map);
        
        polyline.bindPopup(route.title);
        
        // Fit map to route
        if (routes.length === 1) {
          map.fitBounds(polyline.getBounds());
        }
      }
    });

    return () => {
      map.remove();
    };
  }, [routes]);

  return <div id="map" style={{ height, width: '100%', borderRadius: '8px' }} />;
}
