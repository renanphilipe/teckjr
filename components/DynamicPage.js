import { useEffect, useState } from 'react'
import Layout from './Layout'
import { getContent, trackView } from '../lib/store'
import { PageHero, Section, ResourceGroup } from './ui'

export default function DynamicPage({ pageKey }) {
  const [page, setPage] = useState(null)

  useEffect(() => {
    const content = getContent()
    setPage(content.pages[pageKey])
    trackView(pageKey)
  }, [pageKey])

  if (!page) return <Layout><div style={{padding:120,textAlign:'center',color:'var(--text3)'}}>Carregando...</div></Layout>

  return (
    <Layout title={page.title} desc={page.desc}>
      <PageHero icon={page.icon} title={page.title} desc={page.desc} color={page.color} />
      <div className="wrap" style={{ paddingTop:48, paddingBottom:80 }}>
        {page.sections.map(sec => (
          <div key={sec.id}>
            <Section title={sec.title} />
            {sec.groups.map(g => (
              <ResourceGroup key={g.id} name={g.name} links={g.links} phone={g.phone} />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}
