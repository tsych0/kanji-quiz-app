import Head from 'next/head';
import KanjiApp from '../components/KanjiApp'; // Adjust path if needed

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kanji Study Tool</title>
        <meta name="description" content="Learn and quiz yourself on Kanji!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-8"> {/* Add some top padding */}
        <KanjiApp />
      </main>

      <footer className="text-center text-gray-500 text-sm p-4 mt-8">
        Kanji Study App
      </footer>
    </div>
  );
}