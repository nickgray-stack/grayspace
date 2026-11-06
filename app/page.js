import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import Home from "@/components/home/Home";

export const metadata = {
  description:
    "Selected UX & product design by Nicholas Gray — a studio-of-one in London. Christie's, Phillips, Zalando and more.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Chrome active="work" />
      <Home />
      <Footer />
    </>
  );
}
