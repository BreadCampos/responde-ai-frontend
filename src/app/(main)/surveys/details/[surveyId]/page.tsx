import { DetailsSurvey } from "@/feature/survey/screens/details-survey";

export default async function DetailsSurveyPage({
  params,
}: {
  params: { surveyId: string };
}) {
  const { surveyId } = await params;
  return <DetailsSurvey surveyId={surveyId} />;
}
