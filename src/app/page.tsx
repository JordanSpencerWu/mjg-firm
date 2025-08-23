export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="/Shebara_90s_16x9_4_K_English_Only_Music_and_Logo_4e51af11f6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">Welcome to MJG Firm</h1>
          <p className="text-xl mb-8">
            Creating exceptional digital experiences
          </p>
        </div>
      </div>
    </div>
  );
}
