import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";



export default function SimpleForm() {
  return (
    <section className="py-sectionPaddingY px-sectionPaddingX">
      <h3 className="text-2xl font-heading mb-4">Contact Us</h3>
      <form className="space-y-4">
        <Input placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Textarea placeholder="Message" />
        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}