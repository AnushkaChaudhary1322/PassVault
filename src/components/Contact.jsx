import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-950 to-sky-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-sky-800 p-8 rounded-2xl shadow-2xl transition-all duration-500">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-yellow-300">
          📞 Contact Us
        </h1>

        <p className="text-lg mb-6 text-center">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to chat cricket, we’re all ears.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2950/2950689.png"
            alt="Contact Illustration"
            className="w-full max-w-sm mx-auto transition-transform duration-300 hover:scale-105"
          />

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg text-black text-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg text-black text-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-lg text-black text-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            ></textarea>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 transition-colors px-6 py-2 rounded-xl text-lg font-semibold shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
