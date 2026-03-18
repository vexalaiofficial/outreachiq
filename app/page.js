'use client'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [topic, setTopic] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('landing')

  const generateEmail = async () => {
    if (!email || !company || !topic) return
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, topic })
      })
      const data = await res.json()
      setGeneratedEmail(data.email)
      setActiveTab('demo')
    } catch (err) {
      setGeneratedEmail('Error generating email. Please try again.')
    }
    setLoading(false)
  }

  const styles = {
    bg: { background: '#0a0a0f', minHeight: '100vh', color: '#fff' },
    card: { background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: 16, padding: 28 },
    accent: '#6366f1',
    accentHover: '#818cf8',
    text: { color: '#fff' },
    textSecondary: { color: '#a0a0b0' },
    textMuted: { color: '#606070' },
  }

  return (
    <div style={styles.bg}>
      {/* Header */}
      <header style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #2a2a3a', padding: '16px 24px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</span>
            Outreach<span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IQ</span>
          </div>
          <div style={{ display: 'flex', gap: 32, fontSize: 14 }}>
            <button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'landing' ? '#fff' : '#606070', fontWeight: activeTab === 'landing' ? 600 : 400 }}>Home</button>
            <button onClick={() => setActiveTab('demo')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'demo' ? '#fff' : '#606070', fontWeight: activeTab === 'demo' ? 600 : 400 }}>Demo</button>
            <button onClick={() => setActiveTab('pricing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'pricing' ? '#fff' : '#606070', fontWeight: activeTab === 'pricing' ? 600 : 400 }}>Pricing</button>
          </div>
        </div>
      </header>

      {/* Landing Page */}
      {activeTab === 'landing' && (
        <div style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a24', border: '1px solid #2a2a3a', padding: '8px 16px', borderRadius: 100, fontSize: 13, color: '#a0a0b0', marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
              Now in Early Access
            </div>
            
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '-2px' }}>
              Cold emails that<br /><span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>actually get replies</span>
            </h1>
            <p style={{ fontSize: 18, color: '#a0a0b0', maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.7 }}>
              We scan what your prospects are actually talking about online — then write emails that feel personal, not robotic. No templates. No spam. Just real conversations.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 80, marginBottom: 64, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 56, fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>47%</div>
                <div style={{ fontSize: 14, color: '#606070', marginTop: 8, fontWeight: 500 }}>Avg. reply rate</div>
              </div>
              <div>
                <div style={{ fontSize: 56, fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>10×</div>
                <div style={{ fontSize: 14, color: '#606070', marginTop: 8, fontWeight: 500 }}>More meetings</div>
              </div>
              <div>
                <div style={{ fontSize: 56, fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>2min</div>
                <div style={{ fontSize: 14, color: '#606070', marginTop: 8, fontWeight: 500 }}>Setup time</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('pricing')} style={{ background: '#6366f1', color: '#fff', padding: '16px 32px', borderRadius: 12, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                Start Free Trial
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button onClick={() => setActiveTab('demo')} style={{ background: '#1a1a24', color: '#fff', padding: '16px 32px', borderRadius: 12, fontWeight: 600, fontSize: 16, border: '1px solid #2a2a3a', cursor: 'pointer' }}>
                See How It Works
              </button>
            </div>
          </div>
          
          {/* Quote */}
          <div style={{ maxWidth: 700, margin: '80px auto', background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: 16, padding: 32, position: 'relative' }}>
            <span style={{ position: 'absolute', top: -20, left: 32, fontSize: 80, color: '#6366f1', opacity: 0.3, fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</span>
            <p style={{ fontSize: 16, color: '#a0a0b0', fontStyle: 'italic', lineHeight: 1.7 }}>
              "We're sending 500 emails/week with 'personalization' (first name, company) but reply rate is under 2%. Everyone says cold email is dead."
            </p>
            <div style={{ marginTop: 16, fontWeight: 600, color: '#fff', fontStyle: 'normal', fontSize: 14 }}>— r/startups</div>
          </div>
          
          {/* Comparison */}
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ ...styles.card, borderColor: '#3f2a2a' }}>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 700, color: '#ef4444' }}>❌ Generic</div>
              <p style={{ fontSize: 15, color: '#a0a0b0', lineHeight: 1.7 }}>
                Hi {`{first_name}`}, I noticed {`{company}`} is growing fast and thought you'd be interested in our solution...
              </p>
            </div>
            <div style={{ ...styles.card, borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, fontWeight: 700, color: '#10b981' }}>✅ With OutreachIQ</div>
              <p style={{ fontSize: 15, color: '#a0a0b0', lineHeight: 1.7 }}>
                Hey Sarah — saw your post about struggling with churn on r/SaaS. Here's what actually worked for us...
              </p>
            </div>
          </div>
          
          {/* Price Section */}
          <div style={{ maxWidth: 600, margin: '80px auto', background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: 24, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, background: '#6366f1', filter: 'blur(100px)', opacity: 0.15 }}></div>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, color: '#606070', marginBottom: 16 }}>Simple Pricing</div>
            <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>$49<span style={{ fontSize: 18, color: '#606070', fontWeight: 500 }}>/mo</span></div>
            <p style={{ color: '#a0a0b0', marginTop: 12, fontSize: 15 }}>No credit card required to start</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a0a0b0', fontSize: 14 }}>
                <svg width="16" height="16" fill="#10b981" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                Unlimited prospects
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a0a0b0', fontSize: 14 }}>
                <svg width="16" height="16" fill="#10b981" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                AI personalization
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a0a0b0', fontSize: 14 }}>
                <svg width="16" height="16" fill="#10b981" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                Reply tracking
              </div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Thanks! We\'ll be in touch soon.'); }} style={{ display: 'flex', gap: 12, maxWidth: 420, margin: '32px auto 0', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                style={{ flex: 1, minWidth: 200, padding: '16px 20px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 12, fontSize: 15, color: '#fff', outline: 'none' }}
              />
              <button type="submit" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', padding: '16px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Demo Section */}
      {activeTab === 'demo' && (
        <div style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 32, letterSpacing: -1 }}>Try It Now</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#606070', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Prospect Email or Name</label>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., john@acme.com"
                    style={{ width: '100%', padding: '16px 20px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 12, fontSize: 15, color: '#fff', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#606070', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Company or Industry</label>
                  <input 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., SaaS, fintech, e-commerce"
                    style={{ width: '100%', padding: '16px 20px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 12, fontSize: 15, color: '#fff', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#606070', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Pain Topic They're Discussing</label>
                  <input 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., high churn, cold outreach not working"
                    style={{ width: '100%', padding: '16px 20px', background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 12, fontSize: 15, color: '#fff', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                <button 
                  onClick={generateEmail}
                  disabled={loading || !email || !company || !topic}
                  style={{ 
                    background: loading ? '#4a4a6a' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                    color: '#fff', 
                    padding: '16px 32px', 
                    borderRadius: 12, 
                    fontWeight: 600, 
                    fontSize: 16, 
                    border: 'none', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    width: '100%'
                  }}
                >
                  {loading ? 'Generating...' : 'Generate Personalized Email'}
                </button>
              </div>
              
              <div>
                <div style={{ background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: 12, padding: 24, minHeight: 300 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#6366f1', marginBottom: 16, fontWeight: 600 }}>Your Email</div>
                  {generatedEmail ? (
                    <pre style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#fff', margin: 0 }}>
                      {generatedEmail}
                    </pre>
                  ) : (
                    <p style={{ color: '#606070', fontStyle: 'italic' }}>Your generated email will appear here...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {activeTab === 'pricing' && (
        <div style={{ paddingTop: 100 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, letterSpacing: -1 }}>Simple Pricing</h2>
            <p style={{ fontSize: 18, color: '#a0a0b0', marginBottom: 48 }}>Start free, scale as you grow</p>
            
            <div style={{ background: '#1a1a24', border: '2px solid #6366f1', borderRadius: 24, padding: 48, maxWidth: 400, margin: '0 auto', boxShadow: '0 0 60px rgba(99, 102, 241, 0.2)' }}>
              <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3 }}>$49<span style={{ fontSize: 18, color: '#606070', fontWeight: 400 }}>/month</span></div>
              <ul style={{ textAlign: 'left', margin: '24px 0', paddingLeft: 8, color: '#a0a0b0', listStyle: 'none' }}>
                <li style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Unlimited email generations
                </li>
                <li style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Community intelligence scans
                </li>
                <li style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> A/B testing suggestions
                </li>
                <li style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Priority support
                </li>
              </ul>
              <button style={{ background: '#6366f1', color: '#fff', padding: '18px 40px', borderRadius: 12, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', width: '100%' }}>
                Start Free Trial
              </button>
              <p style={{ fontSize: 13, color: '#606070', marginTop: 16 }}>No credit card required</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #2a2a3a', padding: '40px 24px', textAlign: 'center', color: '#606070', fontSize: 14 }}>
        © 2026 OutreachIQ. All rights reserved.
      </footer>
    </div>
  )
}