import Layout from '../components/Layout'
import { PageHero, Section, ResourceGroup } from '../components/ui'

export default function Hardware() {
  return (
    <Layout title="Hardware" desc="Links das aulas de hardware — TeckJR">
      <PageHero
        icon="🖥️"
        title="Hardware"
        desc="Links das aulas e materiais de estudo sobre hardware."
        color="var(--accent)"
      />

      <div className="wrap" style={{ paddingTop:48, paddingBottom:80 }}>

        <Section title="Links das aulas" />

        <ResourceGroup name="Montando sua Bancada" links={[
          { href:'https://docs.google.com/presentation/d/1s9GqSGNHGLCrK91YaBRS6qN-Bd27RFYiBrBWaGN7EHU/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Vendo o celular" links={[
          { href:'https://drive.google.com/file/d/196nQorRYw2hkAW9SpiWiXNODEdTM4p-T/view?usp=sharing' }
        ]}/>

        <ResourceGroup name="Especificações dos dispositivos" links={[
          { href:'https://drive.google.com/drive/folders/1inWQAHJzs3AbLOO4JIgcCcj4I1Sad_AA?usp=sharing' }
        ]}/>

        <ResourceGroup name="Processamento e memória" links={[
          { href:'https://drive.google.com/drive/folders/1Mqag12zYUBglTQCabyzomQzYO_7J_Gln?usp=sharing' }
        ]}/>

        <ResourceGroup name="Tensão e Corrente - Volt e Ampere" links={[
          { href:'https://docs.google.com/presentation/d/1dybXi7qLZghlO38yU6NHHjJjjdrAthW0wFqAmthEChI/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Bateria" links={[
          { href:'https://drive.google.com/file/d/1qu_etXvBD6_wg5pHzO4W77CO8a3pjsbR/view?usp=sharing' }
        ]}/>

        <ResourceGroup name="Multimetro" links={[
          { href:'https://drive.google.com/drive/u/1/folders/1PRn-ZTLdyFujh5aivV5Mc7QjrhE3Z5BY' }
        ]}/>

        <ResourceGroup name="Fonte de bancada" links={[
          { href:'https://docs.google.com/document/d/1EaBREwP0zsjblVMD8z5kyeLCSyRKy17k8-sDG4womp0/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Voltimetro e amperimetro USB" links={[
          { href:'https://docs.google.com/document/d/1fKo9FSiZAY4pDKUSnLjyyhY36CnVBYsPayF6yVG9C6A/edit?usp=sharing' }
        ]}/>

        <ResourceGroup name="Componentes" links={[
          { label:'Link 1', href:'https://drive.google.com/drive/folders/1e05ao-UtJpuXAIp015fGY7QU7VBNufg9?usp=sharing' },
          { label:'Link 2', href:'https://drive.google.com/file/d/1KBzUBZwNeCI0alIqfiui8NQe36FRxrlW/view?usp=sharing' },
        ]}/>

        <ResourceGroup name="Circuito Integrado" links={[
          { label:'Link 1', href:'https://docs.google.com/presentation/d/1ur4UvMJf248BdGzP4yuiCF-VsNc5jkytwe4DvXd6Vr4/edit?usp=sharing' },
          { label:'Link 2', href:'https://docs.google.com/document/d/1sfJm-u1tubJgKcbSRlEgmOnPmy03aYfpi9l78mj3uc4/edit?usp=sharing' },
        ]}/>

        <ResourceGroup name="Tipos de displays" links={[
          { href:'https://docs.google.com/presentation/d/1SXrz9m5TwobLQdq7KVmXGrc39HeFK7iASpt_gMXHn6A/edit?usp=sharing' }
        ]}/>

        <Section title="Vídeos e canais de YouTube" />

        <ResourceGroup name="GCFAprendeLivre — Hardware e software" links={[
          { href:'https://www.youtube.com/watch?v=G0lMlqWuPJI' }
        ]}/>

        <ResourceGroup name="Manual do mundo — Volt, Ampere e Watts / Multimetro" links={[
          { label:'Link 1', href:'https://www.youtube.com/watch?v=JtttnL28m3Q&t=31s' },
          { label:'Link 2', href:'https://www.youtube.com/watch?v=1WIWrmc-rBk&t=4s' },
        ]}/>

        <ResourceGroup name="Nice cell — Curso de manual de serviço" links={[
          { href:'https://www.youtube.com/watch?v=RUpbOXMBtew&list=PLMHQm7nrbmqAnPYC1l3iz0FtUPGRsbbIJ' }
        ]}/>

        <ResourceGroup name="MobalTech — Diferenças display de LCD e LED" links={[
          { href:'https://www.youtube.com/watch?v=MxOMgO5p7e8&t=200s' }
        ]}/>

        <ResourceGroup name="Canaltech — Diferença de Oled e Amoled" links={[
          { href:'https://www.youtube.com/watch?v=H3rjmvPZg9Y&t=1s' }
        ]}/>

        <ResourceGroup name="Edy CompCel — Como trocar só o vidro do display" links={[
          { href:'https://www.youtube.com/watch?v=RigPRgg64r4' }
        ]}/>

        <ResourceGroup name="Edy CompCel — Como trocar só a pelicula polarizadora do display" links={[
          { href:'https://www.youtube.com/watch?v=jvzcq81yExM' }
        ]}/>

      </div>
    </Layout>
  )
}
