import { useCallback, useState } from "react";
import { analyzePost } from "../services/analyticsService.js";

export default function useAnalysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(async (params) => {
    setLoading(true);
    setError("");
    try {
      setData(await analyzePost(params));
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, run };
}
