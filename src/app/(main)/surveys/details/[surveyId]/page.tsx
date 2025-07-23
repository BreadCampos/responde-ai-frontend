import DetailsSurvey from "@/feature/survey/screens/details-survey";
export const dynamic = "force-dynamic";

export default async function DetailsSurveyPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = await params;
  return <DetailsSurvey surveyId={surveyId} />;
}
