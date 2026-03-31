import dynamic from "next/dynamic";
import { Dock, Navbar, Welcome, Home } from "@components";
import LoadingScreen from "@components/LoadingScreen";

const Finder = dynamic(() => import("@windows/Finder"));
const Safari = dynamic(() => import("@windows/Safari"));
const Photos = dynamic(() => import("@windows/Photos"));
const Terminal = dynamic(() => import("@windows/Terminal"));
const TxtFile = dynamic(() => import("@windows/TxtFile"));
const ImgFile = dynamic(() => import("@windows/ImgFile"));
const Contact = dynamic(() => import("@windows/Contact"));
const Calendar = dynamic(() => import("@windows/Calendar"));
const ConditionalResume = dynamic(
  () => import("@components/ConditionalResume"),
);

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
