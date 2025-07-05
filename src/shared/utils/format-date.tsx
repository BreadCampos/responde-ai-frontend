type FormatOptoins = {
  dateStyle?: "long" | "short" | "full" | "medium";
  timeStyle?: "long" | "short" | "full" | "medium" | null;
};

export const formatDate = ({
  date,
  option,
}: {
  date: Date | string;
  option?: FormatOptoins;
}): string => {
  if (!date) {
    return "-";
  }
  const currentLang = "pt-br";
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const {
    dateStyle = "short",
    timeStyle = "medium",
    ...restOfOptions
  } = option || {};

  return new Intl.DateTimeFormat(currentLang, {
    dateStyle,
    ...(timeStyle === null ? {} : { timeStyle: timeStyle }),
    ...restOfOptions,
    timeZone: userTimeZone,
  })?.format(new Date(date));
};
