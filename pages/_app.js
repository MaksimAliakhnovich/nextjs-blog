import { createContext, useState } from 'react';
import '../styles/global.css'

export const AppContext = createContext({});
export default function App({ Component, pageProps }) {
    const [context, setContext] = useState({})
    return (
        <AppContext.Provider value={ { context, setContext } }>
            <Component { ...pageProps } />
        </AppContext.Provider>
    );
}
