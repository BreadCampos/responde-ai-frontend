import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ModalAddCustomLink } from "./modal-add-custom-link";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Links Customizados
          <ModalAddCustomLink />
        </CardTitle>
        <CardDescription>
          Acompanhe a performance de diferentes canais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {customLinks.map((link) => (
            <li
              key={link.id}
              className="flex justify-between items-center p-2 rounded-lg border"
            >
              <span className="font-mono text-sm">{link.url}</span>
              <Badge>{link.clicks} cliques</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
