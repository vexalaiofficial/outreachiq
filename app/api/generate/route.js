import { NextResponse } from 'next/server'

// Mock AI generation - replace with real AI API when ready
function generatePersonalizedEmail(company, topic) {
  const templates = [
    `Hey there,

I noticed your team at ${company} has been dealing with ${topic}. That's a tough one - we've seen companies struggle with this for months before finding a solution that actually works.

Here's what worked for us: [brief solution outline]

Would you be open to a quick 10-minute call to share what we've learned?

Best`,
    `Hi,

Saw your recent discussion about ${topic} - that's exactly what we help companies like ${company} solve.

Rather than bore you with a pitch, I wanted to share one insight that changed everything for us: [key insight]

Happy to go deeper if useful. No pressure either way.

Cheers`,
    `Hey,

Quick question - how's ${topic} going at ${company}? 

We used to struggle with this too until we realized [hidden insight]. It's made a huge difference for us.

Let me know if you'd find 5 minutes to chat about it.

Best regards`
  ]
  
  return templates[Math.floor(Math.random() * templates.length)]
}

export async function POST(request) {
  try {
    const { email, company, topic } = await request.json()
    
    if (!email || !company || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const generatedEmail = generatePersonalizedEmail(company, topic)
    
    return NextResponse.json({ 
      email: generatedEmail,
      success: true,
      meta: {
        company,
        topic,
        generatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    )
  }
}