interface Props {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
export const FeatureCard = ({ icon, title, children }: Props) => (
  <div className="flex flex-col items-center p-6 text-center">
    <div className="flex items-center justify-center w-16 h-16 mb-4 text-white bg-orange-500 rounded-full">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);
