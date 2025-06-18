import { Badge } from "@/application/shared/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/application/shared/components/ui/card";

type CustomLink = {
  id: string;
  url: string;
  clicks: number;
};

const mockCustomLinks: CustomLink[] = [
  { id: "link1", url: "responde.ai/f/campanha-insta", clicks: 102 },
  { id: "link2", url: "responde.ai/f/newsletter-jun", clicks: 88 },
];

export const SurveyCustomLinks = () => {
  const customLinks = mockCustomLinks;

  return (
    <>
      <CardHeader>
        <CardTitle>Links Customizados</CardTitle>
        <CardDescription>
          Acompanhe a performance de diferentes canais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {customLinks.map((link) => (
            <li
              key={link.id}
              className="flex justify-between items-center p-2 rounded-md border"
            >
              <span className="font-mono text-sm">{link.url}</span>
              <Badge>{link.clicks} cliques</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </>
  );
};
