import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateBlog } from "@/features/blogs/hooks";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft, Image as ImageIcon, Link as LinkIcon, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["TECH", "FINANCE", "HEALTHCARE", "POLITICS", "GOVERNANCE", "CAREER"];

// Public profiles
const CREATOR_IMAGES = [
  "/Ellipse 395.png",   
  "/Rectangle 1136.png",
  "/Rectangle 1092.png"
];

export default function CreateBlog() {
  const navigate = useNavigate();
  const mutation = useCreateBlog();
  
  const [imageMode, setImageMode] = useState<'url' | 'file'>('url');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    category: "TECH",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      {
        ...formData,
        category: [formData.category],
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // Outer container
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        
        {/*LEFT PANEL (Static & Stable) */}
        <div className="hidden lg:flex w-[45%] bg-slate-50 relative items-center justify-center p-6 border-r border-slate-100">
          {/* Background shapes */}
          <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-3xl" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl" />
          </div>
          
          {/* Compact Card */}
          <div className="relative z-10 w-[400px] max-h-[650px] space-y-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-xl min-h-[250px] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <span className="text-white font-bold text-lg">CA</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  Share your expertise.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  "The art of writing is the art of discovering what you believe."
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {/* UPDATED: Profile Images */}
                  {CREATOR_IMAGES.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`Creator ${i + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 object-cover" 
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-500">Joined by 2,000+ creators</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Scrollable Form) */}
        <div className="w-full lg:w-[55%] flex flex-col overflow-y-auto">
          <div className="flex-1 max-w-xl w-full mx-auto p-6 lg:p-8">
            
            <div className="relative flex items-center justify-center mb-6">
               <Button 
                variant="ghost" 
                onClick={() => navigate("/")} 
                className="absolute left-0 -ml-2 text-slate-500 hover:text-slate-900 h-8 px-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">Create Blog</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pb-10">
              
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="title" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Article headline..."
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 focus:bg-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Category</Label>
                  {isCustomCategory ? (
                    <div className="relative">
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Type custom category..."
                        className="h-10 rounded-xl bg-slate-50 border-slate-200 focus:bg-white pr-10 placeholder:text-gray-400 text-sm"
                        autoFocus
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(false);
                          setFormData(prev => ({...prev, category: CATEGORIES[0]}));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        title="Back to list"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => {
                          if (e.target.value === "CUSTOM_OPTION") {
                            setIsCustomCategory(true);
                            setFormData(prev => ({ ...prev, category: "" }));
                          } else {
                            handleChange(e);
                          }
                        }}
                        className={cn(
                          "flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                          "appearance-none cursor-pointer"
                        )}
                        required
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="CUSTOM_OPTION" className="font-semibold text-blue-600">+ Add your own</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Short Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Summary</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief abstract..."
                  className="min-h-[60px] rounded-xl bg-slate-50 border-slate-200 focus:bg-white resize-none py-2 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Row 3: Cover Image */}
              <div className="space-y-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Cover Image</Label>
                  <div className="flex bg-white rounded-md border border-slate-200 p-0.5">
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={cn(
                        "px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded transition-all",
                        imageMode === 'url' ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('file')}
                      className={cn(
                        "px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded transition-all",
                        imageMode === 'file' ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                {imageMode === 'url' ? (
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="https://..."
                    type="url"
                    className="h-9 rounded-xl bg-white border-slate-200 text-sm placeholder:text-gray-400"
                    required
                  />
                ) : (
                  <div className="relative group">
                     <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!formData.coverImage}
                    />
                    <div className="flex items-center justify-center gap-2 h-9 border border-dashed border-slate-300 rounded-xl bg-white text-slate-500 text-xs group-hover:border-blue-400 group-hover:text-blue-500 transition-colors">
                      <UploadCloud className="w-3 h-3" />
                      <span>{formData.coverImage && !formData.coverImage.startsWith('http') ? "Image Selected ✓" : "Choose File"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Content (Shortened) */}
              <div className="space-y-1.5 flex-1 flex flex-col">
                <Label htmlFor="content" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Start writing..."
                  // REDUCED HEIGHT HERE
                  className="flex-1 min-h-[120px] rounded-xl bg-slate-50 border-slate-200 focus:bg-white font-serif text-base leading-relaxed p-4 placeholder:text-gray-400 placeholder:font-sans"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                 <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold tracking-wide"
                >
                  {mutation.isPending ? "Publishing..." : "Publish Article"}
                </Button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}