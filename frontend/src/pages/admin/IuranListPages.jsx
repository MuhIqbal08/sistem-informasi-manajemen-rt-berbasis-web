import React, { useEffect } from "react";
import Layout from "./Layout";
import { GetMe } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IuranListWarga from "../../components/Admin/Iuran/IuranListWarga";

const IuranListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.roleGroup !== "admin") {
      navigate("/ertero-admin-login");
    }
  });
  return (
    <Layout>
      <IuranListWarga />
    </Layout>
  );
};

export default IuranListPage;
