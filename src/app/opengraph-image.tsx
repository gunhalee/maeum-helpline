import { ImageResponse } from 'next/og'

export const alt = 'Helpline Korea social card'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background:
            'linear-gradient(135deg, #f5f8ef 0%, #edf5e1 42%, #dff0d3 100%)',
          color: '#1c1917',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#166534',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 9999,
                background: '#16a34a',
              }}
            />
            Helpline Korea
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 18px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(22,101,52,0.15)',
              fontSize: 24,
              color: '#166534',
            }}
          >
            109 · 119 · 112
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 800,
              maxWidth: '92%',
            }}
          >
            Korean crisis helpline directory
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              lineHeight: 1.4,
              color: '#44403c',
              maxWidth: '82%',
            }}
          >
            Compare trusted support numbers for crisis, depression, violence,
            youth, addiction, migrants, and older adults.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: '#57534e',
          }}
        >
          <div style={{ display: 'flex' }}>helpline.or.kr</div>
          <div style={{ display: 'flex' }}>Emergency support across Korea</div>
        </div>
      </div>
    ),
    size
  )
}
