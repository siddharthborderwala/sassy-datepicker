import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'nextra-theme-docs/style.css';
import 'sassy-datepicker/styles.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.goatcounter) {
      window.goatcounter.count({
        path: router.asPath,
      });
    }
  }, [router]);

  return <Component {...pageProps} />;
}
