import privateImage from 'assets/images/illustration-notfound.jpg'
import { Layout } from 'components'
import React from 'react'

export default function NotFoundMember({ history }) {
    return (
        <Layout title="Not Found">
            <section className="h-screen flex flex-col items-center">
                <img src={privateImage} alt="Ooops we lost you" />
                <h1 className="text-3xl text-gray-900 mt-12">
                    Opps! We’re lost
                </h1>
                <p className="text-lg text-gray-600 mt-4 mtb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center">
                    The page that you requested is not found in our system
                </p>
                <button
                    onClick={() => history.goBack}
                    className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5"
                >
                    Back to home
                </button>
            </section>
        </Layout>
    )
}
