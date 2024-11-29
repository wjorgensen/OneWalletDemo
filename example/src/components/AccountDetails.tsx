import { formatEther } from 'viem'
import { useReadContract } from 'wagmi'

import { client } from '../config'
import { tUSDC } from '../contracts'
import type { Account } from '../modules/Account'
import styles from '../styles/AccountDetails.module.scss'

export function AccountDetails({ account }: { account: Account.Account }) {
  const { data: expBalance } = useReadContract({
    ...tUSDC,
    functionName: 'balanceOf',
    args: [account.address],
    query: {
      refetchInterval: 1000,
    },
  })

  return (
    <div className={styles.accountDetails}>
      {typeof expBalance === 'bigint' && (
        <div className={styles.balance}>
          <span className={styles.balanceAmount}>${formatEth(expBalance)}</span>
        </div>
      )}
    </div>
  )
}

const numberIntl = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 6,
})

export function formatEth(wei: bigint) {
  return numberIntl.format(Number(formatEther(wei)))
}
