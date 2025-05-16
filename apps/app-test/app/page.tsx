import SimpleForm from "@repo/ui/layouts/form/SimpleForm";
import HeroSection from "@repo/ui/layouts/sections/hero/HeroSection";
import DemoSection from "@repo/ui/layouts/sections/presentation/DemoSection";
import FeaturesSection from "@repo/ui/layouts/sections/presentation/FeaturesSection";

export default function Home() {
  return (
    <main className="container">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <SimpleForm />
    </main>
  );
}
