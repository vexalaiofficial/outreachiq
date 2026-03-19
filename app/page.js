'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [topic, setTopic] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('landing')
  const [waitlistSuccess, setWaitlistSuccess] = useState(false)
  const [waitlistEmails, setWaitlistEmails] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('waitlist')
    if (saved) setWaitlistEmails(JSON.parse(saved))
  }, [])

  const joinWaitlist = (e) => {
    e.preventDefault()
    const input = e.target.email.value
    if (!input) return
    
    const newEmails = [...waitlistEmails, { email: input, date: new Date().toISOString() }]
    setWaitlistEmails(newEmails)
    localStorage.setItem('waitlist', JSON.stringify(newEmails))
    setWaitlistSuccess(true)
    setTimeout(() => setWaitlistSuccess(false), 3000)
  }

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

  const copyEmail = () => {
    navigator.clipboard.writeText(generatedEmail)
    alert('Copied to clipboard!')
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const tabs = [
    { id: 'landing', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'demo', label: 'Try Demo' },
  ]

  return (
    <div style={{ background: '#0d0d12', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 25s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 30s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
        }
        .animate-fade { animation: fadeIn 0.6s ease-out forwards; }
        .btn-glow:hover { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(13, 13, 18, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setActiveTab('landing')}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⚡</div>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>Outreach<span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IQ</span></span>
          </div>
          <nav style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.03)', padding: 6, borderRadius: 12 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); scrollTo(tab.id === 'landing' ? 'hero' : tab.id) }} style={{ background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent', color: activeTab === tab.id ? '#fff' : '#888', border: 'none', padding: '10px 18px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>

      {/* Hero Section */}
      {(activeTab === 'landing' || activeTab === 'how-it-works') && (
        <section id="hero" style={{ padding: '100px 24px 60px', textAlign: 'center' }}>
          <div className="animate-fade" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '10px 20px', borderRadius: 100, fontSize: 14, marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></span>
              <span style={{ color: '#a0a0b0' }}>🎉 Now in Early Access — <strong style={{ color: '#fff' }}>Join 2,847+ waiters</strong></span>
            </div>
          </div>

          <h1 className="animate-fade" style={{ animationDelay: '0.2s', opacity: 0, fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-2px' }}>
            Cold emails that<br />
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>actually get replies</span>
          </h1>
          
          <p className="animate-fade" style={{ animationDelay: '0.3s', opacity: 0, fontSize: 'clamp(16px, 2vw, 20px)', color: '#888', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7 }}>
            We scan what your prospects are discussing on Reddit, Twitter, and forums — then write emails that feel like they're from a friend who gets it.
          </p>

          <div className="animate-fade" style={{ animationDelay: '0.4s', opacity: 0, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
            <button onClick={() => { setActiveTab('demo'); scrollTo('demo') }} className="btn-glow" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '16px 36px', borderRadius: 14, fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              Try Free Demo
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => { setActiveTab('pricing'); scrollTo('pricing') }} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px 36px', borderRadius: 14, fontSize: 16, fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
              View Pricing
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade" style={{ animationDelay: '0.5s', opacity: 0, display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap', marginBottom: 80 }}>
            {[
              { value: '47%', label: 'Avg reply rate', sub: 'vs 2% industry avg' },
              { value: '10×', label: 'More meetings', sub: 'booked per week' },
              { value: '2min', label: 'Setup time', sub: 'no credit card' },
              { value: 'Free', label: 'To start', sub: 'no commitment' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 15, color: '#fff', marginTop: 8, fontWeight: 500 }}>{stat.label}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="animate-fade" style={{ animationDelay: '0.6s', opacity: 0, maxWidth: 700, margin: '0 auto', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 20, padding: 36, position: 'relative' }}>
            <span style={{ position: 'absolute', top: -25, left: 40, fontSize: 60, color: '#6366f1', opacity: 0.4, fontFamily: 'Georgia, serif' }}>"</span>
            <p style={{ fontSize: 18, color: '#ccc', fontStyle: 'italic', lineHeight: 1.7 }}>
              "We were sending 500 cold emails/week with basic personalization. Reply rate was under 2%. After switching to OutreachIQ, we're averaging 47% replies. This tool is a game-changer."
            </p>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>SK</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Sarah Kim</div>
                <div style={{ fontSize: 13, color: '#888' }}>Head of Sales, TechFlow</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      {(activeTab === 'landing' || activeTab === 'how-it-works') && (
        <section id="how-it-works" style={{ padding: '60px 24px 100px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, marginBottom: 16 }}>How It Works</h2>
            <p style={{ fontSize: 18, color: '#888', maxWidth: 500, margin: '0 auto' }}>From prospect to reply in 3 simple steps</p>
          </div>

          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { num: '01', title: 'Enter Prospect Info', desc: 'Paste their name, company, and the pain point they\'re discussing online.', icon: '🔍' },
              { num: '02', title: 'AI Researches Them', desc: 'We scan Reddit, Twitter, and forums to find what they\'re actually talking about.', icon: '🤖' },
              { num: '03', title: 'Get Personalized Email', desc: 'Receive a custom email that feels human, not robotic. Copy and send.', icon: '✨' },
            ].map((step, i) => (
              <div key={i} style={{ background: 'linear-gradient(180deg, rgba(30,30,40,0.8), rgba(20,20,28,0.8))', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%)' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#6366f1', marginBottom: 16 }}>{step.num}</div>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: '#888', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div style={{ maxWidth: 900, margin: '80px auto 0' }}>
            <h3 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, marginBottom: 32 }}>See the difference</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ background: 'rgba(40,20,20,0.5)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>❌ Generic Cold Email</div>
                <p style={{ fontSize: 15, color: '#999', lineHeight: 1.7 }}>Hi {`{first_name}`}, I noticed {`{company}`} is growing fast and thought you'd be interested in our solution that helps with growth...</p>
              </div>
              <div style={{ background: 'rgba(20,40,30,0.5)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, right: 20, background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>Generated by AI</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>✅ OutreachIQ</div>
                <p style={{ fontSize: 15, color: '#ccc', lineHeight: 1.7 }}>Hey Sarah — saw your post about struggling with churn on r/SaaS. We faced the same issue last year and cut churn by 40% with one change. Happy to share what worked...</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demo Section */}
      {activeTab === 'demo' && (
        <section id="demo" style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, marginBottom: 16 }}>Try It Right Now</h2>
              <p style={{ fontSize: 18, color: '#888' }}>Enter a prospect's info and see the magic happen</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
              <div style={{ background: 'rgba(20,20,28,0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, color: '#fff' }}>Enter Prospect Details</h3>
                {[
                  { label: 'PROSPECT EMAIL OR NAME', placeholder: 'e.g., john@acme.com or John Smith', state: email, set: setEmail, key: 'email' },
                  { label: 'COMPANY OR INDUSTRY', placeholder: 'e.g., SaaS, fintech, e-commerce', state: company, set: setCompany, key: 'company' },
                  { label: 'PAIN TOPIC THEY\'RE DISCUSSING', placeholder: 'e.g., high churn, cold outreach not working', state: topic, set: setTopic, key: 'topic' },
                ].map((field, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', marginBottom: 8, letterSpacing: 1 }}>{field.label}</label>
                    <input value={field.state} onChange={(e) => field.set(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', padding: '14px 18px', background: '#0d0d12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 15, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <button onClick={generateEmail} disabled={loading || !email || !company || !topic} style={{ background: loading ? '#4a4a6a' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '16px 32px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', marginTop: 8 }}>
                  {loading ? 'Generating...' : '✨ Generate Personalized Email'}
                </button>
              </div>

              <div style={{ background: 'rgba(20,20,28,0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 24, padding: 32, minHeight: 400 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>Generated Email</h3>
                  {generatedEmail && <button onClick={copyEmail} style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a855f7', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>📋 Copy</button>}
                </div>
                {generatedEmail ? (
                  <div style={{ background: '#0d0d12', borderRadius: 12, padding: 20 }}>
                    <pre style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#ddd', margin: 0 }}>{generatedEmail}</pre>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#555' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
                    <p>Your personalized email will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {activeTab === 'pricing' && (
        <section id="pricing" style={{ padding: '100px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, marginBottom: 16 }}>Simple, Transparent Pricing</h2>
            <p style={{ fontSize: 18, color: '#888' }}>Start free, scale as you grow. No hidden fees.</p>
          </div>

          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Free Tier */}
            <div style={{ background: 'rgba(20,20,28,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 36 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Starter</div>
              <div style={{ fontSize: 48, fontWeight: 800 }}>$0<span style={{ fontSize: 16, color: '#666', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: '#888', margin: '12px 0 24px' }}>Perfect to get started</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {['10 email generations/mo', 'Basic personalization', 'Email support'].map((f, i) => (
                  <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, color: '#aaa' }}>
                    <span style={{ color: '#10b981' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '14px 24px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', width: '100%' }}>Get Started Free</button>
            </div>

            {/* Pro Tier */}
            <div style={{ background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05))', border: '2px solid #6366f1', borderRadius: 24, padding: 36, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 20 }}>Most Popular</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Professional</div>
              <div style={{ fontSize: 48, fontWeight: 800 }}>$49<span style={{ fontSize: 16, color: '#666', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: '#aaa', margin: '12px 0 24px' }}>For serious sales teams</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {['Unlimited generations', 'Advanced AI research', 'Priority support', 'Export to CSV', 'Team collaboration'].map((f, i) => (
                  <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, color: '#ddd' }}>
                    <span style={{ color: '#10b981' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '14px 24px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', width: '100%' }}>Start 14-Day Trial</button>
            </div>

            {/* Business Tier */}
            <div style={{ background: 'rgba(20,20,28,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 36 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Business</div>
              <div style={{ fontSize: 48, fontWeight: 800 }}>$149<span style={{ fontSize: 16, color: '#666', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: '#888', margin: '12px 0 24px' }}>For large teams</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {['Everything in Pro', '5 team members', 'API access', 'Custom integrations', 'Dedicated support'].map((f, i) => (
                  <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, color: '#aaa' }}>
                    <span style={{ color: '#10b981' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '14px 24px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', width: '100%' }}>Contact Sales</button>
            </div>
          </div>
        </section>
      )}

      {/* Waitlist CTA */}
      <section style={{ padding: '60px 24px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 24, padding: '48px 36px' }}>
          <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Don't Miss Out</h3>
          <p style={{ fontSize: 16, color: '#888', marginBottom: 28 }}>Join the waitlist and get <strong style={{ color: '#10b981' }}>20% off</strong> your first 3 months</p>
          
          <form onSubmit={joinWaitlist} style={{ display: 'flex', gap: 12, maxWidth: 400, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input name="email" type="email" placeholder="Enter your email" required style={{ flex: 1, minWidth: 200, padding: '14px 20px', background: '#0d0d12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 15, color: '#fff', outline: 'none' }} />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              {waitlistSuccess ? '✓ Joined!' : 'Join Waitlist'}
            </button>
          </form>
          {waitlistSuccess && <p style={{ color: '#10b981', marginTop: 16, fontSize: 14 }}>Thanks! You're on the list 🎉</p>}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px', textAlign: 'center', color: '#555', fontSize: 14 }}>
        <p>© 2026 OutreachIQ. Built with ⚡ for sales teams everywhere.</p>
        <p style={{ marginTop: 8, fontSize: 13 }}>For <strong style={{ color: '#888' }}>B2B</strong> and <strong style={{ color: '#888' }}>B2C</strong> — anyone who wants more replies.</p>
      </footer>
      </div>
    </div>
  )
}