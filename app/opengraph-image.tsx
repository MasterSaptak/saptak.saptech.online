import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Saptak Roy Akash - Systems Builder & Cyber Security'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #001a00, #003300)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 26, 0, 0.9)',
                        border: '2px solid rgba(0, 255, 0, 0.4)',
                        borderRadius: '24px',
                        width: '100%',
                        height: '100%',
                        padding: '60px',
                        boxShadow: '0 0 60px rgba(0, 255, 0, 0.15)',
                    }}
                >
                    {/* Cyber accents */}
                    <div style={{ position: 'absolute', top: 40, left: 40, width: 40, height: 40, borderTop: '4px solid #00ff00', borderLeft: '4px solid #00ff00' }} />
                    <div style={{ position: 'absolute', top: 40, right: 40, width: 40, height: 40, borderTop: '4px solid #00ff00', borderRight: '4px solid #00ff00' }} />
                    <div style={{ position: 'absolute', bottom: 40, left: 40, width: 40, height: 40, borderBottom: '4px solid #00ff00', borderLeft: '4px solid #00ff00' }} />
                    <div style={{ position: 'absolute', bottom: 40, right: 40, width: 40, height: 40, borderBottom: '4px solid #00ff00', borderRight: '4px solid #00ff00' }} />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 80,
                                fontWeight: 'bold',
                                color: '#00ff00',
                                marginBottom: 20,
                                textAlign: 'center',
                                letterSpacing: '-2px',
                            }}
                        >
                            Saptak Roy Akash
                        </div>

                        <div
                            style={{
                                fontSize: 40,
                                color: '#f8fafc',
                                display: 'flex',
                                textAlign: 'center',
                                marginBottom: 50,
                                fontWeight: 600,
                            }}
                        >
                            Systems Builder • Cyber Security • Robotics
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(0, 255, 0, 0.1)',
                                padding: '16px 32px',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 255, 0, 0.3)',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 32,
                                    color: '#00ff00',
                                    fontFamily: 'monospace',
                                    letterSpacing: '2px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                saptak.saptech.online
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
