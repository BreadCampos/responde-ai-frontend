import dynamic from "next/dynamic";

const DetailsSurvey = dynamic(
  () => import("@/feature/survey/screens/details-survey")
);

export default async function DetailsSurveyPage({
  params,
}: {
  params: { surveyId: string };
}) {
  const { surveyId } = await params;
  return <DetailsSurvey surveyId={surveyId} />;
}
