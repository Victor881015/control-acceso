'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Radial gradient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>

      {/* Scanning lines effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-scan-line" style={{
          animation: 'scanLine 8s linear infinite'
        }}></div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-32 h-32 opacity-30">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path d="M 0 0 L 0 48 M 0 0 L 48 0" stroke="url(#cornerGradient)" strokeWidth="2" fill="none"/>
          <path d="M 4 4 L 4 40 M 4 4 L 40 4" stroke="url(#cornerGradient)" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="24" cy="24" r="2" fill="#06b6d4" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
          </circle>
          <defs>
            <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-8 right-8 w-32 h-32 opacity-30">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path d="M 128 0 L 128 48 M 128 0 L 80 0" stroke="url(#cornerGradient2)" strokeWidth="2" fill="none"/>
          <path d="M 124 4 L 124 40 M 124 4 L 88 4" stroke="url(#cornerGradient2)" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="104" cy="24" r="2" fill="#06b6d4" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="0.5s"/>
          </circle>
          <defs>
            <linearGradient id="cornerGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-8 left-8 w-32 h-32 opacity-30">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path d="M 0 128 L 0 80 M 0 128 L 48 128" stroke="url(#cornerGradient3)" strokeWidth="2" fill="none"/>
          <path d="M 4 124 L 4 88 M 4 124 L 40 124" stroke="url(#cornerGradient3)" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="24" cy="104" r="2" fill="#06b6d4" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1s"/>
          </circle>
          <defs>
            <linearGradient id="cornerGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-8 right-8 w-32 h-32 opacity-30">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path d="M 128 128 L 128 80 M 128 128 L 80 128" stroke="url(#cornerGradient4)" strokeWidth="2" fill="none"/>
          <path d="M 124 124 L 124 88 M 124 124 L 88 124" stroke="url(#cornerGradient4)" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="104" cy="104" r="2" fill="#06b6d4" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1.5s"/>
          </circle>
          <defs>
            <linearGradient id="cornerGradient4" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-float"></div>
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-float" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scanLine {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center relative z-10">
        
        {/* RADAR SECTION */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Radar Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 flex items-center justify-center overflow-hidden shadow-2xl shadow-cyan-500/20">
              
              {/* Ambient glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
              
              {/* Radar SVG */}
              <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 500 500">
                {/* Definitions */}
                <defs>
                  {/* Grid pattern */}
                  <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.5"/>
                  </pattern>
                  
                  {/* Radial gradient for sweep */}
                  <radialGradient id="sweepGradient">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.95)" />
                    <stop offset="30%" stopColor="rgba(6, 182, 212, 0.6)" />
                    <stop offset="70%" stopColor="rgba(6, 182, 212, 0.2)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                  </radialGradient>
                  
                  {/* Camera glow */}
                  <filter id="cameraGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  {/* Person glow */}
                  <filter id="personGlow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  {/* Alert glow */}
                  <filter id="alertGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background grid */}
                <rect width="500" height="500" fill="url(#grid)" opacity="0.4"/>

                {/* Corner HUD elements */}
                <g opacity="0.8">
                  {/* Top Left */}
                  <path d="M 30 30 L 30 80 M 30 30 L 80 30" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="square"/>
                  <path d="M 35 35 L 35 75 M 35 35 L 75 35" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5"/>
                  
                  {/* Top Right */}
                  <path d="M 470 30 L 470 80 M 470 30 L 420 30" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="square"/>
                  <path d="M 465 35 L 465 75 M 465 35 L 425 35" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5"/>
                  
                  {/* Bottom Left */}
                  <path d="M 30 470 L 30 420 M 30 470 L 80 470" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="square"/>
                  <path d="M 35 465 L 35 425 M 35 465 L 75 465" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5"/>
                  
                  {/* Bottom Right */}
                  <path d="M 470 470 L 470 420 M 470 470 L 420 470" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="square"/>
                  <path d="M 465 465 L 465 425 M 465 465 L 425 465" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5"/>
                </g>

                {/* Concentric circles with glow */}
                <g opacity="0.6">
                  <circle cx="250" cy="250" r="200" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6"/>
                  <circle cx="250" cy="250" r="160" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5"/>
                  <circle cx="250" cy="250" r="120" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4"/>
                  <circle cx="250" cy="250" r="80" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.3"/>
                  <circle cx="250" cy="250" r="40" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.2"/>
                </g>

                {/* Distance markers */}
                <g fill="#06b6d4" fontSize="10" opacity="0.5" className="font-mono">
                  <text x="255" y="55" textAnchor="start">200m</text>
                  <text x="255" y="95" textAnchor="start">160m</text>
                  <text x="255" y="135" textAnchor="start">120m</text>
                  <text x="255" y="175" textAnchor="start">80m</text>
                  <text x="255" y="215" textAnchor="start">40m</text>
                </g>

                {/* Cardinal directions with enhanced styling */}
                <g fill="#06b6d4" fontSize="14" fontWeight="bold" className="font-mono">
                  <text x="250" y="35" textAnchor="middle">N</text>
                  <text x="465" y="255" textAnchor="middle">E</text>
                  <text x="250" y="475" textAnchor="middle">S</text>
                  <text x="35" y="255" textAnchor="middle">W</text>
                </g>

                {/* Cross lines */}
                <line x1="250" y1="50" x2="250" y2="450" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="5,5"/>
                <line x1="50" y1="250" x2="450" y2="250" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="5,5"/>
                
                {/* Diagonal guides */}
                <line x1="100" y1="100" x2="400" y2="400" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" strokeDasharray="3,3"/>
                <line x1="400" y1="100" x2="100" y2="400" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" strokeDasharray="3,3"/>

                {/* Center point with pulse */}
                <g>
                  <circle cx="250" cy="250" r="6" fill="#06b6d4" opacity="0.3">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="250" cy="250" r="4" fill="#06b6d4">
                    <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </g>

                {/* Radar sweep with enhanced effect */}
                <g style={{ transformOrigin: '250px 250px' }}>
                  {/* Main sweep beam */}
                  <line x1="250" y1="250" x2="250" y2="50" stroke="#06b6d4" strokeWidth="3" opacity="0.8" filter="url(#cameraGlow)">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 250 250"
                      to="360 250 250"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </line>
                  
                  {/* Sweep cone with gradient */}
                  <path d="M 250 250 L 250 50 A 200 200 0 0 1 340 90 Z" fill="url(#sweepGradient)" opacity="0.4">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 250 250"
                      to="360 250 250"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>

                {/* CAMERAS - Enhanced design */}
                <g filter="url(#cameraGlow)">
                  {/* Camera 1 */}
                  <g transform="translate(320, 140)">
                    <circle r="12" fill="rgba(6, 182, 212, 0.15)" className="animate-pulse"/>
                    <circle r="8" fill="rgba(6, 182, 212, 0.3)" className="animate-pulse"/>
                    <circle r="5" fill="#06b6d4"/>
                    <path d="M -4 -3 L -7 -6 L -5 -6 M 4 -3 L 7 -6 L 5 -6" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <rect x="-3" y="-3" width="6" height="4" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="1"/>
                    <circle cx="0" cy="-1" r="2" fill="none" stroke="#0ff" strokeWidth="1"/>
                    <text x="0" y="24" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="bold" className="font-mono">CAM-01</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">ACTIVA</text>
                  </g>

                  {/* Camera 2 */}
                  <g transform="translate(180, 160)" opacity="0.95">
                    <circle r="12" fill="rgba(6, 182, 212, 0.15)" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
                    <circle r="8" fill="rgba(6, 182, 212, 0.3)" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
                    <circle r="5" fill="#06b6d4"/>
                    <path d="M -4 -3 L -7 -6 L -5 -6 M 4 -3 L 7 -6 L 5 -6" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <rect x="-3" y="-3" width="6" height="4" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="1"/>
                    <circle cx="0" cy="-1" r="2" fill="none" stroke="#0ff" strokeWidth="1"/>
                    <text x="0" y="24" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="bold" className="font-mono">CAM-02</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">ACTIVA</text>
                  </g>

                  {/* Camera 3 */}
                  <g transform="translate(370, 260)" opacity="0.95">
                    <circle r="12" fill="rgba(6, 182, 212, 0.15)" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                    <circle r="8" fill="rgba(6, 182, 212, 0.3)" className="animate-pulse" style={{ animationDelay: '1s' }}/>
                    <circle r="5" fill="#06b6d4"/>
                    <path d="M -4 -3 L -7 -6 L -5 -6 M 4 -3 L 7 -6 L 5 -6" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <rect x="-3" y="-3" width="6" height="4" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="1"/>
                    <circle cx="0" cy="-1" r="2" fill="none" stroke="#0ff" strokeWidth="1"/>
                    <text x="0" y="24" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="bold" className="font-mono">CAM-03</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">ACTIVA</text>
                  </g>

                  {/* Camera 4 */}
                  <g transform="translate(140, 320)" opacity="0.95">
                    <circle r="12" fill="rgba(6, 182, 212, 0.15)" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
                    <circle r="8" fill="rgba(6, 182, 212, 0.3)" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
                    <circle r="5" fill="#06b6d4"/>
                    <path d="M -4 -3 L -7 -6 L -5 -6 M 4 -3 L 7 -6 L 5 -6" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <rect x="-3" y="-3" width="6" height="4" fill="none" stroke="#06b6d4" strokeWidth="1.5" rx="1"/>
                    <circle cx="0" cy="-1" r="2" fill="none" stroke="#0ff" strokeWidth="1"/>
                    <text x="0" y="24" textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="bold" className="font-mono">CAM-04</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">ACTIVA</text>
                  </g>
                </g>

                {/* SECURITY PERSONNEL - Enhanced design */}
                <g filter="url(#personGlow)">
                  {/* Guard 1 */}
                  <g transform="translate(290, 300)">
                    <circle r="15" fill="rgba(16, 185, 129, 0.15)" className="animate-pulse"/>
                    <circle r="10" fill="rgba(16, 185, 129, 0.25)" className="animate-pulse"/>
                    {/* Head */}
                    <circle cx="0" cy="-4" r="4" fill="#10b981" stroke="#0f0" strokeWidth="0.5"/>
                    {/* Body */}
                    <path d="M 0 0 L 0 10" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                    {/* Arms */}
                    <path d="M 0 3 L -5 8 M 0 3 L 5 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    {/* Legs */}
                    <path d="M 0 10 L -4 16 M 0 10 L 4 16" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    {/* Badge */}
                    <circle cx="0" cy="5" r="1.5" fill="#0f0"/>
                    <text x="0" y="32" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold" className="font-mono">GUARD-01</text>
                    <text x="0" y="42" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">PATROL</text>
                  </g>

                  {/* Guard 2 */}
                  <g transform="translate(170, 340)" opacity="0.95">
                    <circle r="15" fill="rgba(16, 185, 129, 0.15)" className="animate-pulse" style={{ animationDelay: '0.7s' }}/>
                    <circle r="10" fill="rgba(16, 185, 129, 0.25)" className="animate-pulse" style={{ animationDelay: '0.7s' }}/>
                    <circle cx="0" cy="-4" r="4" fill="#10b981" stroke="#0f0" strokeWidth="0.5"/>
                    <path d="M 0 0 L 0 10" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M 0 3 L -5 8 M 0 3 L 5 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M 0 10 L -4 16 M 0 10 L 4 16" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="0" cy="5" r="1.5" fill="#0f0"/>
                    <text x="0" y="32" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold" className="font-mono">GUARD-02</text>
                    <text x="0" y="42" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">STATION</text>
                  </g>

                  {/* Guard 3 */}
                  <g transform="translate(340, 200)" opacity="0.95">
                    <circle r="15" fill="rgba(16, 185, 129, 0.15)" className="animate-pulse" style={{ animationDelay: '1.3s' }}/>
                    <circle r="10" fill="rgba(16, 185, 129, 0.25)" className="animate-pulse" style={{ animationDelay: '1.3s' }}/>
                    <circle cx="0" cy="-4" r="4" fill="#10b981" stroke="#0f0" strokeWidth="0.5"/>
                    <path d="M 0 0 L 0 10" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M 0 3 L -5 8 M 0 3 L 5 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M 0 10 L -4 16 M 0 10 L 4 16" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="0" cy="5" r="1.5" fill="#0f0"/>
                    <text x="0" y="32" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold" className="font-mono">GUARD-03</text>
                    <text x="0" y="42" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">ROVING</text>
                  </g>
                </g>

                {/* ACCESS POINTS */}
                <g>
                  {/* Entry A */}
                  <g transform="translate(200, 110)">
                    <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" className="animate-pulse" rx="2"/>
                    <rect x="-6" y="-6" width="12" height="12" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1" rx="1"/>
                    <path d="M -3 -2 L 3 -2 M 0 -5 L 0 1" stroke="#f59e0b" strokeWidth="1.5"/>
                    <text x="0" y="24" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" className="font-mono">ENTRY-A</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">SECURED</text>
                  </g>

                  {/* Entry B */}
                  <g transform="translate(130, 280)" opacity="0.95">
                    <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.4s' }} rx="2"/>
                    <rect x="-6" y="-6" width="12" height="12" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1" rx="1"/>
                    <path d="M -3 -2 L 3 -2 M 0 -5 L 0 1" stroke="#f59e0b" strokeWidth="1.5"/>
                    <text x="0" y="24" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" className="font-mono">ENTRY-B</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">SECURED</text>
                  </g>

                  {/* Entry C */}
                  <g transform="translate(380, 330)" opacity="0.95">
                    <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.8s' }} rx="2"/>
                    <rect x="-6" y="-6" width="12" height="12" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1" rx="1"/>
                    <path d="M -3 -2 L 3 -2 M 0 -5 L 0 1" stroke="#f59e0b" strokeWidth="1.5"/>
                    <text x="0" y="24" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" className="font-mono">ENTRY-C</text>
                    <text x="0" y="34" textAnchor="middle" fill="#10b981" fontSize="7" className="font-mono">SECURED</text>
                  </g>
                </g>

                {/* ALERT ZONE */}
                <g transform="translate(310, 240)" filter="url(#alertGlow)">
                  <polygon points="0,-10 9,8 -9,8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.2s' }}/>
                  <polygon points="0,-7 6,5 -6,5" fill="none" stroke="#ef4444" strokeWidth="1.5"/>
                  <text x="0" y="2" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">!</text>
                  <text x="0" y="26" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold" className="font-mono">MOTION</text>
                  <text x="0" y="36" textAnchor="middle" fill="#ef4444" fontSize="7" className="font-mono">DETECTED</text>
                </g>

                {/* SENSORS - Motion detectors */}
                <g opacity="0.8">
                  <g transform="translate(390, 180)">
                    <circle r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.8s' }}/>
                    <circle r="3" fill="#a78bfa" className="animate-pulse" style={{ animationDelay: '0.8s' }}/>
                  </g>
                  <g transform="translate(120, 200)">
                    <circle r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '1.2s' }}/>
                    <circle r="3" fill="#a78bfa" className="animate-pulse" style={{ animationDelay: '1.2s' }}/>
                  </g>
                  <g transform="translate(250, 360)">
                    <circle r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '1.6s' }}/>
                    <circle r="3" fill="#a78bfa" className="animate-pulse" style={{ animationDelay: '1.6s' }}/>
                  </g>
                  <g transform="translate(350, 380)">
                    <circle r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '2s' }}/>
                    <circle r="3" fill="#a78bfa" className="animate-pulse" style={{ animationDelay: '2s' }}/>
                  </g>
                </g>

                {/* Status text at bottom */}
                <text x="250" y="475" textAnchor="middle" fill="#06b6d4" fontSize="13" fontWeight="bold" className="font-mono">
                  <tspan className="animate-pulse">║ MONITORING ACTIVE ║</tspan>
                </text>
                <text x="250" y="490" textAnchor="middle" fill="#06b6d4" fontSize="9" className="font-mono" opacity="0.6">
                  REAL-TIME SURVEILLANCE SYSTEM
                </text>
              </svg>

              {/* Enhanced Status Panel */}
              <div className="absolute top-4 right-4 space-y-1.5">
                <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-cyan-500/40 px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-400 font-bold font-mono tracking-wider">ONLINE</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-mono">CAMERAS</span>
                    <span className="text-sm text-cyan-400 font-bold font-mono">04/04</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-mono">GUARDS</span>
                    <span className="text-sm text-green-400 font-bold font-mono">03/03</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-mono">ENTRIES</span>
                    <span className="text-sm text-amber-400 font-bold font-mono">03/03</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-slate-900/95 to-red-950/95 backdrop-blur-md border border-red-500/50 px-4 py-2 rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-red-300 font-mono">ALERTS</span>
                    <span className="text-sm text-red-400 font-bold font-mono animate-pulse">01</span>
                  </div>
                </div>
              </div>

              {/* Bottom left timestamp */}
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg">
                <div className="text-xs text-cyan-400 font-mono font-bold">
                  {new Date().toLocaleTimeString('en-US', { hour12: false })}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  SYSTEM TIME
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN SECTION */}
        <div className="w-full lg:w-1/2 max-w-lg">
          {/* Header Section */}
          <div className="relative mb-8">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path d="M 0 0 L 0 24 M 0 0 L 24 0" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 2 2 L 2 20 M 2 2 L 20 2" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.3"/>
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path d="M 64 0 L 64 24 M 64 0 L 40 0" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 62 2 L 62 20 M 62 2 L 44 2" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.3"/>
              </svg>
            </div>

            <div className="text-center pt-8">
              {/* Logo with glow effect */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full"></div>
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-500/30">
                  <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="url(#shieldGradient)" strokeWidth="2">
                    <defs>
                      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <path d="M 32 8 L 48 16 L 48 32 C 48 44 32 56 32 56 C 32 56 16 44 16 32 L 16 16 Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M 26 32 L 30 36 L 38 28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 mb-2">
                SISTEMA DE ACCESO
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-cyan-400 font-mono">SECURITY CLEARANCE</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 font-mono">LEVEL 5</span>
              </div>
            </div>
          </div>

          {/* Main Login Container */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent"></div>
            
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            <div className="relative p-8">
              {/* Status bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </div>
                  <span className="text-xs text-green-400 font-mono font-bold">TERMINAL ACTIVO</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  ID: <span className="text-cyan-400">SYS-7749</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User ID Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-cyan-400 tracking-wider font-mono">
                      USER IDENTIFICATION
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">CAMPO REQUERIDO</span>
                  </div>
                  <div className="relative group">
                    {/* Icon container */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-cyan-500/10 border-r border-cyan-500/30 rounded-l-lg">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@empresa.com"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-14 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/70 transition-all font-mono text-sm group-hover:border-cyan-500/50"
                    />
                    {/* Scanning line effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-cyan-400 tracking-wider font-mono">
                      SECURITY CODE
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">ENCRIPTADO</span>
                  </div>
                  <div className="relative group">
                    {/* Icon container */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-cyan-500/10 border-r border-cyan-500/30 rounded-l-lg">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-14 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/70 transition-all font-mono text-sm tracking-widest group-hover:border-cyan-500/50"
                    />
                    {/* Scanning line effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Options row */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-slate-700 rounded bg-slate-900/50 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all flex items-center justify-center">
                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono group-hover:text-slate-300 transition-colors">
                      Mantener sesión activa
                    </span>
                  </label>
                  <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-mono hover:underline">
                    Recuperar acceso →
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="relative w-full mt-8 group overflow-hidden"
                >
                  {/* Background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3 py-4 px-6 rounded-lg border border-cyan-400/50 group-hover:border-cyan-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-bold text-white tracking-wider font-mono text-sm">
                      AUTORIZAR ACCESO
                    </span>
                    <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              </form>

              {/* System Status Footer */}
              <div className="mt-8 pt-6 border-t border-slate-800/50 space-y-3">
                {/* Connection Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400 font-mono">Conexión segura establecida</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
                    <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="w-1 h-2 bg-slate-600 rounded-full"></div>
                  </div>
                </div>

                {/* Security info */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono">
                  <span>SSL/TLS 1.3</span>
                  <span>•</span>
                  <span>AES-256</span>
                  <span>•</span>
                  <span>2FA READY</span>
                </div>
              </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
              <span>© 2026 CORP SECURITY SYSTEMS</span>
              <span className="text-slate-700">|</span>
              <span>v5.2.1</span>
            </div>
            <div className="text-[10px] text-slate-600 font-mono">
              Unauthorized access will be prosecuted
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}