"use client";

import { DetailsSurvey } from "@/feature/survey/screens/details-survey";

export default function DetailsSurveyPage({
  params,
}: {
  params: { id: string };
}) {
  return <DetailsSurvey id={params?.id} />;
}
