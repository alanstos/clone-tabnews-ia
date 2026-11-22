import ConfettiOnLoad from "@/components/ConfettiOnLoad";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "TabNews: Conteúdos para quem trabalha com Programação e Tecnologia",
  description: "Clone do TabNews com dados mockados.",
};

// Aplica o tema salvo antes da primeira pintura para evitar "flash".
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ConfettiOnLoad />
      </body>
    </html>
  );
}
