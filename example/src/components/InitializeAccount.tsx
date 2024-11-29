import React from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../config'
import { Account } from '../modules/Account'
import styles from '../styles/Home.module.scss'
import { useAuth } from '../context/AuthContext'
import { BaseError } from 'viem' // Import BaseError

export function InitializeAccount() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const createMutation = Account.useCreate({
    client,
    onSuccess: (account: Account.Account) => {
      signIn(account)
      navigate('/home')
    },
  })
  const loadMutation = Account.useLoad({
    client,
    onSuccess: (account: Account.Account) => {
      signIn(account)
      navigate('/home')
    },
  })

  const isPending = createMutation.isPending || loadMutation.isPending
  const error = createMutation.error || loadMutation.error

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        disabled={isPending}
        onClick={() => createMutation.mutate()}
        type="button"
      >
        Register
      </button>
      <button
        className={styles.button}
        disabled={isPending}
        onClick={() => loadMutation.mutate()}
        type="button"
      >
        Sign In
      </button>
      {error && (
        <p>{(error as BaseError).shortMessage ?? error.message}</p>
      )}
    </div>
  )
}
