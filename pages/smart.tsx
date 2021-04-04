import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DeviceList from '../components/deviceList'

// const socket = () => {
//   const ws = new WebSocket('ws://localhost:3000/api/graphqlSubscriptions')

//   ws.onopen = function () {
//     // Web Socket is connected, send data using send()
//     //  ws.send("Message to send");
//     //  alert("Message is sent...");
//     console.log('OPENED')
//   }

//   ws.onmessage = function (evt) {
//     console.log('EVVT', evt)
//   }

//   ws.onclose = function () {
//     // websocket is closed.
//     console.log('Connection is closed...')
//   }
//   return ws
// }

const Index = () => {
  // const onChangeName = () => {
  //   updateNameMutation({
  //     variables: {
  //       name: newName,
  //     },
  //   })
  // }
  useEffect(() => {
    // window.ws001 = socket()
  }, [])

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

// export async function getStaticProps() {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: ViewerDocument,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

export default Index
