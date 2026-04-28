import { SourcePanel } from '@/components/SourcePanel';
import { Converter } from '@/components/Converter';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="animate-in slide-in-from-top duration-700">
        <SourcePanel />
      </section>
      
      <section className="animate-in slide-in-from-bottom duration-700 delay-200">
        <Converter />
      </section>

      <section className="bg-brand-muted/50 p-6 rounded-xl border border-brand/10 text-sm text-gray-600">
        <h3 className="font-bold text-brand mb-2">How it works</h3>
        <p>
          Select a <strong>Source Time</strong> and <strong>Timezone</strong> above. 
          Timetraveler will instantly convert that specific moment across all your saved locations. 
          Use <strong>Sync to Now</strong> to quickly jump back to the current live time.
        </p>
      </section>
    </div>
  );
}
