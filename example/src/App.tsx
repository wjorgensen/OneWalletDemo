import { InitializeAccount } from './components/InitializeAccount'
import styles from './styles/Home.module.scss'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import React from 'react'

export function App() {
  const { account } = useAuth()

  if (account) {
    return <Navigate to="/home" />
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>One Wallet Demo</h1>
      <p className={styles.subtitle}>The future of crypto UX</p>

      <InitializeAccount />
    </div>
  )
}
