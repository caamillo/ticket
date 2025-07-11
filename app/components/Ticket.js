'use client'
// React
import { useEffect, useRef, useState } from "react"

// Deps
import Image from "next/image"
import QRCode from 'qrcode'

// Components
import Navbar from "./Navbar"

// Icons
import ZoomIcon from '../../public/zoom.svg'
import TimerIcon from '../../public/timer.svg'
import PinIcon from '../../public/pin.svg'

const NOW = new Date()

const RAND_QR_ID = new Array(10).fill(0)
  .map(() => Math.floor(Math.random() * 10))
  .join('')

const Ticket = ({ offset = 8 }) => {

    const L_SHIFT = parseInt(offset) * 60 * 1e3 // Time Elapsed simulation shifting minutes (30 minutes)
    const TOTAL_DURATION = 90 * 60 * 1e3 // Total ticket duration (90 minutes)

    const START_TIME = NOW.getTime() - L_SHIFT // When the ticket actually started
    const END_TIME = START_TIME + TOTAL_DURATION // When the ticket expires

    const canvasRef = useRef()
    const [now, setNow] = useState(new Date())
    const [perc, setPerc] = useState(() => {
        // Calculate initial percentage based on actual current time
        const timeRemaining = END_TIME - NOW.getTime()
        return Math.max(0, (timeRemaining / TOTAL_DURATION) * 100)
    })
    const [timeRemaining, setTimeRemaining] = useState(END_TIME - NOW.getTime())

  useEffect(() => {
    if (!canvasRef.current) return

    QRCode.toCanvas(canvasRef.current, RAND_QR_ID, { width: '200' }, (err) => {
      if (err) return console.error(err)
    })
  }, [canvasRef, RAND_QR_ID])

  const timeFormat = (d, fromDate = true, extra = false) => {
    if (fromDate) {
      d = new Date(d)
      if (!d) return '--'

      const [h, m, s] = [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      ].map(el => String(el).padStart(2, '0'))

      let [ da, mo, y ] = [
        d.getDate(),
        d.getMonth() + 1,
        d.getFullYear()
      ].map(el => String(el).padStart(2, '0'))

      return `${ extra ? `${da}/${mo}/${y} ` : '' }${h}:${m}:${s}`
    } else {
      // For duration formatting (milliseconds to HH:MM:SS)
      const totalSeconds = Math.floor(d / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  }

  useEffect(() => {
    const i = setInterval(() => {
      const currentTime = new Date()
      setNow(currentTime)
      
      // Calculate percentage based on actual current time
      const timeRemainingMs = END_TIME - currentTime.getTime()
      const newPerc = Math.max(0, (timeRemainingMs / TOTAL_DURATION) * 100)
      setPerc(newPerc)
      setTimeRemaining(Math.max(0, timeRemainingMs))
    }, 1e3)

    return () => clearInterval(i)
  }, [])

// Soluzione completa - aggiungi questo alla fine del tuo componente Home, prima del return:

return(
  <div className="relative w-full">
    <Navbar />
    <div className="w-full h-[calc(var(--navbar-height)+50px)] bg-[#58caa4] flex justify-center items-end">
      <div className="w-full h-12 flex items-center justify-center">
        <span className="w-full font-bold text-white text-xl text-center">TICKET ACTIVE</span>
      </div>
    </div>
    <div className=" mt-3">
      <div className="w-full rounded-xl shadow-xl flex flex-col container mx-auto">
        <div className="w-full h-full">
          <div className="w-full h-12 flex justify-between items-center px-5">
            <span className="text-tuaGreen font-semibold tracking-wide text-xl">Check and validation</span>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <canvas ref={canvasRef} id="barcode"></canvas>
          </div>
          <p className="text-center font-bold text-xl">{RAND_QR_ID}</p>
        </div>
        <div className="w-full h-1/3 p-5 flex flex-col items-center justify-between">
          <div className="flex justify-center items-center space-x-1">
            <Image
              priority
              src={ZoomIcon}
              alt="ZoomIcon"
              className=" w-7"
            />
            <span>Zoom</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <Image
                priority
                src={TimerIcon}
                alt="TimerIcon"
                className="w-7"
              />
              <div className="space-y-1">
                <p>{timeFormat(now)}</p>
                <div className="w-16 h-3.5 ring-2 ring-red-500 ring-offset-2 rounded-lg overflow-hidden">
                  <div style={{ width: `${perc}%` }} className="h-full bg-red-400"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <Image
                priority
                src={PinIcon}
                alt="PinIcon"
                className="w-7"
              />
              <span>198</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="w-full container mx-auto mt-5">
     <div className="w-full container mx-auto mt-5">
  {/* First stripe */}
  <div className="overflow-hidden w-full">
    <div className="flex gap-2 triangle-slide-1 w-max">
      {[...Array(60), ...Array(60)].map((_, i) => ( // Duplicated strip
        <div
          key={`t1-${i}`}
          className="w-5 h-5 rotate-45 even:bg-tuaGreen/40 odd:bg-tuaGreen/60 translate-y-1/2 shrink-0"
        />
      ))}
    </div>
  </div>

  {/* Second stripe */}
  <div className="overflow-hidden w-full -translate-y-1">
    <div className="flex gap-2 triangle-slide-2 w-max">
      {[...Array(60), ...Array(60)].map((_, i) => ( // Duplicated strip
        <div
          key={`t2-${i}`}
          className="w-5 h-5 rotate-45 even:bg-tuaGreen/40 odd:bg-tuaGreen/60 translate-y-1/2 shrink-0"
        />
      ))}
    </div>
  </div>

  {/* Third stripe */}
  <div className="overflow-hidden w-full -translate-y-2">
    <div className="flex gap-2 triangle-slide-1 w-max">
      {[...Array(60), ...Array(60)].map((_, i) => ( // Duplicated strip
        <div
          key={`t3-${i}`}
          className="w-5 h-5 rotate-45 even:bg-tuaGreen/40 odd:bg-tuaGreen/60 translate-y-1/2 shrink-0"
        />
      ))}
    </div>
  </div>
</div>
    </div>
    <div className="container mx-auto">
      <p className="text-tuaGreen font-semibold tracking-wide text-xl mt-2">Biglietto integrato a tempo unico</p>
      <p className="text-sm mt-2">
        Il titolo consente viaggi illimitati nell'arco di 90 minuti dall'orario di attivazione nell'area metropolitana di Pescara e Chieti.
      </p>
      <div className="bg-[#50c79d] w-full p-2 text-white rounded-md mt-4">
        <p className="text-sm font-medium">Time remaining:</p>
        <p className="text-xl tracking-wide">{ timeFormat(timeRemaining, false) }</p>
      </div>
      <div className="bg-[#ececec] w-full p-2 rounded-md mt-2">
        <p className="text-sm font-medium">Activated on:</p>
        <p className="text-xl tracking-wide">{ timeFormat(START_TIME, true, true) }</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="font-semibold text-lg tracking-wide">Price</p>
        <p className="font-semibold text-xl text-tuaGreen tracking-wide">€1,40</p>
      </div>
      <p className="text-end font-bold text-lg mt-2">#17321/1721419</p>
      <p className="text-sm mt-4 pb-20">
        Il biglietto elettronico B.1.T consente di viaggiare su tutte le linee di TU4 (ex 4RP4 e ex GMT) e del gruppo La Panoramica al'interno dell'area metropolitana di Pescara e Chieti, denominata UN1CO. Il titolo va attivato prima di salire sul mezzo
      </p>
    </div>
  </div>
)
}

export default Ticket