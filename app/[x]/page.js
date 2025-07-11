'use client'

import { useParams } from 'next/navigation'
import Ticket from '../components/Ticket'

export default function HomeOffsetPage() {
    const params = useParams()
    const { x } = params

    return <Ticket offset={x} />
}