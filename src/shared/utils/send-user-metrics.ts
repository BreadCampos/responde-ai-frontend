import { APP_ENV } from "../../env";
import { getEssentialNavigatorDataWithLocation } from "./get-navigator-data";

export async function ClearSessionMetrics() {
  localStorage.removeItem("session_metrics");
}

export async function StoreSessionMetrics(
  event: string,
  sessionStart?: Date,
  additionalData?: object
) {
  if (!sessionStart) return;
  const evDate = new Date();
  const elapsedTimeFromStartMs = evDate.getTime() - sessionStart.getTime();

  if (!localStorage.getItem("session_metrics")) {
    localStorage.setItem("session_metrics", JSON.stringify([]));
  }

  const sessionMetrics: Array<unknown> = JSON.parse(
    localStorage.getItem("session_metrics") as string
  ) as Array<unknown>;

  if (!sessionMetrics) {
    return;
  }

  sessionMetrics.push({
    sessionStart,
    evDate,
    event,
    elapsedTimeFromStartMs,
    additionalData,
    navigator: await getEssentialNavigatorDataWithLocation(),
  });
  localStorage.setItem("session_metrics", JSON.stringify(sessionMetrics));
}

export function GetSessionMetrics() {
  const sessionMetrics = localStorage.getItem("session_metrics");
  if (!sessionMetrics) return [];
  try {
    return JSON.parse(sessionMetrics);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
}

export async function DispatchSessionMetrics(surveyId: string) {
  const baseUrl = APP_ENV.APP_URL;
  if (!baseUrl) {
    return;
  }
  const metricsUrl = `${baseUrl}/metrics/${surveyId}`;
  const metrics = GetSessionMetrics();
  await fetch(metricsUrl, {
    method: "POST",
    body: JSON.stringify(metrics),
  });
}
