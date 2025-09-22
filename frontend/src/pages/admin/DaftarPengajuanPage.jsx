import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { GetMe } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import DaftarPengajuanNew from "../../components/Admin/DaftarPengajuanNew";

const DaftarPengajuanPage = () => {
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
      user.role.name !== "Wakil Ketua RT"
    ) {
      navigate("/ertero-admin-login");
    }
  });
  return (
    <Layout>
      <DaftarPengajuanNew />
    </Layout>
  );
};

export default DaftarPengajuanPage;
