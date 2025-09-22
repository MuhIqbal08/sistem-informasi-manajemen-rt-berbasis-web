import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../../features/authSlice";
import Layout from "./Layout";
import Dashboard from "../../components/Admin/Dashboard";

const DashboardPage = () => {
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
    if (user && user.roleGroup !== "admin" && user.roleGroup !== "pengurus") {
      navigate("/ertero-admin-login");
    }
  });

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
