import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function DemoSection() {
  return (
    <section className="py-sectionPaddingYCompact px-sectionPaddingX bg-secondary rounded-md shadow-sm">
      <h3 className="text-2xl font-heading mb-4">Live Demo</h3>
      <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      </div>
    </section>
  );
}
