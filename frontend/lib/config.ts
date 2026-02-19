import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient } from '@tanstack/react-query'

// Get projectId at https://cloud.reown.com
export const projectId = 'YOUR_PROJECT_ID'

export const metadata = {
    name: 'ZK-vvm Secure Payments',
    description: 'ZK-Compliant Secure Payments Platform',
    url: 'https://zkvvm.org',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks = [mainnet, arbitrum]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks
})

// Initialize AppKit
createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, arbitrum],
    projectId,
    metadata,
    themeMode: 'dark',
    features: {
        analytics: true
    }
})

export const queryClient = new QueryClient()
