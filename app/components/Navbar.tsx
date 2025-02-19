'use client'
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
          <span className="md:hidden"><span className='text-red-700'><span className='text-4xl'>C</span>reative</span> <span className='text-sm'>ASA</span></span> {/* Mobile view: "Creative" */}
          <span className="hidden md:inline"><span className='text-red-700'><span className='text-4xl'>C</span>reative</span> <span className='text-sm'>Assignment Submission App</span></span> {/* Desktop view: Full text */}
        </Link>
      </div>
      <div className="flex-none">
        <div className="hidden md:flex"> {/* Desktop Navigation */}
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/assignments">Assignments</Link></li>
            <li><Link href="/submit">Submit Ass.</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li>
              {/* Conditional Sign In/Out button */}
              {/* Replace with your actual authentication logic */}
              {/* Example: */}
              {/* {isAuthenticated ? (
                <button className="btn btn-outline">Sign Out</button>
              ) : (
                <Link href="/signin" className="btn btn-outline">Sign In</Link>
              )} */}
              <Link href="/signin" className="btn btn-outline">Sign In</Link> {/* Placeholder */}

            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="btn btn-square btn-ghost" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-full md:hidden bg-base-100 shadow-lg rounded-box">
          <ul className="menu menu-vertical px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/assignments">Assignments</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/signin" className="btn btn-outline w-full">Sign In</Link></li> {/* Mobile Sign In/Out */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;