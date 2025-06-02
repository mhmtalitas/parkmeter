import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Main parking meter head */}
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: '8px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#3498DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner display */}
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              fontWeight: 'bold',
              color: '#3498DB',
            }}
          >
            P
          </div>
        </div>
        
        {/* Meter pole */}
        <div
          style={{
            position: 'absolute',
            top: '19px',
            left: '14px',
            width: '4px',
            height: '10px',
            background: '#3498DB',
            borderRadius: '2px',
          }}
        />
        
        {/* M letter */}
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '12px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#3498DB',
          }}
        >
          M
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 