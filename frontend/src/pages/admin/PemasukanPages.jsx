import React, { useEffect } from "react";
import Layout from "./Layout";
import { GetMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeuanganDashboard from "../../components/Admin/Keuangan/KeuanganListNew";

const PemasukanPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError) {
        navigate('/ertero-admin-login');
    }
    if (
      user &&
      user.roleGroup !== "admin" &&
      user.role.name !== "Ketua RT" &&
      user.role.name !== "Wakil Ketua RT" &&
      user.role.name !== "Bendahara"
    ) {
      navigate("/ertero-admin-login");
    }
  });
  return (
    <Layout>
      <KeuanganDashboard />
    </Layout>
  );
};

export default PemasukanPages;
