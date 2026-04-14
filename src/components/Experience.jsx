import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const experiences = [
  {
    company: "TechUp High",
    role: "Production Developer",
    period: "2024 - Present",
    description: "Applying advanced technical skills in a professional environment, focusing on production-level development and secure software architecture."
  },
  {
    company: "NIAT - NxtWave Institute",
    role: "Full Stack Development Student",
    period: "2023 - Present",
    description: "Deep-diving into MERN stack, AI integration, and cybersecurity principles while building industry-ready applications."
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>My Journey</h2>
          <div style={{ width: '80px', height: '4px', background: 'var(--grad-main)', margin: '0 auto' }}></div>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Animated Central Line */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              left: '50%', 
              top: 0,
              bottom: 0,
              transform: 'translateX(-50%)', 
              width: '2px', 
              background: 'linear-gradient(to bottom, var(--primary-neon), var(--secondary-neon), transparent)',
              scaleY,
              transformOrigin: 'top'
            }} 
          />

          {experiences.map((exp, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', 
              marginBottom: '50px', 
              width: '100%',
              position: 'relative'
            }}>
              {/* Animated Dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                style={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '0', 
                  transform: 'translate(-50%, 0)', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-dark)', 
                  border: '3px solid var(--primary-neon)',
                  boxShadow: '0 0 10px var(--primary-neon)',
                  zIndex: 2
                }} 
              />

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: `0 10px 30px rgba(0,0,0,0.5)` }}
                className="glass"
                style={{ 
                  width: '45%', 
                  padding: '30px',
                  textAlign: index % 2 === 0 ? 'right' : 'left',
                  cursor: 'default'
                }}
              >
                <div style={{ color: 'var(--primary-neon)', fontWeight: '700', marginBottom: '5px' }}>{exp.period}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{exp.role}</h3>
                <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '15px' }}>{exp.company}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{exp.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
