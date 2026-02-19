export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'withdrawn'

export interface ComplianceData {
    regulatoryId: string
    governmentActorId?: string
    timestamp: number
    metadata?: Record<string, unknown>
}

export interface PaymentRequest {
    id: string
    amount: bigint
    recipient: `0x${string}`
    sender: `0x${string}`
    status: PaymentStatus
    zkProof?: string
    complianceData: ComplianceData
}

export interface ZKProof {
    proof: `0x${string}`
    publicInputs: string[]
}
