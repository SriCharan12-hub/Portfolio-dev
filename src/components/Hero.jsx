import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

function ParticleBackground(props) {
  const ref = useRef();
  const { mouse } = useThree();
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(5000), { radius: 1.5 })], []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Subtle mouse tilt
    ref.current.rotation.x += (mouse.y * 0.2 - ref.current.rotation.x) * 0.1;
    ref.current.rotation.y += (mouse.x * 0.2 - ref.current.rotation.y) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const MagneticButton = ({ children, style, primary = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
      x.set(distanceX * 0.4);
      y.set(distanceY * 0.4);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const Hero = () => {
  const name = "Palem Sri Charan";
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };

  return (
    <section id="home" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: 'var(--primary-neon)',
              textTransform: 'uppercase',
              letterSpacing: '5px',
              fontSize: 'var(--fs-xs)',
              fontWeight: '600',
              marginBottom: '1rem',
              display: 'block'
            }}
          >
            Full Stack Developer & AI Enthusiast
          </motion.span>
          
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              lineHeight: '1',
              marginBottom: '1.5rem',
              background: 'var(--grad-main)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-2px',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {name.split(" ").map((word, index) => (
              <span key={index} style={{ display: 'flex', marginRight: '20px' }}>
                {word.split("").map((letter, i) => (
                  <motion.span variants={child} key={i}>
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              color: 'var(--text-main)',
              fontSize: '1.2rem',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              lineHeight: '1.6',
              fontWeight: '500'
            }}
          >
            Embracing the Tech Journey | Committed to Excellence in Full Stack Development, AI, and Cybersecurity | NIAT Student
          </motion.p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <MagneticButton
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                border: 'none',
                background: 'var(--grad-main)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(0, 242, 255, 0.3)'
              }}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                border: '1px solid var(--glass-border)',
                background: 'transparent',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Contact Me
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{
          width: '2px',
          height: '40px',
          background: 'linear-gradient(to bottom, var(--primary-neon), transparent)'
        }} />
      </motion.div>
    </section>
  );
};

export default Hero;
