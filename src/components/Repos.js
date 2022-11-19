import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";

const Repos = ({
  username,
  setFullName,
  setProfileUrl,
  setLocation,
  setTwitterUrl,
}) => {
  const [repoList, setRepoList] = useState(null);
  const [repoCount, setRepoCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getCount = async () => {
    const url = `https://api.github.com/users/${username}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GIT_AUTH_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        setRepoCount(data.public_repos);
        setFullName(data.name);
        setProfileUrl(data.html_url);
        setLocation(data.location);
        setTwitterUrl(data.twitter_usernames);
        setController({
          ...controller,
          page: 0,
        });
        setIsError(false);
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (username && username.length > 0) getCount();
  }, [username]);

  const getData = async () => {
    setIsLoading(true);
    const url = `https://api.github.com/users/${username}/repos?page=${
      controller.page + 1
    }&per_page=${controller.rowsPerPage}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GIT_AUTH_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        setRepoList(data);
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (username.length > 0) {
      getData();
    }
  }, [controller, username]);

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <>
      {!isLoading && !isError && (
        <Card style={{ margin: "0 16px" }}>
          <Table>
            <TableHead>
              <TableCell style={{ fontWeight: "bolder", fontSize: "22px" }}>
                Repository Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "22px",
                  paddingLeft: "4%",
                }}
              >
                Description
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "22px" }}>
                Link
              </TableCell>
            </TableHead>

            <TableBody>
              {repoList?.map((repo) => (
                <TableRow
                  hover
                  key={repo.id}
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    transition: "0.3s",
                    borderRadius: "6px",
                  }}
                >
                  <TableCell>{repo.name}</TableCell>
                  <TableCell style={{ paddingLeft: "4%" }}>
                    {repo.description
                      ? repo.description
                      : "Description yet to be added..."}
                  </TableCell>
                  <TableCell>
                    <Link href={repo.clone_url} target="_blank">
                      Github URL
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {username.length === 0 && <p>No Repositories to show!</p>}
          </Table>
          <TablePagination
            component="div"
            onPageChange={handlePageChange}
            page={controller.page}
            count={repoCount}
            rowsPerPage={controller.rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
          />
        </Card>
      )}

      {isError && (
        <h2>
          An Error Occurred, Please make sure to enter the correct username!
        </h2>
      )}

      {isLoading && <CircularProgress style={{ paddingTop: "16px" }} />}
    </>
  );
};

export default Repos;
