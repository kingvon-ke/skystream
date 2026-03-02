@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-sans: 'Plus Jakarta Sans', sans-serif;

    /* Trusted Blue Palette */
    --background: 210 33% 99%;
    --foreground: 222 47% 11%;
    
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 214 32% 91%;
    --secondary-foreground: 222 47% 11%;
    
    --muted: 214 32% 95%;
    --muted-foreground: 215 16% 47%;
    
    --accent: 214 32% 91%;
    --accent-foreground: 222 47% 11%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 221 83% 53%;

    --radius: 0.75rem;
  }

  .dark {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    
    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;
    
    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;
    
    --primary: 217 91% 60%;
    --primary-foreground: 222 47% 11%;
    
    --secondary: 217 19% 27%;
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217 19% 27%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 217 19% 27%;
    --accent-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 217 19% 27%;
    --input: 217 19% 27%;
    --ring: 224 71.4% 4.1%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased min-h-screen flex flex-col;
    font-family: var(--font-sans);
  }

  h1, h2, h3, h4, h5, h6 {
    @apply tracking-tight font-bold;
  }
}

@layer utilities {
  .glass-panel {
    @apply bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl shadow-black/5;
  }
  
  .text-balance {
    text-wrap: balance;
  }

  .hover-elevate {
    @apply transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg;
  }
}
