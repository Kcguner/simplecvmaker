import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 20,
                    background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontFamily: 'sans-serif',
                }}
            >
                CV
            </div>
        ),
        {
            ...size,
        }
    )
}
