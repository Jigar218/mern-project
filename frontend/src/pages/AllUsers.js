import React, { useEffect, useState } from "react";
import Api from "../api";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeRole from "../components/ChangeRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openupdateUser, setopenUpdateUser] = useState(false);
  const [updateDetails, setupdateDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(Api.allUser.url, {
      method: Api.allUser.method,
      credentials: "include",
    });
    const dataRes = await fetchData.json();

    console.log(dataRes);
    if (dataRes.success) {
      setAllUsers(dataRes.data);
    }
    if (dataRes.error) {
      toast.error("Here error", dataRes.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4 bg-white">
      <table className="w-full usertable ">
        <thead className="">
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((e, index) => {
            return (
              <tr key={index}>
                {" "}
                {/*key*/}
                <td>{index + 1}</td>
                <td>{e?.name}</td>
                <td>{e?.email}</td>
                <td>{e?.role}</td>
                <td>{moment(e?.createdAt).format("LL")}</td>
                <td>
                  <button
                    type="submit"
                    className="bg-green-200 rounded-full p-2 cursor-pointer hover:bg-green-500 text-white"
                    onClick={() => {
                      setupdateDetails(e);
                      setopenUpdateUser(true);
                    }}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openupdateUser && (
        <ChangeRole
          onClose={() => setopenUpdateUser(false)}
          name={updateDetails.name}
          email={updateDetails.email}
          role={updateDetails.role}
          userId={updateDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
