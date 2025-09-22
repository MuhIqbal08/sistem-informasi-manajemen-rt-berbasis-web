import React, { useEffect } from "react";
import Layout from "./Layout";
import { GetMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pengeluaran from "../../components/Admin/Pengeluaran/Pengeluaran";

const PengeluaranPages = () => {
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
      <Pengeluaran />
    </Layout>
  );
};

export default PengeluaranPages;
