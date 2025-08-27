'use client'

import { APIProvider, Map } from '@vis.gl/react-google-maps'

export default function GoogleMap(): JSX.Element {
  return (
    <APIProvider apiKey="AIzaSyAZhjK4Uio-T1ZkADdweo1uxHC9jRUYEM0">
      <Map
        styles={[
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                visibility: 'on',
              },
              {
                lightness: 33,
              },
            ],
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
              {
                color: '#f2e5d4',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#c5dac6',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'on',
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#c5c6c6',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e4d7c6',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              {
                color: '#fbfaf7',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [
              {
                visibility: 'on',
              },
              {
                color: '#acbcc9',
              },
            ],
          },
        ]}
        style={{ width: '100%', height: '350px', maxWidth: '768px' }}
        defaultCenter={{ lat: 25.75, lng: -80.1918 }}
        defaultZoom={10}
        gestureHandling={'none'}
        disableDefaultUI={true}
      />
    </APIProvider>
  )
}
