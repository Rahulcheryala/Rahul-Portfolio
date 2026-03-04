import { Dock, Navbar, Welcome, Home } from "@components";
import LazyResume from "@components/LazyResume";
import {
  Terminal,
  Safari,
  Finder,
  TxtFile,
  ImgFile,
  Contact,
  Photos,
} from "@windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />

      <Finder />
      <Safari />
      <Photos />
      <Terminal />
      <TxtFile />
      <ImgFile />
      <LazyResume />
      <Contact />
    </main>
  );
};

export default App;
