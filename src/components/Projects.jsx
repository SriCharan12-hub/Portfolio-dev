import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Chatify',
    description: 'Real-Time Chat & Video Platform with secure authentication, live messaging, video calling, and friend management. Built with MERN stack and Stream.io for real-time communication.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stream.io', 'JWT', 'Google OAuth'],
    demo: 'https://chat-frontend-theta-tawny.vercel.app/',
    github: 'https://github.com/SriCharan12-hub/Chat-application',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1000&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2))',
    primaryColor: '#22d3ee'
  },
  {
    title: 'Trendify E-commerce',
    description: 'MERN stack ecommerce app with authentication, cart and product management functionalities.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    demo: 'https://mern-frontend-m18p.vercel.app',
    github: 'https://github.com/SriCharan12-hub/Using-Mern',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))',
    primaryColor: '#10b981'
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);

    // Set CSS variables for the follow-gradient effect
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        whileHover={{ 
          y: -10,
          boxShadow: `0 20px 40px ${project.primaryColor}33`,
        }}
        className="glass"
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: '480px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.3s ease',
          background: project.gradient,
          border: `1px solid ${project.primaryColor}22`
        }}
      >
        {/* Animated Gradient Border Overlay */}
        <motion.div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at var(--x) var(--y), ${project.primaryColor}22, transparent 80%)`,
            pointerEvents: 'none'
          }}
        />

        <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))`,
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }} />
        </div>
        
        <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff' }}>{project.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', flex: 1, lineHeight: '1.5' }}>
            {project.description}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: project.primaryColor,
                fontSize: '0.75rem',
                fontWeight: '600',
                border: `1px solid ${project.primaryColor}33`
              }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: 'auto' }}>
            {project.github && (
              <motion.a 
                whileHover={{ scale: 1.1, color: project.primaryColor }}
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--text-main)', transition: 'color 0.3s' }}
              >
                <FaGithub size={22} />
              </motion.a>
            )}
            {project.demo && (
              <motion.a 
                whileHover={{ scale: 1.1, color: project.primaryColor }}
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--text-main)', transition: 'color 0.3s' }}
              >
                <ExternalLink size={22} />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Selected Works</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            A collection of projects that demonstrate my technical skills and creative approach to problem-solving.
          </p>
          <div style={{ width: '80px', height: '4px', background: 'var(--grad-main)', margin: '0 auto' }}></div>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px' 
        }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
