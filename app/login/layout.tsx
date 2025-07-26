export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/20 w-full'>
      <div className='relative min-h-screen w-full flex items-center justify-center'>
        <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />
        <div className='relative z-10 mx-auto w-full max-w-md'>{children}</div>
      </div>
    </div>
  );
}
