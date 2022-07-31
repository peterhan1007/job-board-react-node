import { Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getJobsAsync } from "../../redux/job/jobSlice";
import { JobTable } from "../../components/job/jobTable";
import { RootState } from "../../app/store";

export default function Job() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state: RootState) => state.auth.username);

  const jobs = useAppSelector((state) => state.job.jobs);

  useEffect(() => {
    dispatch(getJobsAsync());
  }, []);

  return (
    <>
      <Box
        sx={{
          ".chakra-table__container": { bg: "gray.50", color: "gray.700" },
        }}
        p={6}
      >
        <JobTable jobs={jobs} username={username} />
      </Box>
    </>
  );
}
