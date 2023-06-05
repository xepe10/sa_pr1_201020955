import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import { Menu } from 'react-admin';
import { Can } from './Can';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);
    const [showNavbar, setShowNavbar] = useState(false);
    const [location, setLocation] = useState(false);

    useEffect(() => {
        window.addEventListener("hashchange", (obj)=>{
            setLocation(`${window.location.pathname}${window.location.hash}`);
        }, false);
        setLocation(`${window.location.pathname}${window.location.hash}`);
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        // userService.logout();
    }

    // only show nav when logged in
    // if (!user) return null;
    
    return (
        <header>
            <nav id="sidebarMenu" className={`collapse d-lg-block sidebar collapse bg-white ${showNavbar?`show`:''}`}>
                <div className="position-sticky">
                    <div className="list-group list-group-flush mx-3 mt-4">
                        <NavLink href="/" exact className={`list-group-item list-group-item-action py-2 ripple ${location=='/'?`active`:``}`}>
                            <i className="fas fa-home-alt fa-fw me-2"></i>Pokemons REST
                        </NavLink>
                        <NavLink href="/soap" exact className={`list-group-item list-group-item-action py-2 ripple ${location=='/soap'?`active`:``}`}>
                            <i className="fas fa-home-alt fa-fw me-2"></i>Marvel SOAP
                        </NavLink>                      
                    </div>
                </div>
            </nav>
            <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" onClick={(e)=>{setShowNavbar(!showNavbar)}}
                        aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        {showNavbar ? 
                            <i className="fas fa-times"></i>
                        :
                            <i className="fas fa-bars"></i>
                        }
                    </button>
                    <a className="navbar-brand" href="#">
                        <h3>Software Avanzado</h3>
                    </a>
                    
                    
                </div>
            </nav>
        </header>
    );
}