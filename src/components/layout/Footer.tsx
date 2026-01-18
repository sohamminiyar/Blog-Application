import { GraduationCap, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B0D17] text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 pr-4">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-white p-1 rounded-md">
                <GraduationCap className="w-5 h-5 text-[#0B0D17]" />
              </div>
              <span className="text-xl font-bold tracking-tight">CA MONK</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering the next generation of financial leaders with tools, community, and knowledge.
            </p>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Divider & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 CA Monk. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}