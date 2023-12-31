import Head from 'next/head';
import LandingPage from '@components/LandingPage';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>CSM Dashboard</title>
        <meta
          name="description"
          content="CSM Dashboard for generating 3d models from image"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LandingPage />
      </main>
    </>
  );
}
