import { useQuery } from "@tanstack/react-query";
import {
  fetchPoll,
  fetchPolls,
  Poll,
  createPoll,
} from "@/services/poll-services";

export const usePoll = (id: string) => {
  return useQuery<Poll, Error>({
    queryKey: ["poll", id],
    queryFn: () => fetchPoll(id),
    enabled: !!id, // Only run if id is truthy
  });
};

export const usePolls = () => {
  return useQuery<Poll[], Error>({
    queryKey: ["polls"],
    queryFn: fetchPolls,
  });
};
