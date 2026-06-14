import Header from "@/components/common/PublicHeader";
import Footer from "@/components/common/PublicFooter";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}