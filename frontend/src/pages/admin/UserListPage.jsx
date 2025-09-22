import React, { useEffect } from "react";
import Layout from "./Layout";
import UserList from "../../components/Admin/UserList";
import { GetMe } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/ertero-admin-login");
    }
    if (
      user &&
      user.roleGroup !== "admin" &&
      user.role.name !== "Ketua RT" &&
      user.role.name !== "Wakil Ketua RT" &&
      user.role.name !== "Sekretaris"
    ) {
      navigate("/ertero-admin-login");
    }
  });
  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default UserListPage;
