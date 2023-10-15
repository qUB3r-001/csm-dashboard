import Dashboard from '@components/Dashboard';
import { ImageEditorProvider } from '@hooks/useImageEditor';
import DashboardLayout from '@layouts/DashboardLayout';
import Head from 'next/head';

export default function DashboardPage() {
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
        <DashboardLayout>
          <ImageEditorProvider>
            <Dashboard />
          </ImageEditorProvider>
        </DashboardLayout>
      </main>
    </>
  );
}
