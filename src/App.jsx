import React from 'react'
import SiteHeader from './components/SiteHeader.jsx'
import Hero from './components/Hero.jsx'
import QuickInfo from './components/QuickInfo.jsx'
import TournamentOverview from './components/TournamentOverview.jsx'
import TournamentSchedule from './components/TournamentSchedule.jsx'
import Faq from './components/Faq.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import ContactPage from './components/ContactPage.jsx'
import RegisterPage from './components/RegisterPage.jsx'

const pages = { contact: ContactPage, register_team: RegisterPage }

export default function App() {
  const page = new URLSearchParams(window.location.search).get('page')
  const Page = Object.hasOwn(pages, page) ? pages[page] : null
  const homePath = Page ? import.meta.env.BASE_URL : ''

  return (
    <>
      <SiteHeader homePath={homePath} isContactPage={page === 'contact'} />
      {Page ? (
        <Page />
      ) : (
        <main id="home">
          <Hero />
          {/* <QuickInfo /> */}
          <TournamentOverview />
          <TournamentSchedule />
          <Faq />
        </main>
      )}
      <SiteFooter homePath={homePath} />
    </>
  )
}
