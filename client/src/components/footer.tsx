import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container px-4 py-12 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-base mb-4">LabourConnect</h3>
            <p className="text-sm text-muted-foreground">
              India's pan-India marketplace connecting customers with skilled technicians across 100+ categories.
            </p>
          </div>

          {/* Empty slot for grid alignment */}
          <div style={{ display: 'none' }}></div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-base mb-4">Company</h3>
            <p className="text-sm text-muted-foreground">
              India's leading marketplace connecting customers with skilled technicians across 100+ categories. Fast, reliable, and affordable services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Technicians
                </a>
              </li>
              <li>
                <a href="#post-job" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#become-technician" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Become a Technician
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h3 className="font-semibold text-base mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/safety-guidelines" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href="mailto:support@labourconnect.in" className="text-sm text-primary hover:underline">
                    support@labourconnect.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a href="tel:+919910710219" className="text-sm text-primary hover:underline">
                    +91 9910710219
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm">Pan-India Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border py-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} LabourConnect. All rights reserved. | Connecting India's skilled workforce
          </p>
          <div className="flex items-center gap-6">
            <a href="#twitter" className="text-muted-foreground hover:text-primary transition-colors" title="Twitter">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-5 9-5"/>
              </svg>
            </a>
            <a href="#facebook" className="text-muted-foreground hover:text-primary transition-colors" title="Facebook">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="#linkedin" className="text-muted-foreground hover:text-primary transition-colors" title="LinkedIn">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#whatsapp" className="text-muted-foreground hover:text-primary transition-colors" title="WhatsApp">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 3.5A11.5 11.5 0 1 0 12 23a11.3 11.3 0 0 0 6.2-1.8l3.4 1-1-3.3A11.3 11.3 0 0 0 23 12 11.5 11.5 0 0 0 20.5 3.5zm-8.5 16.2a9.6 9.6 0 0 1-5.2-1.5l-.4-.3-3.1.9.9-3.1-.3-.4A9.6 9.6 0 1 1 12 19.7z"/>
                <path d="M17.6 14.2c-.3-.1-1.8-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.9-.3-3.1-1.8-4.1-3.2-.3-.4.3-.4 1.1-1.4.1-.2.1-.4 0-.6-.1-.2-1-2.4-1.3-3.1-.3-.7-.6-.6-.8-.6-.3 0-.5 0-.8 0-.3 0-.7.1-1.1.7-.4.7-1.4 2.3-1.4 4.5 0 2.2 1.4 4.3 1.6 4.6.2.3 2.7 4.3 6.8 5.9 4.1 1.6 4.1 1 4.8.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.7-.4z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-2">
            We operate across India with verified technicians in 100+ service categories
          </p>
          <p className="text-xs text-muted-foreground">
            Secure payments • Real-time tracking • Verified professionals • Customer support 24/7
          </p>
        </div>
      </div>
    </footer>
  );
}
