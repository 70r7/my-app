// src/components/TokenPrice.tsx
import React, { useEffect, useState } from 'react'
import { useReadContract} from 'wagmi'

// interface CoqPriceInUSDCProps {
//     coqAddress: `0x${string}`
//     wavaxAddress: `0x${string}`
//     usdcAddress: `0x${string}`
// }

const traderJoeRouter = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
const contractFunction = 'getAmountsOut'

const coqAddress="0x420FcA0121DC28039145009570975747295f2329"
const wavaxAddress="0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
const usdcAddress="0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e"

const TokenPrice = () => {
    const [price, setPrice] = useState<string | null>(null)

    const coqToWavax = useReadContract({
        address: traderJoeRouter, // Trader Joe Router
        abi:  [
            {
                constant: true,
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256'
                    },
                    {
                        name: 'path',
                        type: 'address[]'
                    }
                ],
                name: 'getAmountsOut',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]'
                    }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
            }
        ],
        functionName: contractFunction,
        args: [BigInt(1e18), [coqAddress, wavaxAddress]] as const,
    })

    const wavaxToUsdc = useReadContract({
        address: traderJoeRouter, // Trader Joe Router
        abi: [
            {
                constant: true,
                inputs: [
                    {
                        name: 'amountIn',
                        type: 'uint256'
                    },
                    {
                        name: 'path',
                        type: 'address[]'
                    }
                ],
                name: 'getAmountsOut',
                outputs: [
                    {
                        name: 'amounts',
                        type: 'uint256[]'
                    }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
            }
        ],
        functionName: contractFunction,
        args: [BigInt(1e18), [wavaxAddress, usdcAddress]] as const,
    })

    useEffect(() => {
        if (coqToWavax.data && wavaxToUsdc.data) {
            const wavaxAmount = Number(coqToWavax.data[1]) / 1e18
            const usdcAmount = Number(wavaxToUsdc.data[1]) / 1e6
            const coqToUsdcPrice = usdcAmount * wavaxAmount
            setPrice(coqToUsdcPrice.toFixed(10))
        }
    }, [coqToWavax.data, wavaxToUsdc.data])

    if (coqToWavax.isLoading || wavaxToUsdc.isLoading) return <p>Loading...</p>
    if (coqToWavax.isError || wavaxToUsdc.isError) return <p>Error fetching token price</p>

    return (
        <div>
            {price !== null ? (
                <p>Coq Price: ${price}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default TokenPrice;
