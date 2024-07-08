import { createConfig, http } from '@wagmi/core'
import { avalanche } from 'wagmi/chains'

export const config = createConfig({
    chains: [avalanche],
    transports: {
        [avalanche.id]: http()
    }
});
