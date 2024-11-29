import { AccountDetails } from '../components/AccountDetails'
import { Mint } from '../components/Mint'
import { Send } from '../components/Send'
import styles from '../styles/Home.module.scss'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'

export function Home() {
  const { account, signOut } = useAuth()
  const [mintAmount, setMintAmount] = useState('100')

  if (!account) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>One Wallet Demo</h1>
        <button onClick={signOut} className={styles.signOutButton}>
          Sign Out
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.accountDetails}>
          <div className={styles.balanceAndMint}>
            <div className={styles.balanceSection}>
              <AccountDetails account={account} />
            </div>
            <div className={styles.mintSection}>
              <span className={styles.label}>Mint tUSDC</span>
              <div className={styles.mintControls}>
                <input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className={styles.mintInput}
                  min="0"
                  placeholder="Amount"
                />
                <Mint account={account} amount={mintAmount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
