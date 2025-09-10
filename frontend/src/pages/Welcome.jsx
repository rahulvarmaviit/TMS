import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Code2, Github, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

const Welcome = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030014] min-h-screen flex items-center justify-center px-4">
      <BackgroundEffect />
      <div className="w-full max-w-4xl mx-auto">
        {/* Icons */}
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          {[Code2, User, Github].map((Icon, index) => (
            <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
              <IconButton Icon={Icon} />
            </div>
          ))}
        </div>
        {/* Welcome Text */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
            <div className="mb-2 sm:mb-4">
              <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Welcome
              </span>{' '}
              <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                To
              </span>{' '}
              <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                My
              </span>
            </div>
            <div>
              <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </span>{' '}
              <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Website
              </span>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
            <div className="feature-icon">⚡</div>
            <span>Real-time Collaboration</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <span>Smart Analytics</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <span>Secure & Reliable</span>
          </div>
        </div>

        <a href="/login" className="cta-button">
          <span>Get Started</span>
          <div className="button-shine"></div>
        </a>
      </div>

      {/* Loading Animation */}
      <div className={`loading-dots ${showContent ? 'fade-out' : ''}`}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <style>{`
        .splash-container {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bg-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 70%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .logo-container {
          position: relative;
          z-index: 10;
          margin-bottom: 2rem;
          opacity: 0;
          transform: scale(0.8);
          transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .logo-container.fade-in {
          opacity: 1;
          transform: scale(1);
        }

        .company-logo {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 50px rgba(255, 255, 255, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: rotate 10s linear infinite;
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .text-container {
          position: relative;
          z-index: 10;
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.3s;
        }

        .text-container.slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        .company-title {
          margin-bottom: 2rem;
        }

        .title-text {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .title-subtitle {
          display: block;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          letter-spacing: 2px;
        }

        @keyframes textGlow {
          from { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
          to { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6); }
        }

        .features-grid {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
          justify-content: center;
          flex-wrap: wrap;
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.2);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .feature-card span {
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cta-button {
          position: relative;
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          overflow: hidden;
          margin-top: 1rem;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover .button-shine {
          left: 100%;
        }

        .loading-dots {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          transition: opacity 0.5s ease;
        }

        .loading-dots.fade-out {
          opacity: 0;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          animation: bounce 1.4s ease-in-out infinite both;
        }

        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          } 40% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .title-text {
            font-size: 2rem;
          }
          
          .features-grid {
            flex-direction: column;
            gap: 1rem;
          }
          
          .company-logo {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
