import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useNumbers() {
  return useQuery({
    queryKey: [api.numbers.list.path],
    queryFn: async () => {
      const res = await fetch(api.numbers.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch virtual numbers');
      const data = await res.json();
      return parseWithLogging(api.numbers.list.responses[200], data, "numbers.list");
    },
  });
}

export function useNumber(id: number) {
  return useQuery({
    queryKey: [api.numbers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.numbers.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch virtual number details');
      const data = await res.json();
      return parseWithLogging(api.numbers.get.responses[200], data, "numbers.get");
    },
  });
}

export function useNumberMessages(id: number) {
  return useQuery({
    queryKey: [api.numbers.messages.path, id],
    queryFn: async () => {
      const url = buildUrl(api.numbers.messages.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return [];
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      return parseWithLogging(api.numbers.messages.responses[200], data, "numbers.messages");
    },
    // Poll every 3 seconds for live message updates
    refetchInterval: 3000,
  });
}
