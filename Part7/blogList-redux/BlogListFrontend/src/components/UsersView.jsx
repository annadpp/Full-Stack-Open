import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const UsersView = () => {
  const displayUsers = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <td>{}</td>
            <td>
              <h5>blogs created</h5>
            </td>
          </tr>
          {displayUsers.map((displayUser) => (
            <tr key={displayUser.id}>
              <td>{displayUser.username}</td>
              <td>{displayUser.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersView;
