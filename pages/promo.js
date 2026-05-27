import Layout from '../components/Layout'
import { PageHero, Section, ResourceGroup } from '../components/ui'

export default function Promo() {
  return (
    <Layout title="Promoções Shopee" desc="Links de promoções Shopee para montagem de bancada — TeckJR">
      <PageHero
        icon="🏷️"
        title="Promoções Shopee"
        desc="Se algum link não estiver funcionando, mande mensagem no WhatsApp: 81-99696-9395"
        color="var(--red)"
      />

      <div className="wrap" style={{ paddingTop:48, paddingBottom:80 }}>

        <Section title="Ferramentas" />

        <ResourceGroup name="Jogo de chave — Simples" links={[
          { href:'https://s.shopee.com.br/BJl8w3TFa' }
        ]}/>

        <ResourceGroup name="Jogo de chave — Completo" links={[
          { href:'https://s.shopee.com.br/5py7tRRj2Z' }
        ]}/>

        <ResourceGroup name="Manta" links={[
          { href:'https://s.shopee.com.br/LdBLQBamc' }
        ]}/>

        <ResourceGroup name="Espátula — Abertura" links={[
          { href:'https://s.shopee.com.br/AKQXGgM6a3' }
        ]}/>

        <ResourceGroup name="Espátula — Display e traseira" links={[
          { href:'https://s.shopee.com.br/5L1rJY3mBn' }
        ]}/>

        <ResourceGroup name="Pinça" links={[
          { href:'https://s.shopee.com.br/8AM2gsgxWL' }
        ]}/>

        <Section title="Teste Elétrico" />

        <ResourceGroup name="USB Tester — Voltímetro e Amperímetro USB" links={[
          { href:'https://s.shopee.com.br/2VhfwZrSEj' }
        ]}/>

        <ResourceGroup name="Multimetro Hikari" links={[
          { href:'https://s.shopee.com.br/9pUGgCYYCf' }
        ]}/>

        <ResourceGroup name="Fonte de bancada — 15V 2A" links={[
          { href:'https://s.shopee.com.br/9pUGgNLrG2' }
        ]}/>

        <ResourceGroup name="Fonte de bancada — 30V 5A" links={[
          { href:'https://s.shopee.com.br/AKQXHLN8sO' }
        ]}/>

        <Section title="Equipamentos de Bancada" />

        <ResourceGroup name="Separadora de display" links={[
          { href:'https://s.shopee.com.br/6KuOW2AD4E' }
        ]}/>

        <ResourceGroup name="Suporte de separação de tela" links={[
          { href:'https://s.shopee.com.br/7ATVVe9y28' }
        ]}/>

        <ResourceGroup name="Dispenser álcool isopropílico" links={[
          { href:'https://s.shopee.com.br/5fehiyrFuP' }
        ]}/>

        <ResourceGroup name="Removedora de cola — Micro retífica" links={[
          { href:'https://s.shopee.com.br/9AEZtTGJhQ' }
        ]}/>

        <ResourceGroup name="Microscópio digital" links={[
          { href:'https://s.shopee.com.br/1g8YxqNEMW' }
        ]}/>

        <Section title="Solda" />

        <ResourceGroup name="Estação de solda — Ya-xun" links={[
          { href:'https://s.shopee.com.br/gG1m5kSyh' }
        ]}/>

        <ResourceGroup name="Suporte de placa" links={[
          { href:'https://s.shopee.com.br/5VLHXpG0SS' }
        ]}/>

        <ResourceGroup name="Solda — Pequena" links={[
          { href:'https://s.shopee.com.br/5py7vrB89V' }
        ]}/>

        <ResourceGroup name="Solda — Grande" links={[
          { href:'https://s.shopee.com.br/BJlBUVUWH' }
        ]}/>

        <ResourceGroup name="Pasta de solda" links={[
          { href:'https://s.shopee.com.br/1LViZfzRJy' }
        ]}/>

        <ResourceGroup name="Pasta de solda (2)" links={[
          { href:'https://s.shopee.com.br/8fIJJDjehq' }
        ]}/>

        <Section title="Adesivos e Organização" />

        <ResourceGroup name="Fita Kapton e térmica" links={[
          { href:'https://s.shopee.com.br/3VaD9lkVvM' }
        ]}/>

        <ResourceGroup name="Fita dupla face" links={[
          { href:'https://s.shopee.com.br/50P0wfWlhG' }
        ]}/>

        <ResourceGroup name="Kit cola preta e transparente" links={[
          { href:'https://s.shopee.com.br/gG1mkPVLP' }
        ]}/>

        <ResourceGroup name="Organizador de bancada" links={[
          { href:'https://s.shopee.com.br/AA776HjTA2' }
        ]}/>

        <ResourceGroup name="Suporte de celulares para organizar bancada" links={[
          { href:'https://s.shopee.com.br/5L1rLQf3ym' }
        ]}/>

        <Section title="Iluminação" />

        <ResourceGroup name="Luminária com lupa" links={[
          { href:'https://s.shopee.com.br/7pjCKBEJ7H' }
        ]}/>

        <ResourceGroup name="Luminária sem lupa" links={[
          { href:'https://s.shopee.com.br/8fIJJmqxxJ' }
        ]}/>

      </div>
    </Layout>
  )
}
