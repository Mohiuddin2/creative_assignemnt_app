import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (

    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <Link href="#" className="link link-hover">Branding</Link>
        <Link href="#" className="link link-hover">Design</Link>
        <Link href="#" className="link link-hover">Marketing</Link>
        <Link href="#" className="link link-hover">Advertisement</Link>
      </div> 
      <div>
        <span className="footer-title">Company</span>
        <Link href="#" className="link link-hover">About us</Link>
        <Link href="#" className="link link-hover">Contact</Link>
        <Link href="#" className="link link-hover">Jobs</Link>
        <Link href="#" className="link link-hover">Press kit</Link>
      </div> 
      <div>
        <span className="footer-title">Legal</span>
        <Link href="#" className="link link-hover">Terms of use</Link>
        <Link href="#" className="link link-hover">Privacy policy</Link>
        <Link href="#" className="link link-hover">Cookie policy</Link>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
        <Link href="#" className="text-xl"><FaXTwitter /></Link>
        <Link href="#" className="text-xl"><FaFacebook /></Link>
        </div>
      </div>
    </footer>
    
  );
}

export default Footer;
