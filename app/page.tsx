import { Dock, Navbar, Welcome, Home } from "@components";
import ConditionalResume from "@components/ConditionalResume";
import LoadingScreen from "@components/LoadingScreen";
import {
  Terminal,
  Safari,
  Finder,
  TxtFile,
  ImgFile,
  Contact,
  Photos,
  Calendar,
} from "@windows";

const App = () => {
  return (
    <LoadingScreen>
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
        <ConditionalResume />
        <Contact />
        <Calendar />
      </main>
    </LoadingScreen>
  );
};

export default App;
