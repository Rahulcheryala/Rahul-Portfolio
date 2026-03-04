import { FuzzyText } from "@components/react-bits";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.15}
        hoverIntensity={0.4}
        enableHover
        fontSize="clamp(3rem, 4vw, 1.5rem)"
        fontWeight={600}
      >
        Not found
      </FuzzyText>
    </div>
  );
};

export default NotFound;
