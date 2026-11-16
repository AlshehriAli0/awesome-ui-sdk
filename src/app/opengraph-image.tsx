import { ImageResponse } from 'next/og';

export const alt = 'Awesome UI SDK: component libraries, tools, and examples from the UI SDK community.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 64, background: '#f8f8f8', color: '#0a0a0a' }}>
      <div style={{ display: 'flex', fontSize: 30 }}>awesome / ui sdk</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, lineHeight: 1.05, letterSpacing: -5 }}>
        <div>Good things, built with</div><div>UI SDK.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #b8b8b8', paddingTop: 24, fontSize: 24 }}>
        <span>Libraries. Tools. Community examples.</span><span style={{ color: '#005be0' }}>awesome-ui-sdk.dev</span>
      </div>
    </div>,
    size,
  );
}
