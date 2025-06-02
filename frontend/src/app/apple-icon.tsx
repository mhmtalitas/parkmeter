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
          fontSize: 120,
          background: 'linear-gradient(135deg, #0066CC 0%, #004499 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '22px',
          boxShadow: '0 10px 30px rgba(0,102,204,0.3)',
        }}
      >
        🅿️
      </div>
    ),
    {
      ...size,
    }
  )
} 