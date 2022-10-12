import "../styles/AdminCategories.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import HOST from "../utils/Host";
import Axios from "axios";
import { useEffect, useState } from "react";

function AdminCategories() {
  const [data, setData] = useState([]);

  const getData = async () => {
    let api = `${HOST}categories`;
    let res = await Axios.get(api);
    let d = res.data;
    setData(d.length === 0 ? [[]] : d);
  };

  useEffect(() => {
    getData();
  }, []);
  function createData(id, name, description) {
    return { id, name, description };
  }

  return (
    <div className="Admin">
      <Stack spacing="var(--huge-sp)">
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <h1>Category List</h1>
          <Button
            component={Link}
            to="/admin/categories/create"
            size="large"
            variant="contained"
          >
            Add New +
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing="var(--tiny-sp)">
                      <Button color="error">Delete</Button>
                      <Button component={Link} to={`/admin/${row.id}/edit`}>
                        Edit
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
}

export default AdminCategories;
