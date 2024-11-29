import React, { createContext, useContext, ReactNode } from 'react'
import { Account } from '../modules/Account'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  account: Account.Account | undefined
  signOut: () => void
  signIn: (account: Account.Account) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = React.useState<Account.Account | undefined>(undefined)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log('AuthContext initializing...')
    const storedAccount = localStorage.getItem('account')
    console.log('Stored account found:', storedAccount)
    if (storedAccount) {
      try {
        const parsedAccount = JSON.parse(storedAccount)
        const account = {
          ...parsedAccount,
          key: {
            ...parsedAccount.key,
            publicKey: {
              x: BigInt(parsedAccount.key.publicKey.x),
              y: BigInt(parsedAccount.key.publicKey.y)
            }
          }
        } as Account.Account
        
        if (account.address && account.key) {
          setAccount(account)
        }
      } catch (e) {
        console.error('Error parsing stored account:', e)
        localStorage.removeItem('account')
      }
    }
    setIsInitialized(true)
  }, [])

  const signIn = (account: Account.Account) => {
    setAccount(account)
    const storageAccount = {
      ...account,
      key: {
        ...account.key,
        publicKey: {
          x: account.key.publicKey.x.toString(),
          y: account.key.publicKey.y.toString()
        }
      }
    }
    localStorage.setItem('account', JSON.stringify(storageAccount))
  }

  const signOut = () => {
    setAccount(undefined)
    localStorage.removeItem('account')
    navigate('/')
  }

  if (!isInitialized) {
    return null // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ account, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
