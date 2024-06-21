import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-white text-xl font-bold">
              Event Manager
            </Link>
          </div>

          <ul className="flex space-x-4">
            <li>
              <Link href="/events" className="text-white hover:text-gray-300">
                Events
              </Link>
            </li>
            <li>
              <Link href="/venues" className="text-white hover:text-gray-300">
                Venues
              </Link>
            </li>
            <li>
              <Link
                href="/equipment"
                className="text-white hover:text-gray-300"
              >
                Equipment
              </Link>
            </li>
            <li>
              <Link
                href="/personnel"
                className="text-white hover:text-gray-300"
              >
                Personnel
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
