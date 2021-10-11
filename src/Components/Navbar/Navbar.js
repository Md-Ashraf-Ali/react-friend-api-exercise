import React from 'react';



const Navbar = () => {
    return (
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
                <a className="navbar-brand ms-5 "  href="/navbar">Navbar</a>
               
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                   <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item ms-5">
                            <a class="nav-a active mr-5" aria-current="page" href="/home">Home</a>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-a mr-5" href="/about">About</a>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-a mr-5" href="/contact">Contact</a>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-a mr-5" href="/login">Login</a>
                        </li>
                   </ul>
                </div>
            </div>
        </nav>
    
    );
};

export default Navbar;