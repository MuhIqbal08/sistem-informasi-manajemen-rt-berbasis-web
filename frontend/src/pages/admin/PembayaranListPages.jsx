import React, { useEffect } from "react";
import Layout from "./Layout";
import { GetMe } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PembayaranList from "../../components/Admin/Iuran/PembayaranList";

const PembayaranListPages = () => {
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
      user.role.name !== "Bendahara"
    ) {
      navigate("/ertero-admin-login");
    }
  });
  return (
    <Layout>
      <PembayaranList />
    </Layout>
  );
};

export default PembayaranListPages;
