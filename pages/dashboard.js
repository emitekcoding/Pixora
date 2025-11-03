// pages/dashboard.js
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
const API = process.env.NEXT_PUBLIC_API_URL

export default function Dashboard() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [albums, setAlbums] = useState([])

  useEffect(()=> {
    // fetch public + all albums for demo
    fetch(`${API}/albums/public`).then(r=>r.json()).then(setAlbums).catch(()=>{})
  },[])

  const create = async (e) => {
    e?.preventDefault()
    const payload = { title, description: desc, visibility: 'private', photographerName: 'Demo' }
    const r = await fetch(`${API}/albums`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload)})
    const data = await r.json()
    setAlbums([data,...albums])
    setTitle(''); setDesc('')
  }

  return (
    <Layout title="Dashboard">
      <div style={{ maxWidth:900, margin:'20px auto' }}>
        <h2>Dashboard photographe</h2>
        <form onSubmit={create} style={{ display:'grid', gap:8, marginBottom:20 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Titre de l'album" />
          <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (optionnel)" />
          <button type="submit" style={{ padding:8, background:'#2f9cff', color:'#fff', borderRadius:6 }}>Créer l'album</button>
        </form>

        <h3>Albums (demo)</h3>
        <div style={{ display:'grid', gap:12 }}>
          {albums.map(a => (
            <div key={a.albumId} style={{ background:'#fff', padding:12, borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <strong>{a.title}</strong>
                <div style={{ fontSize:13, color:'#666' }}>{a.photographerName} • {a.visibility}</div>
                {a.accessCode && <div style={{ marginTop:6, fontSize:13 }}>Code: <code>{a.accessCode}</code></div>}
              </div>
              <div>
                <a href={`/albums/${a.albumId}`} style={{ color:'#2f9cff' }}>Ouvrir</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
