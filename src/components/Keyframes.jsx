export default function Keyframes() {
  return (
    <style>{`
      @keyframes rise { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes floatY { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
      @keyframes pulseGlow { 0%,100% { box-shadow:0 0 0 1px #232938, 0 20px 50px -20px rgba(92,225,208,.15); } 50% { box-shadow:0 0 0 1px #5CE1D0, 0 20px 60px -15px rgba(92,225,208,.35); } }
      @keyframes drift { 0% { transform:translate(0,0) rotate(0deg); } 100% { transform:translate(30px,20px) rotate(20deg); } }
      .rise-in { animation: rise .7s ease-out backwards; }
      .float-avatar { animation: floatY 5s ease-in-out infinite, pulseGlow 5s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .rise-in, .float-avatar { animation: none !important; }
      }
    `}</style>
  );
}