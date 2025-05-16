import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-slate-200 py-2 lg:py-4">
      <nav className="py-sectionPaddingYCompact px-sectionPaddingX" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading">
            MyApp
          </Link>
          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li>
              <Link href="/features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}