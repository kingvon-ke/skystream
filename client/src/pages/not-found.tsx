import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20">
        <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="w-12 h-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        
        <Link href="/">
          <Button size="lg" className="font-semibold">
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
