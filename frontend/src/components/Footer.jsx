import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left px-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold">Job Portal</h2>
          <p className="text-gray-400 mt-2">Innovating for a better future.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold">Follow Us</h2>
          <div className="flex justify-center md:justify-start mt-2 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35C.596 0 0 .596 0 1.325v21.351C0 23.404.596 24 1.325 24h11.492v-9.294H9.69V11.29h3.127V8.414c0-3.1 1.893-4.788 4.66-4.788 1.324 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.588l-.467 3.417h-3.121V24h6.116c.729 0 1.325-.596 1.325-1.324V1.325C24 .596 23.404 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.556a9.868 9.868 0 0 1-2.828.775A4.93 4.93 0 0 0 23.337 3.1a9.865 9.865 0 0 1-3.127 1.196 4.919 4.919 0 0 0-8.384 4.482 13.94 13.94 0 0 1-10.125-5.13 4.822 4.822 0 0 0 1.524 6.56A4.903 4.903 0 0 1 .96 9.33v.063a4.918 4.918 0 0 0 3.942 4.818 4.902 4.902 0 0 1-2.21.084 4.923 4.923 0 0 0 4.6 3.417A9.875 9.875 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.056 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.636A9.993 9.993 0 0 0 24 4.556z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-6">© 2025 Novem Controls. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
