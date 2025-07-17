import { formatTime, formatTimeAgo } from "@/utils/FormatUtils";
import i18next from "i18next";
import { useMemo, type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  date: string;
  format: "time-ago" | "date";
}

const DateDisplay = ({ date, format, ...props }: Props) => {
  const [formattedDate, relativeTime] = useMemo(() => {
    const parsedDate = new Date(date);
    if (!parsedDate) return ["", ""];
    let timeAgo: string | null = "";
    if (format === "time-ago") {
      const secondsAgo = (Date.now() - parsedDate.getTime()) / 1000;
      if (secondsAgo < 0) {
        timeAgo = i18next.t("common.fromFuture");
      } else if (secondsAgo < 120) {
        timeAgo = i18next.t("common.momentAgo");
      } else {
        timeAgo = formatTimeAgo(i18next.language, parsedDate);
      }
    }
    const formatted = formatTime(i18next.language, parsedDate);

    return [formatted, timeAgo];
  }, [i18next.language, date, format]);

  if (format === "date") {
    return <div {...props}>{formattedDate}</div>;
  }

  return (
    <div title={formattedDate} {...props}>
      {relativeTime}
    </div>
  );
};

export default DateDisplay;
