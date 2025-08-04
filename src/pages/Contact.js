import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && email && phone)
        setSubmitted(true);
        else 
        alert("Input entries!!")
        //API Request
    };
    return (
        <div>
            <Navbar />
            <h1 className="contact-heading">Contact Us</h1>
            <div className="contact">
            

                <div className="social-links">
                    
                    <table className="contact-social-table">
                        <th><h2>Social Media Handles</h2></th>
                        <tr><a href="https://twitter.com/kpmg" target="_blank" rel="noopener noreferrer"><img src={require("../images/twitterlogo.png")}width="10%" alt="TwitterLogo" /></a><br/></tr>
                        <tr><a href="https://www.linkedin.com/company/kpmgindia/mycompany/verification/" target="_blank" rel="noopener noreferrer"><img src={require("../images/LinkedinLogo.png")}width="20%" alt="LinkedinLogo" /></a></tr>
                        <tr><a href="https://www.kpmg.com" target="_blank" rel="noopener noreferrer"><img src={require("../images/KpmgLogo.png")}width="30%" alt="CompanyLogo" /></a></tr>
                    </table>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" 
                            id="name" value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" 
                            id="email" value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" >Contact Number:</label>
                            <input type="tel" 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}  
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="comment" >Comment:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                name="comment"
                            />
                        </div>
                        <button className="contact--submit">Submit</button>
                    </form>
                    {submitted && <p>Thank you for your submission!</p>}
                </div>

                
            </div>
            <Footer />
        </div>
    )
}
export default Contact

