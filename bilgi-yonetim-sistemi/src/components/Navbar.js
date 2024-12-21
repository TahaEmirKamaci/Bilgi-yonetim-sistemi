import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link href="/student">Ogrenci Sayfasi</Link></li>
        <li><Link href="/teacher">Ogretmen Sayfası</Link></li>
        <li><Link href="/login">Cikis Yap</Link></li>
      </ul>
    </nav>
  );
}
