
import { useState } from 'react';
import { Link } from 'react-router'
import useContact from "../../api/contactApi";
import style from "./Contact.module.css";



export default function Contact() {
    const { sendMessage, isAuthenticated } = useContact();  
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            setSubmitStatus({ success: false, message: 'You must be logged in to send messages' });
            return;
        }

        if (!message.trim()) {
            setSubmitStatus({ success: false, message: 'Message cannot be empty' });
             
            return;
        }

        setIsSubmitting(true);
        
        try {
            await sendMessage({ 
                name, 
                message,
            });
            setSubmitStatus({ success: true, message: 'Message sent successfully!' });
            setName('');
            setMessage('');
        } catch (error) {
            setSubmitStatus({ 
                success: false, 
                message: error.message || 'Failed to send message' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={style.contact}>
            <div className={style.content}>
                <h2>Contact Recipe Studio</h2>
                <p>Have questions or feedback? Our team is happy to help!</p>
            </div>

            <div className={style.container}>
                <div className={style.contactInfo}>
                    <div className={style.box}>
                        <div className={style.icon}><i className="fa-solid fa-phone"></i></div>
                        <div className={style.text}>
                            <h3>Phone</h3>
                            <p>7000-7000-7000</p>
                        </div>
                    </div>
                    <div className={style.box}>
                        <div className={style.icon}><i className="fa-solid fa-envelope"></i></div>
                        <div className={style.text}>
                            <h3>Email</h3>
                            <p>recipeStudio@abv.bg</p>
                        </div>
                    </div>
                </div>

                <div className={style.contactForm}>
                    <form onSubmit={handleSubmit}>
                        <h3>Send Us a Message</h3>
                        
                        {submitStatus && (
                            <p style={{ 
                                color: submitStatus.success ? '#1a1a1a' : '#bf9343',
                                marginBottom: '15px'
                            }}>
                                {submitStatus.message}
                            </p>
                        )}

                        <div className={style.inputBox}>
                            <input 
                                type="text" 
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={!isAuthenticated || isSubmitting}
                            />
                            <span>Your Name</span>
                        </div>

                        <div className={style.inputBox}>
                            <textarea
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                disabled={!isAuthenticated || isSubmitting}
                            />
                            <span>Your Message *</span>
                        </div>

                        <div className={style.inputBox}>
                            <input 
                                type="submit" 
                                value={isSubmitting ? "Sending..." : "Send"}
                                disabled={isSubmitting || !isAuthenticated}
                            />
                        </div>

                        {!isAuthenticated && (
                            <div>
                                <p style={{color: '#1a1a1a'}}>
                                    <i className="fa-solid fa-info-circle" style={{ color: '#bf9343' }}></i> You need to{' '}
                                    <Link to="/login" style={{fontStyle: "italic"}}   
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}>log in</Link> to send messages
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}