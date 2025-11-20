export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">MotoSocial</h1>
      <p className="mt-4 text-xl">Il social network dei motociclisti italiani</p>
      <div className="mt-8 space-x-4">
        <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </a>
        <a href="/signup" className="px-4 py-2 bg-green-500 text-white rounded">
          Registrati
        </a>
      </div>
    </main>
  )
}
