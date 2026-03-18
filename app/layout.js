export const metadata = {
  title: 'OutreachIQ - Cold Emails That Actually Get Replies',
  description: 'We scan what your prospects are talking about online, then write personalized emails that get 47% reply rates.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', background: '#fafafa' }}>
        {children}
      </body>
    </html>
  )
}