import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
        isScrolled ? 'py-4 glass mx-4 lg:mx-12 top-4' : 'py-8 px-4 lg:px-12'
      }`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{
        fontSize: '1.5rem',
        fontWeight: '800',
        fontFamily: 'var(--font-heading)',
        color: 'var(--text-main)',
        letterSpacing: '-1px'
      }}>
        <span style={{ color: 'var(--primary-neon)' }}>DEV</span>PORTFOLIO
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex" style={{ gap: '2rem', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href}
            style={{
              textDecoration: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--primary-neon)'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            {link.name}
          </a>
        ))}
        <div style={{
          width: '1px',
          height: '24px',
          backgroundColor: 'var(--glass-border)',
          margin: '0 10px'
        }} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://github.com/SriCharan12-hub" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} color="var(--text-muted)" className="hover:text-primary-neon cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/in/sri-charan-palem" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} color="var(--text-muted)" className="hover:text-primary-neon cursor-pointer" />
          </a>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X color="var(--text-main)" /> : <Menu color="var(--text-main)" />}
      </div>

      {/* Mobile Menu Overlay (Simple for now) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '20px',
              right: '20px',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '2rem',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
