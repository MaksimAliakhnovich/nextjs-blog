import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { USER_INFO_KEY } from '../constants/common'
import { useContext, useEffect } from 'react'
import { AppContext } from '../pages/_app'
import { localStorageGetItem, localStorageMergeItem } from '../utils/localStorage'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
    const { context, setContext } = useContext(AppContext)
    const name = context.name || 'Your name'

    useEffect(() => {
        const { name: storedName } = localStorageGetItem(USER_INFO_KEY) || {}

        if (storedName) {
            setContext((prev) => ({ ...prev, name: storedName }))
        }
    }, [])

    const handleClickName = () => {
        const { name: storedName } = localStorageGetItem(USER_INFO_KEY) || {}

        if (!storedName) {
            const newName = prompt('Ваше имя?')
            localStorageMergeItem(USER_INFO_KEY, { name: newName })
            setContext((prev) => ({ ...prev, name: newName }))
        } else {
            alert('Хватит жмякать!')
        }
    }

    return (
        <div className={ styles.container }>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={ `https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg` }
                />
                <meta name="og:title" content={ siteTitle } />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={ styles.header }>
                { home ? (
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={ utilStyles.borderCircle }
                            height={ 144 }
                            width={ 144 }
                            alt={ name }
                        />
                        <h1 className={ utilStyles.heading2Xl } onClick={ handleClickName }>{ name }</h1>
                        { (context.name && context.about) && <span className={ styles.success }>Вы восхитительны!</span> }
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.jpg"
                                    className={ utilStyles.borderCircle }
                                    height={ 108 }
                                    width={ 108 }
                                    alt={ name }
                                />
                            </a>
                        </Link>
                        <h2 className={ utilStyles.headingLg }>
                            <Link href="/">
                                <a className={ utilStyles.colorInherit }>{ name }</a>
                            </Link>
                        </h2>
                    </>
                ) }
            </header>
            <main>{ children }</main>
            { !home && (
                <div className={ styles.backToHome }>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            ) }
        </div>
    )
}
