import Head from "next/head";
import AdManager from "../components/AdManager";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Ad Manager</title>
      </Head>
      <AdManager />
    </>
  );
}