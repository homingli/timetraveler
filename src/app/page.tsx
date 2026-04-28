import { Converter } from '@/components/Converter';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="animate-in slide-in-from-bottom duration-700 delay-200">
        <Converter />
      </section>

    </div>
  );
}
