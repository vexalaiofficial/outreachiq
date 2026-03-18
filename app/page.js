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

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', padding: '16px 24px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>
            Outreach<span style={{ color: '#0066cc' }}>IQ</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'landing' ? '#111' : '#666', fontWeight: activeTab === 'landing' ? 600 : 400 }}>Home</button>
            <button onClick={() => setActiveTab('demo')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'demo' ? '#111' : '#666', fontWeight: activeTab === 'demo' ? 600 : 400 }}>Demo</button>
            <button onClick={() => setActiveTab('pricing')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === 'pricing' ? '#111' : '#666', fontWeight: activeTab === 'pricing' ? 600 : 400 }}>Pricing</button>
          </div>
        </div>
      </header>

      {/* Landing Page */}
      {activeTab === 'landing' && (
        <div style={{ paddingTop: 80 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
            <h1 style={{ fontSize: 'clamp(32px, 7vw, 56px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 24px', letterSpacing: '-1.5px', color: '#111' }}>
              Cold emails that<br />get replies
            </h1>
            <p style={{ fontSize: 18, color: '#666', maxWidth: 520, marginBottom: 40 }}>
              We scan what your prospects are actually talking about online — then write emails that feel personal, not robotic.
            </p>
            
            <div style={{ display: 'flex', gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#0066cc', lineHeight: 1 }}>47%</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>Avg. reply rate (vs 2%)</div>
              </div>
              <div>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#0066cc', lineHeight: 1 }}>10x</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>More meetings booked</div>
              </div>
            </div>
            
            <div style={{ background: '#fff', borderLeft: '4px solid #0066cc', padding: '24px 28px', margin: '32px 0', fontStyle: 'italic', color: '#666', fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              "We're sending 500 emails/week with 'personalization' but reply rate is under 2%. Everyone says cold email is dead."
              <div style={{ fontStyle: 'normal', fontWeight: 600, color: '#111', marginTop: 12, fontSize: 13 }}>— r/startups</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '40px 0' }}>
              <div style={{ background: '#fffafa', border: '1px solid #ffcccc', borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: 600, color: '#cc0000' }}>❌ Generic</div>
                <p style={{ fontSize: 14, color: '#666' }}>Hi {`{first_name}`}, I noticed {`{company}`} is growing fast and thought you'd be interested in our solution...</p>
              </div>
              <div style={{ background: '#f0f7ff', border: '1px solid #cce5ff', borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: 600, color: '#0066cc' }}>✅ With OutreachIQ</div>
                <p style={{ fontSize: 14, color: '#666' }}>Hey Sarah — saw your post about struggling with churn on r/SaaS. Here's what worked for us...</p>
              </div>
            </div>
            
            <button onClick={() => setActiveTab('demo')} style={{ background: '#0066cc', color: '#fff', padding: '18px 40px', borderRadius: 8, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>
              Try It Free
            </button>
          </div>
        </div>
      )}

      {/* Demo Section */}
      {activeTab === 'demo' && (
        <div style={{ paddingTop: 80 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32, color: '#111' }}>Try It Now</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>PROSPECT EMAIL OR NAME</label>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., john@acme.com"
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>COMPANY OR INDUSTRY</label>
                  <input 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., SaaS, fintech, e-commerce"
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 8 }}>PAIN TOPIC THEY'RE DISCUSSING</label>
                  <input 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., high churn, cold outreach not working"
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                  />
                </div>
                <button 
                  onClick={generateEmail}
                  disabled={loading || !email || !company || !topic}
                  style={{ 
                    background: loading ? '#99ccff' : '#0066cc', 
                    color: '#fff', 
                    padding: '16px 32px', 
                    borderRadius: 8, 
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
                <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: 24, minHeight: 300 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#0066cc', marginBottom: 16, fontWeight: 600 }}>YOUR EMAIL</div>
                  {generatedEmail ? (
                    <pre style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#111', margin: 0 }}>
                      {generatedEmail}
                    </pre>
                  ) : (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>Your generated email will appear here...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {activeTab === 'pricing' && (
        <div style={{ paddingTop: 80 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, color: '#111' }}>Simple Pricing</h2>
            <p style={{ fontSize: 18, color: '#666', marginBottom: 48 }}>Start free, scale as you grow</p>
            
            <div style={{ background: '#fff', border: '2px solid #0066cc', borderRadius: 16, padding: 48, maxWidth: 400, margin: '0 auto', boxShadow: '0 4px 16px rgba(0,102,204,0.1)' }}>
              <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2 }}>$49<span style={{ fontSize: 18, color: '#666', fontWeight: 400 }}>/month</span></div>
              <ul style={{ textAlign: 'left', margin: '24px 0', paddingLeft: 20, color: '#666' }}>
                <li style={{ marginBottom: 12 }}>✅ Unlimited email generations</li>
                <li style={{ marginBottom: 12 }}>✅ Community intelligence scans</li>
                <li style={{ marginBottom: 12 }}>✅ A/B testing suggestions</li>
                <li style={{ marginBottom: 12 }}>✅ Priority support</li>
              </ul>
              <button style={{ background: '#0066cc', color: '#fff', padding: '18px 40px', borderRadius: 8, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', width: '100%' }}>
                Start Free Trial
              </button>
              <p style={{ fontSize: 13, color: '#999', marginTop: 16 }}>No credit card required</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid #e5e5e5', padding: '24px', textAlign: 'center', color: '#999', fontSize: 13 }}>
        © 2026 OutreachIQ. All rights reserved.
      </footer>
    </div>
  )
}