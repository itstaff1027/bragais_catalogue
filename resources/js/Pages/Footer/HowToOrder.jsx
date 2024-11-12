// import { FaFacebookMessenger, FaFacebook, FaSquareInstagram, FaTiktok, FaGlobe } from "react-icons/fa6";
import { useState, useEffect } from 'react'


export default function HowToOrder(){

  return (
    <div className="flex w-full h-auto rounded-xl shadow-xl shadow-slate-600/100 justify-center items-center p-2">
  
      <div className="flex flex-col justify-center items-center w-full h-full p-8 ">
            <div className="flex flex-row justify-center items-center w-1/2 text-center">
                <h1 className="text-lg font-bold">Just message our Official Social Media Platforms and our Phone numbers!</h1>
            </div>
            <div className="flex flex-row justify-center items-center w-full">
                <div className="flex flex-col text-right p-2 w-1/2">
                    <h1 className="text-md font-bold">Bragais Agents</h1>
                    <h1 className="underline underline-offset-2">+63 (917) 173 9409</h1>
                    <h1 className="underline underline-offset-2">+63 (917) 137 4771</h1>
                    <h1 className="underline underline-offset-2">+63 9928888888</h1>
                    <h1 className="text-md font-bold">Bragais Flagship Store</h1>
                    <h1 className="underline underline-offset-2">+63 (917) 175 9409</h1>
                </div>

                <div className="h-full w-2 bg-black">1</div>
                
                <div className="flex flex-col p-2 w-1/2 text-left">
                    <div className="flex flex-row items-center w-full">
                    {/* <FaFacebookMessenger /> &ensp; <Link href="https://www.messenger.com/t/1545670395729721/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0">Direct Message</Link> */}
                    </div>
                <div className="flex flex-row items-center w-full">
                    {/* <FaFacebook /> &ensp; <Link href="https://www.facebook.com/jojobragaisofficial">BRAGAIS SHOES</Link> */}
                </div>
                <div className="flex flex-row items-center w-full">
                    {/* <FaSquareInstagram /> &ensp; <Link href="https://www.instagram.com/jojobragaisofficial/?utm_medium=copy_link">Jojo Bragais</Link> */}
                </div>
                <div className="flex flex-row items-center w-full">
                    {/* <FaTiktok /> &ensp; <Link href="https://www.tiktok.com/@jojobragaisofficial">JOJO BRAGAIS SHOES</Link> */}
                </div>
                <div className="flex flex-row items-center w-full">
                    {/* <FaGlobe /> &ensp; <Link href="https://jojobragais.com/" className="underline underline-offset-2">jojobragais.com</Link> */}
                </div>
            </div>

            </div>
            <div className="flex text-center">
                Our shoes are hand crafted with excellent workers.
            </div>
        </div>
    </div>
  )
}

