import { Header } from '@/components/layout/Header';
import { JsonTool } from '@/components/json/JsonTool';
import { JsonConverter } from '@/components/json/JsonConverter';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
          <JsonTool />
          <div className="lg:col-span-1 space-y-6">
            <JsonConverter />
          </div>
        </div>
      </main>
    </div>
  );
}
