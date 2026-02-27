import { Dock, Navbar, Welcome } from "@components";
import LazyResume from "@components/LazyResume";
import { Terminal, Safari, Finder, TxtFile, ImgFile, Contact } from "@windows";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Finder />
      <Safari />
      <Terminal />
      <TxtFile />
      <ImgFile />
      <LazyResume />
      <Contact />
    </main>
  );
};

export default Home;
