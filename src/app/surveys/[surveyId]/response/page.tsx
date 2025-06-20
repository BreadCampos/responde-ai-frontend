import { ResponseSurvey } from "@/feature/survey/screens/response-surveys";

export default async function ResponsePage({
  params,
}: {
  params: { surveyId: string };
}) {
  const { surveyId } = await params;
  return <ResponseSurvey surveyId={surveyId} />;
}
