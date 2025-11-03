// pages/albums/[id].js
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
const API = process.env.NEXT_PUBLIC_API_URL

export default function AlbumPage() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=> {
    if (!id) return
    fetch(`${API}/albums/access?id=${id}`).then(r=> {
      if (!r.ok) throw new Error('not found')
      return r.json()
    }).then(setData).catch(()=>setError('Album introuvable'))
  },[id])

  if (error) return <Layout><div style={{ padding:20 }}>{error}</div></Layout>
  if (!data) return <Layout><div style={{ padding:20 }}>Chargement…</div></Layout>

  return (
    <Layout title={data.album.title}>
      <div style={{ maxWidth:1000, margin:'20px auto' }}>
        <h2>{data.album.title}</h2>
        <p style={{ color:'#666' }}>{data.album.description}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12 }}>
          {data.photos.map(p => (
            <div key={p.photoId} style={{ background:'#fff', padding:8, borderRadius:8 }}>
              <img src={p.url} alt="" style={{ width:'100%', height:120, objectFit:'cover', borderRadius:6 }} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
