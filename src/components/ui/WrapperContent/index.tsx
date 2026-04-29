interface WrapperContentProps {
  children: React.ReactNode;
}

export function WrapperContent({ children }: WrapperContentProps) {
  return <div className="w-full h-full rounded-md bg-background-content p-3">{children}</div>;
}
