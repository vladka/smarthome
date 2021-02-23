import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DeviceList from '../components/deviceList'


const Index = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DeviceList />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Index
