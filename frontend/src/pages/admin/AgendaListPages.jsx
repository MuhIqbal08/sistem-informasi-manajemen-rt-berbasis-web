import React, { useEffect } from "react";
import Layout from "./Layout";
import { GetMe } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AgendaList from "../../components/Admin/Agenda/AgendaList";

const AgendaListPage = () => {
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
      <AgendaList />
    </Layout>
  );
};

export default AgendaListPage;
