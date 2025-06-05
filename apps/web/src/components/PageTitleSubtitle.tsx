interface PageTitleSubtitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitleSubtitle({ title, subtitle }: PageTitleSubtitleProps) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">{title}</p>
      <p className="mt-0.5 font-medium text-muted-foreground">{subtitle}</p>
    </div>
  );
}
