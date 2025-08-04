import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
function Home() {
    return (
        <div>
            <Navbar />
            <div className="home">
                <div className="hero">
                    <h1>Welcome to Parking Reservation Portal</h1>
                    <p>Reserve your parking spot today and save time and money!</p>
                    
                </div>
                <div className="info">
                    <h2>Why Choose Our Parking Reservation Service?</h2>
                    <div className="card">
                        <h3>Convenient</h3>
                        <p>Reserve your spot ahead of time to avoid the hassle of finding parking.</p>
                    </div>
                    <div className="card">
                        <h3>Efficient</h3>
                        <p>Reserve seat with your comform from anywhere at any time.</p>
                    </div>
                    <div className="card">
                        <h3>Secure</h3>
                        <p>Our parking lots are safe and secure, giving you peace of mind while you park.</p>
                    </div>
                </div>
            </div>
            <Footer/>
           </div>
         )
 }
 export default Home 

