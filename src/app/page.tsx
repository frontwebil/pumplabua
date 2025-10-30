export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-black font-sans">
      <main className="flex flex-col items-center justify-center text-center px-8 py-16">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          🛠️ Ведуться технічні роботи
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-400 max-w-md mb-8">
          Ми оновлюємо сайт, щоб зробити його ще кращим. Будь ласка, поверніться
          трохи пізніше — сайт скоро запрацює!
        </p>
      </main>
    </div>
  );
}
