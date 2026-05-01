'use client';

import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { DEMO_POLL_BOOTHS } from '@/lib/constants';
import { BoothCard } from './BoothCard';
import { PollBooth } from '@/lib/types';
import { MagnifyingGlass, Crosshair, MapPin } from '@phosphor-icons/react';

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const DELHI_CENTER = { lat: 28.6139, lng: 77.2090 };

export function BoothLocator() {
  const [activeBooth, setActiveBooth] = useState<PollBooth | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooths, setFilteredBooths] = useState(DEMO_POLL_BOOTHS);
  const [mapCenter, setMapCenter] = useState(DELHI_CENTER);
  const [mapZoom, setMapZoom] = useState(11);

  const handleBoothSelect = (booth: PollBooth) => {
    setActiveBooth(booth);
    setMapCenter({ lat: booth.lat, lng: booth.lng });
    setMapZoom(15);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredBooths(DEMO_POLL_BOOTHS);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = DEMO_POLL_BOOTHS.filter(
      booth => 
        booth.name.toLowerCase().includes(query) || 
        booth.address.toLowerCase().includes(query) ||
        booth.district.toLowerCase().includes(query)
    );
    setFilteredBooths(filtered);
    
    if (filtered.length === 1) {
      handleBoothSelect(filtered[0]);
    }
  }, [searchQuery]);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setMapZoom(14);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to access your location. Please check your browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (!MAPS_API_KEY) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-white rounded-xl border border-[var(--border-default)]">
        <div className="text-center p-8 max-w-md">
          <MapPin size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Maps API Key Required</h3>
          <p className="text-[var(--text-secondary)]">
            Please add your Google Maps API key to .env.local as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the polling booth locator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[700px] w-full rounded-xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] bg-white">
      
      {/* Left Panel - Search & List */}
      <div className="w-full lg:w-96 bg-white flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-default)] z-10 relative">
        
        <div className="p-4 border-b border-[var(--border-default)] sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Find Your Booth</h2>
          
          <div className="relative mb-3">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input 
              type="text"
              placeholder="Search by area or pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            />
          </div>
          
          <button 
            onClick={handleUseMyLocation}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-[var(--accent)] bg-[var(--accent-light)] border border-[var(--accent)]/15 hover:bg-[var(--accent)]/10 transition-colors"
          >
            <Crosshair size={18} />
            Use My Current Location
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredBooths.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-muted)]">
              No polling booths found matching your search.
            </div>
          ) : (
            filteredBooths.map(booth => (
              <BoothCard 
                key={booth.id} 
                booth={booth} 
                isActive={activeBooth?.id === booth.id}
                onClick={() => handleBoothSelect(booth)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 h-[400px] lg:h-full relative bg-[var(--bg-secondary)]">
        <APIProvider apiKey={MAPS_API_KEY}>
          <Map
            defaultCenter={DELHI_CENTER}
            center={mapCenter}
            defaultZoom={11}
            zoom={mapZoom}
            mapId="electiq_dark_map"
            disableDefaultUI={true}
            gestureHandling={'greedy'}
            onCenterChanged={(ev) => setMapCenter(ev.detail.center)}
            onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
          >
            {filteredBooths.map(booth => (
              <AdvancedMarker
                key={booth.id}
                position={{ lat: booth.lat, lng: booth.lng }}
                onClick={() => handleBoothSelect(booth)}
                title={booth.name}
              >
                <Pin 
                  background={activeBooth?.id === booth.id ? '#E8830C' : '#1B2559'}
                  borderColor={activeBooth?.id === booth.id ? '#FFFFFF' : '#8E95B2'} 
                  glyphColor={activeBooth?.id === booth.id ? '#FFFFFF' : '#E2E5ED'}
                  scale={activeBooth?.id === booth.id ? 1.2 : 1}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>

    </div>
  );
}
