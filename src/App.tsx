import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './configs/config'
import exp from 'constants'

import TokenPrice from './components/priceWigdet'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <h1>Token Price from Trader Joe</h1>
        <TokenPrice />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App;