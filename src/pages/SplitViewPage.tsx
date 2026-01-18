import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "@/features/blogs/hooks"; 
import type { Blog } from "@/features/blogs/types"; 
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer"; 
import { 
  ArrowLeft, 
  Share2, 
  Clock, 
  TrendingUp, 
  Cpu,        
  Briefcase,  
  Scale,      
  Globe,      
  Lightbulb   
} from "lucide-react";

// Helper for Category Icons
const getCategoryIcon = (category: string) => {
  const normalize = category.toUpperCase();
  if (normalize.includes("FINANCE")) return <TrendingUp className="w-3 h-3" />;
  if (normalize.includes("TECH")) return <Cpu className="w-3 h-3" />;
  if (normalize.includes("CAREER")) return <Briefcase className="w-3 h-3" />;
  if (normalize.includes("REGULATION")) return <Scale className="w-3 h-3" />;
  if (normalize.includes("STARTUP")) return <Lightbulb className="w-3 h-3" />;
  return <Globe className="w-3 h-3" />; 
};

export default function SplitViewPage() {
  const { data: blogs, isLoading } = useBlogs();
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  // toast hiding after 4 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // 1. SORTING & FILTERING LOGIC
  const sortedBlogs = useMemo(() => {
    if (!blogs) return [];

    let filtered = [...blogs];

    // Filter by Category
    if (selectedCategory) {
      filtered = filtered.filter(b => 
        b.category.some(cat => cat.toUpperCase() === selectedCategory.toUpperCase())
      );
    }

    // Filter by Search Query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(b => 
        (b.title && b.title.toLowerCase().includes(query)) || 
        (b.description && b.description.toLowerCase().includes(query)) ||
        (b.category && b.category.some(cat => cat.toLowerCase().includes(query)))
      );
    }

    return filtered.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [blogs, selectedCategory]);

  useEffect(() => {
    if (sortedBlogs && sortedBlogs.length > 0) {
      if (id) {
        const found = sortedBlogs.find((b) => String(b.id) === id);
        if (found) {
          setActiveBlog(found);
        } else {
          // If ID is valid but filtered out (e.g. wrong category), default to first available
          setActiveBlog(sortedBlogs[0]);
        }
      } else {
        setActiveBlog(sortedBlogs[0]);
      }
    } else {
      setActiveBlog(null);
    }
  }, [id, sortedBlogs]);

  if (isLoading) return <SplitViewSkeleton />;


  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50">
      
      {/* Top Navigation */}
      <Navbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL (30%)*/}
        <aside 
          className={cn(
            "h-full border-r border-slate-200 bg-slate-50 flex flex-col transition-all duration-300",
            "w-full md:w-[35%] lg:w-[30%]",
            id ? "hidden md:flex" : "flex"
          )}
        >
          <div className="p-5">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Latest Articles</h2>
            <p className="text-xs text-slate-500">Stay updated with professional insights</p>
          </div>

          <ScrollArea className="flex-1 px-4 pb-4">
            <div className="space-y-4"> 
{sortedBlogs.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500">
                  <p className="text-sm font-medium">
                    {selectedCategory 
                      ? `No article/blog is present for the "${selectedCategory}" category.`
                      : "No blogs found."}
                  </p>
                  {/* Optional: clear filter button */}
                  {selectedCategory && (
                    <Button 
                      variant="link" 
                      className="mt-2 text-blue-600"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>
              ) : (
                sortedBlogs.map((blog) => {
                const isActive = activeBlog?.id === blog.id;
                const primaryCategory = blog.category[0] || "General";

                return (
                  <div
                    key={blog.id}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                    className={cn(
                      "cursor-pointer p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group",
                      "bg-white shadow-sm hover:shadow-md",
                      isActive 
                        ? "border-blue-200 ring-1 ring-blue-100 bg-blue-50/30" 
                        : "border-slate-100 hover:border-blue-100"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-xl" />
                    )}

                    <div className="flex items-center justify-between mb-3 pl-2">
                      <div className="flex items-center gap-2 text-blue-600">
                        {getCategoryIcon(primaryCategory)}
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {primaryCategory}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className={cn(
                      "font-bold text-base leading-tight mb-2 pl-2 transition-colors",
                      isActive ? "text-blue-900" : "text-slate-900 group-hover:text-blue-700"
                    )}>
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pl-2">
                      {blog.description}
                    </p>
                  </div>
                );
              })
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* RIGHT PANEL (70%) */}
        <main 
          className={cn(
            "h-full flex-1 bg-white overflow-y-auto",
            !id ? "hidden md:block" : "block"
          )}
        >
          {activeBlog ? (
            // Using a React Fragment or div wrapper to hold content + footer
            <div className="flex flex-col min-h-full">
              
              {/* Blog Content Section */}
              <div className="flex-1 pb-10 pt-6 px-6 md:px-10">
                
                {/* Mobile Back Button */}
                <div className="md:hidden sticky top-0 bg-white/95 backdrop-blur border-b p-4 flex items-center gap-2 z-50 mb-4 -mx-6 -mt-6">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/blogs')}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                </div>

                {/* Hero Image Container */}
                <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={activeBlog.coverImage} 
                    alt={activeBlog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/1200x600?text=CA+Monk")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white max-w-4xl">
                    <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-widest text-white/80 uppercase">
                      {activeBlog.category.map((cat: string) => (
                        <span key={cat} className="bg-white/20 backdrop-blur px-2 py-1 rounded">
                          {cat}
                        </span>
                      ))}
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> 5 MIN READ
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
                      {activeBlog.title}
                    </h1>
                  </div>
                </div>

                {/* Content Body */}
                <div className="max-w-4xl mx-auto py-10">
                  <div className="flex items-center justify-between py-6 border-b mb-8">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Arjun Mehta</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Senior Editor</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 rounded-full"
                      onClick={() => {
                        if (activeBlog) {
                          const url = `${window.location.origin}/blogs/${activeBlog.id}`;
                          navigator.clipboard.writeText(url);
                          setShowToast(true);
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>

                  {/* Blog Summary/Abstract */}
                  <div className="mb-8">
                    <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-300 pl-4 py-1">
                      {activeBlog.description}
                    </p>
                  </div>

                  <article className="prose prose-slate prose-lg max-w-none 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900
                    prose-p:text-slate-700 prose-p:leading-8 prose-p:font-light
                    prose-strong:font-bold prose-strong:text-slate-900
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                    {activeBlog.content.split('\n').map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </article>
                </div>
              </div>

              {/* 2. Added Footer Here */}
              <Footer /> 

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <p>
                {sortedBlogs.length === 0 
                  ? "No articles found" 
                  : "Select an article to start reading"
                }
              </p>
            </div>
          )}
        </main>
      </div>
      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
           <Share2 className="w-4 h-4" />
           Link copied to clipboard!
        </div>
      )}
    </div>
  );
}

function SplitViewSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col">
       <div className="h-24 w-full border-b" /> 
       <div className="flex flex-1 p-4 gap-4">
        <div className="w-[30%] space-y-4 hidden md:block">
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}