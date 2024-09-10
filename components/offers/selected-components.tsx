import { useComponentStore } from "@/stores/use-component-store";
import quizzesData from "@/data/quiz.json";
import pollData from "@/data/poll.json";
import contestsData from "@/data/contests.json";
import feedbackData from "@/data/feedback.json";
import productData from "@/data/products.json";

const SelectedComponents = () => {
  const { selectedItems } = useComponentStore();

  const quizzes = selectedItems.quizzes.map((id) => {
    const quiz = quizzesData.find((q) => q.id === id);
    return quiz ? quiz.title : null;
  });

  const polls = selectedItems.polls.map((id) => {
    const poll = pollData.find((p) => p.id === id);
    return poll ? poll.title : null;
  });

  const contests = selectedItems.contests.map((id) => {
    const contest = contestsData.find((p) => p.id === id);
    return contest ? contest.title : null;
  });

  const feedback = selectedItems.feedback.map((id) => {
    const feedbackItem = feedbackData.find((p) => p.id === id);
    return feedbackItem ? feedbackItem.title : null;
  });

  const products = selectedItems.products.map((id) => {
    const product = productData.find((p) => p.id === id);
    return product ? product.name : null;
  });

  // Combine all the selected items into one array
  const allSelectedItems = [
    ...quizzes.filter(Boolean),
    ...polls.filter(Boolean),
    ...contests.filter(Boolean),
    ...feedback.filter(Boolean),
    ...products.filter(Boolean),
  ];

  return (
    <div className="">
      <h2 className="text-xl font-semibold py-6">Selected Components</h2>
      <ul className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {allSelectedItems.map((item, index) => (
          <li
            key={index}
            className="w-full h-28 rounded-md bg-slate-500 p-[1rem]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedComponents;
