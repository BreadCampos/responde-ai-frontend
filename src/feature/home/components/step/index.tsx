interface Props {
  number: string | number;
  title: string;
  children: React.ReactNode;
}
export const Step = ({ number, title, children }: Props) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-orange-500 rounded-full flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-muted-foreground">{children}</p>
    </div>
  </div>
);
