export default function NavBar() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 text-center py-6 border-t border-zinc-800 mt-12">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Empire Store. All rights reserved.
      </p>
    </footer>
  );
}
