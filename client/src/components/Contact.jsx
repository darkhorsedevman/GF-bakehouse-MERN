import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import brownCake from "../imgs/contact/brown-floral.jpg";
import lavenderCake from "../imgs/contact/lavender-butterflies.jpg";
import greenCake from "../imgs/contact/green-with-rose.jpg";


// Styles 
import "../sass/components/contactComp.scss";

// Sweet Alert 
import swal from "sweetalert";

// need client create account with emailjs
const serviceId = "";
const templateId = "";
const publicKey = "";

/* Importing the motion library from framer-motion. */
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Checks if name is empty
    if (form.current[0].value === "") {
      swal({
        text: "Please add your name!"
      });

      return;
    }

    // Checks if email is empty
    if (form.current[1].value === "") {
      swal({
        text: "Please add your email!"
      });

      return;
    }

    // Checks if message is empty
    if (form.current[2].value === "") {
      swal({
        text: "Please give us a message!"
      });

      return;
    }

    // (Temporarily here for testing)
    resetForm();

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      (result) => {
        console.log(result.text);
        console.log("Sent!");
        swal({
          text: "Message was successfully sent!"
        });

        // Call the Reset Function 
        resetForm();

      },
      (error) => {
        console.log(error.text);
        swal({
          text: "Uh oh!, An unexpected error occurred."
        });
      }
    );
  };

  // Function to reset form 
  function resetForm() {

    // after 900ms reset form 
    setTimeout(() => {
      // reset name value 
      form.current[0].value = "";

      // reset email value 
      form.current[1].value = "";

      // reset Message value 
      form.current[2].value = "";

      // Close the Form 
      window.location.href = "#";
    }, 900);
  }

  return (

    // need to move this anchor to navbar contact
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.23 }}
      exit={{ opacity: 0 }}
      className="page" >
      <div className="contact-content">
        <h2>Contact</h2>
        <p>Thank you for your interest in Daisy&#39;s Cakes! Where every cake is guarenteed to be made with love. Please click on the inquire form below and we&#39;ll get back to you as soon we can!</p>
        <div className="contact-img-container">
          <img src={lavenderCake} alt="lavender cake" />
          <img src={brownCake} alt="brown cake" />
          <img src={greenCake} alt="green cake" />
        </div>
      </div>

      <div className="inquire-button-container">
        <a href="#popup1" id="inquireBtn">Inquire Form</a>
      </div>
      <div id="popup1" className="popup-overlay">
        <div className="popup">
          <h2>Contact Us!</h2>
          <a className="close" href="#">&times;</a>
          <div className="content">
            {/* Contact Form  */}
            <form ref={form} onSubmit={sendEmail}>
              {/* Form Name */}
              <label>Name</label>
              <input type="text" name="user_name" placeholder="John Doe" />
              {/* Form Email */}
              <label>Email</label>
              <input type="email" name="user_email" placeholder="john@gmail.com" />
              {/* Form Message */}
              <label>Message</label>
              <textarea name="message" maxLength="750" placeholder="Add your message..." />
              {/* Form Send Button */}
              <input className="contact-send" type="submit" value="Send" />
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;