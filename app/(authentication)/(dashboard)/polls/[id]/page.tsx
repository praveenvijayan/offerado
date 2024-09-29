import React from "react";
import PollDetail from "@/components/polls/poll-detail";

interface PollPageProps {
  params: { id: string };
}

const PollPage: React.FC<PollPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <PollDetail pollId={id} />
    </div>
  );
};

export default PollPage;
