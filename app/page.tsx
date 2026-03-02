import { Dock, Navbar, Welcome, Home } from "@components";
import LazyResume from "@components/LazyResume";
import { Terminal, Safari, Finder, TxtFile, ImgFile, Contact } from "@windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
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

export default App;
