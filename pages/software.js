import Layout from '../components/Layout'
import { PageHero, Section, ResourceGroup } from '../components/ui'

export default function Software() {
  return (
    <Layout title="Software" desc="Links das aulas de software — TeckJR">
      <PageHero
        icon="💾"
        title="Software"
        desc="Materiais, ferramentas e aulas sobre software."
        color="var(--purple)"
      />

      <div className="wrap" style={{ paddingTop:48, paddingBottom:80 }}>

        <ResourceGroup name="Evolução das redes móveis" links={[
          { href:'https://docs.google.com/document/d/1sJx6gaycHBKRUU2icHTYGXaI9PI6rD3orm9RnQzIG2E/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Sistemas Operacionais" links={[
          { href:'https://docs.google.com/presentation/d/1XNXARxqoIlMB6AkH4jbCyGTuiumuJIKdHbqeu5NYISw/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Básico de Windows para software" links={[
          { href:'https://docs.google.com/document/d/1nxGIBWHBJf48VcgHPTV7LZ8-I2xi-TN58H1t7yilQxw/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Empreendedorismo e documentos para assistência técnica" links={[
          { href:'https://docs.google.com/document/d/15zD-Wm0DLiKq8n4S5McdI5nySidOlZIz_jwfkuCkoBo/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Modelo de recibo de compra de celular usado" links={[
          { href:'https://docs.google.com/document/d/1xbHPpzXcf-K7MpSyEiJ7lei1b6AyPrbbqKDCH0ISNOQ/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Ordem de serviço" links={[
          { href:'https://docs.google.com/document/d/1PHngT3xSXQWFK7RBHhz2Hs-O9ZVYHejA/edit?usp=sharing&ouid=105572245658331748401&rtpof=true&sd=true' }
        ]}/>

        <ResourceGroup name="Padronização 5s" links={[
          { href:'https://docs.google.com/presentation/d/1HxAyhjMsWhjS8EBEt_Ch4iUNbc5p5yzkEVebpcaJTrw/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Hard reset e atualização de software" links={[
          { label:'Link 1', href:'https://drive.google.com/drive/folders/1zDe3w9ZEVl5NTzaqav0STbT1W8avjHPP?usp=sharing' },
          { label:'Link 2', href:'https://docs.google.com/presentation/d/1RsvcFJWWlXzada-OKIAEJwSgMiI3Y8Am_ivl-VDPSMU/edit?usp=sharing' },
        ]}/>

        <Section title="Samsung — Odin" />

        <ResourceGroup name="Material da aula" links={[
          { href:'https://docs.google.com/presentation/d/17CZYk-Ce_4pO9E_l3o69z4BiNSE2s7l2Sfls3UMSa4w/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Driver USB (Samsung)" links={[
          { href:'https://developer.samsung.com/android-usb-driver' }
        ]}/>

        <ResourceGroup name="Odin" links={[
          { href:'https://www.stockrom.net/2016/12/programas-para-flash-instalacao-de.html' }
        ]}/>

        <ResourceGroup name="ROMs (Samsung)" links={[
          { href:'https://www.stockrom.net/samsung' }
        ]}/>

        <Section title="Motorola" />

        <ResourceGroup name="Motorola — Software Fix" links={[
          { href:'https://pt-br.support.motorola.com/app/answers/detail/a_id/165308' }
        ]}/>

        <Section title="iPhone" />

        <ResourceGroup name="iPhone — iTunes" links={[
          { label:'Loja Microsoft', href:'https://www.apple.com/br/itunes/' },
          { label:'Instalador', href:'https://support.apple.com/pt-br/106379' },
        ]}/>

        <ResourceGroup name="iPhone — 3Utools" links={[
          { href:'https://3utools.info/download/' }
        ]}/>

        <Section title="Outros" />

        <ResourceGroup name="App desbloqueio Samsung" links={[
          { href:'https://drive.google.com/file/d/1_eb2rFc8yiPmzBljJaMZ3sRR6OSnVmtV/view?usp=sharing' }
        ]}/>

        <Section title="Vídeos e canais indicados no YouTube" />

        <ResourceGroup name="GCFAprendeLivre — Hardware e software" links={[
          { href:'https://www.youtube.com/watch?v=G0lMlqWuPJI' }
        ]}/>

        <ResourceGroup name="Lesics português — Como funciona o seu celular?" links={[
          { href:'https://www.youtube.com/watch?v=7kBTz_ANgsk' }
        ]}/>

        <ResourceGroup name="Canal do raposo — Desbloqueio" links={[
          { href:'https://www.youtube.com/@RaposoInfocellJH' }
        ]}/>

        <ResourceGroup name="Willians Celulares — Binary Samsung / Atualização via ODIN" links={[
          { label:'Link 1', href:'https://www.youtube.com/watch?v=tTqGqeGDDq8' },
          { label:'Link 2', href:'https://www.youtube.com/watch?v=O2cZzrhTrag' },
        ]}/>

        <ResourceGroup name="Willians Celulares — Modo recovery iPhone do 8 ao 16" links={[
          { href:'https://www.youtube.com/watch?v=AbJYuj5n2RA&t=124s' }
        ]}/>

        <ResourceGroup name="Telecélula Academy — Modo recovery iPhone 7" links={[
          { href:'https://www.youtube.com/watch?v=MlkR5zYsWaA' }
        ]}/>

      </div>
    </Layout>
  )
}
