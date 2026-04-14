import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '💻',
    skills: ['React', 'Next.js', 'JavaScript', 'HTML', 'Tailwind CSS', 'Bootstrap'],
    color: '#00f2ff'
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'Express.js', 'Django', 'Django REST Framework', 'AWS', 'Networking', 'Docker'],
    color: '#bc13fe'
  },
  {
    title: 'Database',
    icon: '🗄️',
    skills: ['MongoDB', 'SQL', 'MySQL'],
    color: '#ff00de'
  },
  {
    title: 'Languages',
    icon: '📝',
    skills: ['Python', 'C++', 'TypeScript'],
    color: '#10b981'
  },
  {
    title: 'Tools',
    icon: '🔧',
    skills: ['Git', 'GitHub'],
    color: '#f59e0b'
  }
];

const Skills = () => {
  return (
    <section id="skills" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Technical Arsenal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>A comprehensive overview of the technologies I use to build premium digital products.</p>
          <div style={{ width: '80px', height: '4px', background: 'var(--grad-main)', margin: '20px auto' }}></div>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '30px' 
        }}>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.1 
              }}
              whileHover={{ y: -5 }}
              className="glass"
              style={{ 
                padding: '40px',
                border: `1px solid ${category.color}33`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: '-20px', 
                right: '-20px', 
                fontSize: '6rem', 
                opacity: 0.05,
                pointerEvents: 'none'
              }}>
                {category.icon}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>{category.title}</h3>
              </div>

              <motion.div 
                style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: category.color, color: '#000', boxShadow: `0 0 15px ${category.color}88` }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: `1px solid ${category.color}33`,
                      color: category.color,
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'default',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
