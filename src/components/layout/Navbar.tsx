import { useState } from "react";
import { Menu, Search, Bell, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Tech",
  "Healthcare",
  "Politics",
  "Business",
  "Finance",
  "Accounting",
  "Startups",
  "Global",
  "Markets",
  "Sports",
  "Geopolitics",
  "Opinion"
];

interface NavbarProps {
  selectedCategory?: string | null;
  setSelectedCategory?: (category: string | null) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Navbar = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }: NavbarProps) => {
  const navigate = useNavigate();
  const today = new Date();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(today);

  return (
    <header className="flex flex-col bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg shadow-black/5">
      {/*  TOP ROW */}
      <div className="flex items-center justify-between px-6 py-3 relative">
        
        {/* LEFT: Icons & Search */}
        <div className="flex items-center gap-2 md:gap-4 text-slate-900">
          <button className="hover:opacity-70 transition-opacity">
            <Menu className="w-6 h-6" strokeWidth={2.5} />
          </button>
          
          {/* Search Toggle */}
          <div className={cn(
            "flex items-center transition-all duration-300 ease-in-out",
            (isSearchOpen || searchQuery) ? "w-[200px] md:w-[240px]" : "w-8"
          )}>
            {(isSearchOpen || searchQuery) ? (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2.5} />
                <Input 
                  autoFocus={isSearchOpen}
                  className="pl-9 pr-8 h-9 bg-slate-50 border-slate-200 rounded-full focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all font-medium text-xs placeholder:text-slate-400"
                  placeholder="Search articles..."
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false);
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      if (setSearchQuery) setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-slate-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3 text-slate-400" />
                  </button>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-70 transition-opacity flex items-center justify-center w-8 h-8"
              >
                <Search className="w-5 h-5" strokeWidth={2.5} />
              </button>
            )}
          </div>

          <button className="hover:opacity-70 transition-opacity">
             <Bell className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* CENTER: Brand Logo */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/blogs")}
        >
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tighter text-black font-serif">
            CA MONK
          </h1>
        </div>

        {/* RIGHT: Create Button */}
        <div>
          <Button 
            onClick={() => navigate("/create")}
            className={cn(
              "rounded-full bg-black text-white hover:bg-slate-800 font-semibold text-sm transition-all",
              "w-8 h-8 p-0 flex items-center justify-center", // Mobile: Icon only
              "md:w-auto md:h-10 md:px-6" // Desktop: Full text
            )}
          >
            <Plus className="w-4 h-4 md:hidden" />
            <span className="hidden md:inline">Create New Blog</span>
          </Button>
        </div>
      </div>

      {/* DIVIDER  */}
      <div className="border-b border-dotted border-slate-300 mx-6" />

      {/* BOTTOM ROW (Date & Categories) */}
      <div className="flex items-center gap-8 px-6 py-2 overflow-hidden">
        
        {/* Date Section */}
        <div className="flex flex-col shrink-0">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            {formattedDate.split(',')[0]}
          </span>
          <span className="text-xs text-slate-500">
            {formattedDate.split(',').slice(1).join(',')}
          </span>
        </div>

        {/* Categories Scrollable List */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mask-gradient w-full">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory?.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => {
                  if (setSelectedCategory) {
                    setSelectedCategory(isSelected ? null : cat);
                  }
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                  isSelected 
                    ? "bg-black text-white hover:bg-black/90" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900",
                  "border border-slate-200/50" 
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};