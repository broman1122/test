import Image from "next/image"
import Link from "next/link"
import { Instagram, MapPin, Phone, Mail } from "lucide-react"

// Facebook icon component
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

// TikTok icon component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  )
}

const footerLinks = {
  quickLinks: [
    { label: "Hem", href: "#hem" },
    { label: "Meny", href: "#meny" },
    { label: "Om Oss", href: "#om-oss" },
    { label: "Hitta Oss", href: "#hitta-oss" },
    { label: "Kontakt", href: "#kontakt" },
    { label: "Admin Panel", href: "/admin" },
  ],
  menu: [
    { label: "Pizza", href: "#meny" },
    { label: "Burgare", href: "#meny" },
    { label: "Tillbehör", href: "#meny" },
    { label: "Dryck", href: "#meny" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/take_and_go1?igsh=MTZqazY2bnVxYjkyaw==", label: "Instagram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/share/14T1WkU2zjw/", label: "Facebook" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@take.and.go3?_r=1&_t=ZS-93eMlJIQObF", label: "TikTok" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-28 h-28">
                <Image
                  src="/images/logo.png"
                  alt="Take & Go Falkenberg"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-background/70 mb-6 leading-relaxed text-sm">
              Falkenbergs favorit food truck!
              Äkta italiensk pizza och saftiga burgare, tillagade med kärlek. 🍕🍔
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background font-bold text-lg mb-6">Snabblänkar</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-background font-bold text-lg mb-6">Meny</h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-bold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  Stortorget<br />
                  311 31 Falkenberg<br />
                  Sverige
                </span>
              </li>
              <li>
                <Link href="tel:0722562660" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">0722-562660</span>
                </Link>
              </li>
              <li>
                <Link href="mailto:take.and.go.f@gmail.com" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">take.and.go.f@gmail.com</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              &copy; {new Date().getFullYear()} Take & Go Falkenberg. Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center gap-4 text-sm text-background/50">
              <span>Pizza</span>
              <span className="text-primary">|</span>
              <span>Burgare</span>
              <span className="text-primary">|</span>
              <span>Take & Go</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
