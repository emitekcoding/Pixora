// components/Layout.js
import Head from 'next/head'
export default function Layout({ children, title = 'Pixora' }) {
  return (
    <>
      <Head>
        <title>{title} · Pixora</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ fontFamily: 'Inter, Arial', padding: 20, background: '#f6fbff', minHeight: '100vh' }}>
        <header style={{ display:'flex', alignItems:'center', gap:12 }}>
          <img src="/logo.png" alt="Pixora" style={{ width:48, height:48 }} />
          <h1 style={{ margin:0 }}>Pixora</h1>
        </header>
        <main style={{ marginTop:20 }}>{children}</main>
      </div>
    </>
  )
}
