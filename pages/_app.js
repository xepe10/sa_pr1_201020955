import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/mdb.min.css';
import 'styles/globals.css';

import { userService, alertService, logService } from 'services';
import { Nav, Alert } from 'components';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [pathUrl, setPathUrl] = useState('');
    const [publicPathsUrl, setPublicPathsUrl] = useState('');

    useEffect(() => {

    }, []);


    return (
        <>
            <Head>
                <title>Software Avanzado</title>
                
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
                <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                <main style={{"marginTop": "58px"}}>
                    <div className={`${!publicPathsUrl.includes(pathUrl) ? `container pt-5` : 'w-100'}`}>
                        <Component {...pageProps} />
                    </div>
                </main>
            </div>
        </>
    );
}
