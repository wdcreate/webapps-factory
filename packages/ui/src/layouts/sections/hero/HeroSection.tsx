import { Button } from "@repo/ui/components/ui/button";

export default function HeroSection() {
  return (
    <section className="text-center py-heroPaddingY px-sectionPaddingX">
      <h2 className="text-4xl font-heading mb-4">Welcome to My App</h2>
      <p className="text-base text-muted max-w-prose mx-auto mb-6">
        Demo of a fully configurable UI with Shadcn UI & Tailwind.
      </p>
      <Button variant="default" size="lg">Get Started</Button>
    </section>
  );
}