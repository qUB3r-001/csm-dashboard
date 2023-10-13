import Nextlink from 'next/link';
import { Button, Link } from '@chakra-ui/react';
import { GoLinkExternal } from 'react-icons/go';
import LandingPageLayout from '@layouts/LandingPageLayout';

function LandingPage() {
  return (
    <LandingPageLayout>
      <Link href="/dashboard" as={Nextlink}>
        <Button rightIcon={<GoLinkExternal />}>Go to dashboard</Button>
      </Link>
    </LandingPageLayout>
  );
}

export default LandingPage;
