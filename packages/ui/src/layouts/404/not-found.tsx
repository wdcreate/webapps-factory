import { Button } from "@repo/ui/components/ui/button";

export function Default404Page() {
  return (
    <section className="bg-background section">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Something`s missing.
          </p>
          <p className="mb-4 text-lg text-foreground">
            Sorry, we can`t find that page. You`ll find lots to explore on the
            home page.
          </p>
          <Button variant={"secondary"}  className="text-lg my-4 inline-flex">
            Back to Homepage
          </Button>
        </div>
    </section>
  );
}
