import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [step, setStep] = useState(1); // 1: Form, 3: Success
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use relative path for production compatibility, fallback to localhost for dev
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/contact' 
        : 'http://localhost:5000/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep(3);
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Connection to server failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get In Touch</h2>
          <p style={{ color: 'var(--text-muted)' }}>Ready to start your next project or just want to say hi?</p>
          <div style={{ width: '80px', height: '4px', background: 'var(--grad-main)', margin: '20px auto' }}></div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(0, 242, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-neon)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</div>
                  <div style={{ fontSize: '1.1rem' }}>sricharanpalem07@gmail.com</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(188, 19, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-neon)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Location</div>
                  <div style={{ fontSize: '1.1rem' }}>Hyderabad, India</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255, 0, 222, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-neon)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</div>
                  <div style={{ fontSize: '1.1rem' }}>Open for opportunities</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass"
            style={{ padding: '40px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ 
                        padding: '12px 15px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--glass-border)', 
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color: '#fff',
                        outline: 'none'
                      }} 
                      placeholder="Your Name"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ 
                        padding: '12px 15px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--glass-border)', 
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color: '#fff',
                        outline: 'none'
                      }} 
                      placeholder="your@email.com"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Message</label>
                    <textarea 
                      required
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{ 
                        padding: '12px 15px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--glass-border)', 
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color: '#fff',
                        outline: 'none',
                        resize: 'none'
                      }} 
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  {/* Honeypot field - hidden from users */}
                  <div style={{ display: 'none' }}>
                    <input 
                      type="text" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleInputChange} 
                      tabIndex="-1" 
                      autoComplete="off" 
                    />
                  </div>
                  {error && <p style={{ color: '#ff4444', fontSize: '0.85rem' }}>{error}</p>}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    style={{
                      padding: '15px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'var(--grad-main)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: '700',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      marginTop: 'auto',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? 'Sending Message...' : 'Send Message'} <ArrowRight size={18} />
                  </motion.button>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    style={{ color: 'var(--primary-neon)' }}
                  >
                    <CheckCircle size={80} />
                  </motion.div>
                  <div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Thank you, {formData.name}. Your message has been safely delivered. I'll get back to you soon!</p>
                  </div>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setFormData({ name: '', email: '', message: '', website: '' });
                    }}
                    style={{ marginTop: '20px', background: 'transparent', border: '1px solid var(--primary-neon)', color: 'var(--primary-neon)', padding: '10px 30px', borderRadius: '25px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
