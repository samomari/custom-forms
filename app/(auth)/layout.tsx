export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-24">
      <div className="flex justify-center">{children}</div>
    </section>
  );
}
