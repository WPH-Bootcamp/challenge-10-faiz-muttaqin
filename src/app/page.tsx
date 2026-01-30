/**
 * Home Page
 * 
 * TODO: Implement homepage sesuai dengan design Figma
 * - Tampilkan daftar artikel blog
 * - Implement search/filter jika diperlukan
 * - Handle loading dan error states
 */

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog App</h1>
        
        {/* TODO: Implement blog posts list here */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recommended Posts</h2>
            {/* Recommended posts will be displayed here */}
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Most Liked Posts</h2>
            {/* Most liked posts will be displayed here */}
          </section>
        </div>
        </div>
      </main>
    </div>
  );
}
