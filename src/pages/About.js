import React from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import "../images/Screenshot.png"

function About() {
    return (
        <div>
            <Navbar />
            <div className="About">
            <div className="about-us-header">
                <h1>About Us</h1>

                <p> We are a team of dedicated professionals committed to making your parking
                    experience hassle-free. Our mission is to provide you with a simple and
                    convenient way to find and reserve your parking spot.
                </p>

            </div>

            <div className="about-us-overview">

                <h2>Our Story</h2>

                <p> We are a team of dedicated professionals committed to making your parking
                    experience hassle-free. Our mission is to provide you with a simple and
                    convenient way to find and reserve your parking spot.
                </p>

                <p>Our user-friendly website and mobile web app allow you to easily search for
                    available parking spots in your office and reserve your spot,
                    We work with your organization to serve you the best services.
                </p>
            </div>

            <div className="about-us-team">

                <h2 className='Team'>Meet Our Team</h2>

                <div className="team-member">
                    <img src={require("../images/Screenshot.png") }alt="profileImage" />
                    <h3>Akhil Yadav</h3>
                    <p>CEO</p>
                </div>

                <div className="team-member">
                    <img src={require("../images/FemaleProfile.png")} alt="profileImage" />
                    <h3>Harshita Jain</h3>
                    <p>CFO</p>
                </div>

                <div className="team-member">
                    <img src={require("../images/Screenshot.png")} alt="profileImage"/>
                    <h3>Praveen Kumar</h3>
                    <p>CTO</p>
                </div>

                <div className="team-member">
                    <img src={require("../images/Screenshot.png")} alt="profileImage"/>
                    <h3>Aryan Sinha</h3>
                    <p>COO</p>
                </div>

            </div>

            <div className="about-us-testimonials">

                <h2>What Our Users Say</h2>

                <div className="testimonial">
                    <p>"I have been using their parking services for over a year now, and I am extremely satisfied with the level of professionalism and convenience they offer. Highly recommend!"</p>
                    <h4>Aman Kumar</h4>
                </div>

                <div className="testimonial">
                    <p>"I had a great experience with this parking company. The staff was friendly and helpful, and the location was perfect for my needs. Will definitely use again!"</p>
                    <h4>Jyoti Sharma</h4>
                </div>

            </div>

            </div>
            <Footer />
        </div>
    )
}


export default About;