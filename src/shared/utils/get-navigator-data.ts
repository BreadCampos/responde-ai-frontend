type NavigatorData = {
  pdfViewerEnabled?: boolean;
  doNotTrack?: string;
  maxTouchPoints?: number;
  oscpu?: string;
  productSub?: string;
  cookieEnabled?: boolean;
  buildID?: string;
  globalPrivacyControl?: boolean;
  webdriver?: boolean;
  hardwareConcurrency?: number;
  appCodeName?: string;
  appName?: string;
  appVersion?: string;
  platform?: string;
  userAgent?: string;
  product?: string;
  language?: string;
  languages?: string[];
  onLine?: boolean;
  location?: {
    latitude?: number;
    longitude?: number;
    accuracy?: number;
    error?: string;
  };
};

export async function getEssentialNavigatorDataWithLocation(): Promise<NavigatorData> {
  const keys: (keyof NavigatorData)[] = [
    "pdfViewerEnabled",
    "doNotTrack",
    "maxTouchPoints",
    "oscpu",
    "productSub",
    "cookieEnabled",
    "buildID",
    "globalPrivacyControl",
    "webdriver",
    "hardwareConcurrency",
    "appCodeName",
    "appName",
    "appVersion",
    "platform",
    "userAgent",
    "product",
    "language",
    "languages",
    "onLine",
  ];

  const data: NavigatorData = {};

  for (const key of keys) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (navigator as any)[key];
      if (value !== undefined) {
        data[key] = value;
      }
    } catch {
      // Ignora erros de acesso
    }
  }

  if ("geolocation" in navigator) {
    try {
      const position: GeolocationPosition | { error: string } =
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            (err) => resolve({ error: err.message }),
            { timeout: 5000 }
          );
        });

      if ("coords" in position) {
        data.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
      } else {
        data.location = { error: position.error };
      }
    } catch (err) {
      data.location = { error: (err as Error).message };
    }
  } else {
    data.location = { error: "Geolocation not supported" };
  }

  return data;
}
