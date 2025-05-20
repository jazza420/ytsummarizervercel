import Link from 'next/link';
import { Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="w-full py-10 p-3 ">
        <div className="grid grid-cols-1 gap-32 md:grid-cols-4 ">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-blue-600">{process.env.NEXT_PUBLIC_APPNAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {process.env.NEXT_PUBLIC_APPNAME} is a browser extension that uses AI to summarize YouTube videos
              {/* , making it easier for you to get the information you need quickly and efficiently. */}
            </p>
          </div>

          <div >
            <h3 className="text-sm font-medium mb-3">Product</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Support</h3>
            <ul className="flex flex-col gap-2">
              {/* <li>
                <Link href="/documentation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/privacypolicy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/termsofservice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              {/* <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t mt-8 pt-8">
          <p className="text-xs text-muted-foreground">
            © 2025 {process.env.NEXT_PUBLIC_APPNAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}