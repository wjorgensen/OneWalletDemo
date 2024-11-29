import { type BaseError, encodeFunctionData, parseEther } from 'viem'

import { useWaitForTransactionReceipt } from 'wagmi'
import { client } from '../config'
import { tUSDC } from '../contracts'
import { Account } from '../modules/Account'
import React from 'react'
import styles from '../styles/Mint.module.scss'

interface MintProps {
  account: Account.Account
  amount?: string
  onSuccess?: () => void
}

export function Mint({ account, amount = '100', onSuccess }: MintProps) {
  const {
    data: hash,
    mutate: execute,
    error,
    ...executeQuery
  } = Account.useExecute({
    client,
  })

  const receiptQuery = useWaitForTransactionReceipt({ hash })

  const isPending =
    receiptQuery.fetchStatus === 'fetching' || executeQuery.isPending
  const isSuccess = receiptQuery.isSuccess && executeQuery.isSuccess

  React.useEffect(() => {
    if (isSuccess && hash) {
      const explorerUrl = `${client.chain.blockExplorers.default.url}/tx/${hash}`
      console.log('Mint Status: Success')
      console.log('Block Explorer URL:', explorerUrl)
      if (onSuccess) onSuccess()
    }
  }, [isSuccess, hash, onSuccess])

  const handleMint = () => {
    execute({
      account,
      calls: [
        {
          to: tUSDC.address,
          data: encodeFunctionData({
            abi: tUSDC.abi,
            functionName: 'mint',
            args: [account.address, parseEther(amount)],
          }),
        },
      ],
    })
  }

  return (
    <div className={styles.mintContainer}>
      <button
        disabled={isPending || isSuccess}
        onClick={handleMint}
        type="button"
        className={styles.button}
      >
        {isPending ? 'Minting...' : `Mint ${amount} tUSDC`}
      </button>
      {error && <p className={styles.error}>{(error as BaseError).shortMessage ?? error.message}</p>}
    </div>
  )
}
