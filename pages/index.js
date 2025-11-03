// pages/index.js
import { useState } from 'react'
import Layout from '../components/Layout'

const API = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e?.preventDefault()
    setError(null)
    const q = input.trim()
    if (!q) return setError('Entrez un code, un ID ou un lien.')
    // determine param: treat as URL if contains http
    const isUrl = q.startsWith('http')
    const params = isUrl ? `id=${encodeURIComponent(q.split('/').pop())}` : (q.length <= 12 ? `code=${encodeURIComponent(q)}` : `id=${encodeURIComponent(q)}`)
    try {
      const res = await fetch(`${API}/albums/access?${params}`)
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      const data = await res.json()
      // open album page
      window.location.href = `/albums/${data.album.albumId}`
    } catch (err) {
      console.error(err)
      setError('Album non trouvé ou erreur réseau.')
    }
  }

  return (
    <Layout>
      <div style={{ maxWidth:720, margin:'40px auto', background:'#fff', padding:36, borderRadius:12 }}>
        <h2>Accéder à vos photos</h2>
        <p>Entrez le code, l'ID ou le lien d'album fourni.</p>
        <form onSubmit={submit}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Code, ID ou lien d'album" style={{ width:'100%', padding:12, fontSize:16, borderRadius:8, border:'1px solid #e6edf5' }} />
          <div style={{ marginTop:12 }}>
            <button type="submit" style={{ padding:'10px 20px', background:'#2f9cff', color:'#fff', borderRadius:8, border:'none' }}>Accéder</button>
          </div>
          {error && <p style={{ color:'crimson' }}>{error}</p>}
        </form>
      </div>
    </Layout>
  )
}
