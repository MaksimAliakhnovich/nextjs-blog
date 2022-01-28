import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { AppContext } from './_app';
import { USER_INFO_KEY } from '../constants/common'
import { localStorageGetItem, localStorageMergeItem } from '../utils/localStorage'

export async function getStaticProps() {
    const allPostsData = await getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Home({ allPostsData }) {
    const { context, setContext } = useContext(AppContext)
    const about = context.about || 'About yourself'

    useEffect(() => {
        const { about: storedAbout } = localStorageGetItem(USER_INFO_KEY) || {}

        if (storedAbout) {
            setContext((prev) => ({ ...prev, about: storedAbout }))
        }
    }, [])

    const handleClickAbout = () => {
        const { about: storedAbout } = localStorageGetItem(USER_INFO_KEY) || {}

        if (!storedAbout) {
            const newAbout = prompt('Пара слов о себе')
            localStorageMergeItem(USER_INFO_KEY, { about: newAbout })
            setContext((prev) => ({ ...prev, about: newAbout }))
        } else {
            alert('Хватит жмякать!')
        }
    }

    return (
        <Layout home>
            <Head>
                <title>{ siteTitle }</title>
            </Head>
            <section className={ utilStyles.headingMd }>
                <p onClick={ handleClickAbout }>{ about }</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{ ' ' }
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={ `${utilStyles.headingMd} ${utilStyles.padding1px}` }>
                <h2 className={ utilStyles.headingLg }>Blog</h2>
                <ul className={ utilStyles.list }>
                    { allPostsData.map(({ id, date, title }) => (
                        <li className={ utilStyles.listItem } key={ id }>
                            <Link href={ `/posts/${id}` }>
                                <a>{ title }</a>
                            </Link>
                            <br />
                            <small className={ utilStyles.lightText }>
                                <Date dateString={ date } />
                            </small>
                        </li>
                    )) }
                </ul>
            </section>
        </Layout>
    )
}
