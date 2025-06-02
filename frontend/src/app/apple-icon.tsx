import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #E8F4FD 0%, #D1E9F6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '22px',
          position: 'relative',
        }}
      >
        {/* Main parking meter head */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#3498DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(52, 152, 219, 0.3)',
          }}
        >
          {/* Inner display */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#3498DB',
            }}
          >
            P
          </div>
        </div>
        
        {/* Orbital ring */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            width: '100px',
            height: '60px',
            borderRadius: '50px 50px 50px 50px / 30px 30px 30px 30px',
            border: '6px solid #3498DB',
            opacity: 0.7,
          }}
        />
        
        {/* Orbital dot */}
        <div
          style={{
            position: 'absolute',
            top: '35px',
            left: '40px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#3498DB',
          }}
        />
        
        {/* Meter pole */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            width: '20px',
            height: '50px',
            background: '#3498DB',
            borderRadius: '10px',
          }}
        />
        
        {/* M letter */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            fontSize: '48px',
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