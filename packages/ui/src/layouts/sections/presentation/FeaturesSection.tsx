import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

export default function FeaturesSection() {
  return (
    <section className="py-sectionPaddingY px-sectionPaddingX">
      <h3 className="text-2xl font-heading mb-6">Features</h3>
      <div className="grid gap-3 md:gap-6 grid-cols-cards  md:grid-cols-cards-md lg:grid-cols-cards-lg">
        {[1,2,3].map(i => (
          <Card key={i} className="p-4">
            <CardHeader>
              <CardTitle>Feature {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted">Description of feature {i}.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}