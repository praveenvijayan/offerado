import Poll from "./poll";
import Quiz from "./quiz";
import Contests from "./contest";
import Feedback from "./feedback";
import ProductSelection from "./products";
import ComponentDropdown from "./component-dropdown";
import PollSheet from "./poll";

const ComponentSelection = () => {
  return (
    <>
      <ComponentDropdown />
      <PollSheet />
      <Quiz />
      <Contests />
      <Feedback />
      <ProductSelection />
    </>
  );
};

export default ComponentSelection;
