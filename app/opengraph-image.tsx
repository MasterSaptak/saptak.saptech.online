import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Saptak Roy Akash - Cyber Security & IoT Specialist'
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '60px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 255, 0, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 255, 0, 0.1) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        opacity: 0.5,
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        background: 'rgba(0, 26, 0, 0.9)',
                        border: '2px solid rgba(0, 255, 0, 0.4)',
                        borderRadius: '24px',
                        width: '100%',
                        height: '100%',
                        padding: '40px',
                        boxShadow: '0 0 60px rgba(0, 255, 0, 0.15)',
                        gap: '50px',
                    }}
                >
                    {/* Cyber accents */}
                    <div style={{ position: 'absolute', top: 40, left: 40, width: 40, height: 40, borderTop: '4px solid #00ff00', borderLeft: '4px solid #00ff00' }} />
                    <div style={{ position: 'absolute', top: 40, right: 40, width: 40, height: 40, borderTop: '4px solid #00ff00', borderRight: '4px solid #00ff00' }} />
                    <div style={{ position: 'absolute', bottom: 40, left: 40, width: 40, height: 40, borderBottom: '4px solid #00ff00', borderLeft: '4px solid #00ff00' }} />
                    <div style={{ position: 'absolute', bottom: 40, right: 40, width: 40, height: 40, borderBottom: '4px solid #00ff00', borderRight: '4px solid #00ff00' }} />

                    {/* Profile Image Column */}
                    <div style={{ display: 'flex', position: 'relative' }}>
                        {/* Use absolute domain to avoid edge runtime native fs fetch issues */}
                        <img
                            src="https://saptak.saptech.online/images/profile.jpg"
                            alt="Profile"
                            width={350}
                            height={350}
                            style={{
                                borderRadius: '24px',
                                border: '4px solid #00ff00',
                                objectFit: 'cover',
                                boxShadow: '0 0 40px rgba(0, 255, 0, 0.3)',
                            }}
                        />
                    </div>

                    {/* Text Column */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 72,
                                fontWeight: 'bold',
                                color: '#00ff00',
                                marginBottom: 16,
                                letterSpacing: '-2px',
                                display: 'flex',
                            }}
                        >
                            Saptak Roy Akash
                        </div>

                        <div
                            style={{
                                fontSize: 34,
                                color: '#f8fafc',
                                display: 'flex',
                                marginBottom: 12,
                                fontWeight: 600,
                            }}
                        >
                            Fullstack Developer • Cyber Security
                        </div>

                        <div
                            style={{
                                fontSize: 28,
                                color: 'rgba(248, 250, 252, 0.7)',
                                display: 'flex',
                                marginBottom: 40,
                                fontWeight: 500,
                            }}
                        >
                            Startup Founder • IoT • Robotics
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'rgba(0, 255, 0, 0.1)',
                                padding: '16px 24px',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 255, 0, 0.3)',
                                alignSelf: 'flex-start',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 24,
                                    color: '#00ff00',
                                    fontFamily: 'monospace',
                                    letterSpacing: '2px',
                                    display: 'flex',
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
