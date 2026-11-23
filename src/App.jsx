import React from 'react'
import SiteHeader from './components/SiteHeader.jsx'
import Hero from './components/Hero.jsx'
import QuickInfo from './components/QuickInfo.jsx'
import TournamentOverview from './components/TournamentOverview.jsx'
import TournamentSchedule from './components/TournamentSchedule.jsx'
import Faq from './components/Faq.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import ContactPage from './components/ContactPage.jsx'

export default function App() {
  const isContactPage = new URLSearchParams(window.location.search).get('page') === 'contact'
  const homePath = isContactPage ? import.meta.env.BASE_URL : ''

  return (
    <>
      <SiteHeader homePath={homePath} isContactPage={isContactPage} />
      {isContactPage ? (
        <ContactPage />
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
