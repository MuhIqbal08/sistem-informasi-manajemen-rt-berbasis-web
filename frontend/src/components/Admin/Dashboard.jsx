import React, { useEffect, useState } from "react";
import { Calendar, FileText, Megaphone, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../api/api";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalUser, setTotalUser] = useState(0);
  const [agenda, setAgenda] = useState([]);
  const [totalAgenda, setTotalAgenda] = useState(0);
  const [pengumuman, setPengumuman] = useState([]);
  const [totalPengumuman, setTotalPengumuman] = useState(0);
  const [pengajuan, setPengajuan] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const {user} = useSelector((state) => state.auth)

  console.log('userRole', user?.role?.roleGroup)

  // Dummy data chart
  // const monthlyData = [
  //   { month: 'Jan', pemasukkan: 45000000, pengeluaran: 32000000 },
  //   { month: 'Feb', pemasukkan: 52000000, pengeluaran: 28000000 },
  //   { month: 'Mar', pemasukkan: 48000000, pengeluaran: 35000000 },
  //   { month: 'Apr', pemasukkan: 61000000, pengeluaran: 42000000 },
  // ];

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.pemasukkan, 0);
  const totalExpense = monthlyData.reduce((sum, item) => sum + item.pengeluaran, 0);
  const profit = totalIncome - totalExpense;

  useEffect(() => {
    const getTotalUsers = async () => {
      try {
        const response = await axios.get(`${api}/users`);
        setTotalUser(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    getTotalUsers();
  }, []);

  useEffect(() => {
    const getAgenda = async () => {
      try {
        const response = await axios.get("http://localhost:3500/agenda");
        setAgenda(response.data.agenda);
        setTotalAgenda(response.data.totalItems);
        console.log('agenda', response.data)
      } catch (error) {
        console.error("Error fetching agenda:", error);
      }
    };
    getAgenda();
  }, []);

  useEffect(() => {
    const getPengumuman = async () => {
      try {
        const response = await axios.get("http://localhost:3500/pengumuman");
        setPengumuman(response.data.pengumuman);
        setTotalPengumuman(response.data.totalItems);
        console.log('pengumuman', response.data)
      } catch (error) {
        console.error("Error fetching pengumuman:", error);
      }
    };
    getPengumuman();
  }, []);

  useEffect(() => {
    const getPengajuan = async () => {
      try {
        const response = await axios.get("http://localhost:3500/pengajuan");
        setPengajuan(response.data);
        // console.log('pengajuan', response.data);
      } catch (error) {
        console.error("Error fetching pengajuan:", error);
      }
    };
    getPengajuan();
  }, []);

  const formatTanggal = (tanggal) => {
    const tanggalBaru = new Date(tanggal);
    return tanggalBaru.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border px-4 py-2 rounded shadow text-sm">
          <p className="font-semibold">{label}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.fill }}>
              {item.name}: Rp{item.value.toLocaleString("id-ID")}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pemasukkanRes, pengeluaranRes] = await Promise.all([
          axios.get(`${api}/transaksi/total/bulanan?type=pemasukan`),
          axios.get(`${api}/transaksi/total/bulanan?type=pengeluaran`),
        ]);

        const pemasukkanData = pemasukkanRes.data.perBulan;
        const pengeluaranData = pengeluaranRes.data.perBulan;

        const merged = {};

        pemasukkanData.forEach((item) => {
          const key = `${item.tahun}-${item.bulan}`;
          merged[key] = {
            month: `${item.bulan}-${item.tahun}`,
            pemasukkan: parseInt(item.total),
            pengeluaran: 0,
          };
        });

        pengeluaranData.forEach((item) => {
          const key = `${item.tahun}-${item.bulan}`;
          if (!merged[key]) {
            merged[key] = {
              month: `${item.bulan}-${item.tahun}`,
              pemasukkan: 0,
              pengeluaran: parseInt(item.total),
            };
          } else {
            merged[key].pengeluaran = parseInt(item.total);
          }
        });

        const mergedArray = Object.values(merged).sort((a, b) => {
          const [monthA, yearA] = a.month.split("-").map(Number);
          const [monthB, yearB] = b.month.split("-").map(Number);
          return yearA !== yearB ? yearA - yearB : monthA - monthB;
        });

        setMonthlyData(mergedArray);
        setAnimationKey(prev => prev + 1);
      } catch (error) {
        console.error("Gagal mengambil data transaksi", error);
      }
    };

    fetchData();
  }, []);

  const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
};

const formatRupiahSingkat = (value) => {
  const abs = Math.abs(value);
  if (abs >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace('.0', '') + ' M';
  } else if (abs >= 1000000) {
    return (value / 1000000).toFixed(1).replace('.0', '') + ' jt';
  } else if (abs >= 1000) {
    return (value / 1000).toFixed(1).replace('.0', '') + ' rb';
  } else {
    return value.toString();
  }
};



  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: totalUser, change: '+5.2%', color: 'bg-blue-500', icon: Users },
          { title: 'Agenda', value: totalAgenda, change: '+12.3%', color: 'bg-green-500', icon: Calendar },
          { title: 'Pengumuman', value: totalPengumuman, change: '-2.1%', color: 'bg-orange-500', icon: Megaphone },
          { title: 'Pengajuan', value: pengajuan.totalItems, change: '+8.7%', color: 'bg-purple-500', icon: FileText },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                {/* <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} dari bulan lalu
                </p> */}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agenda */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Agenda Mendatang</h3>
          <div className="space-y-3">
            {agenda.map((item) => (
              <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar size={16} className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">{formatTanggal(item.tanggal)} - {item.waktu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengumuman */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Pengumuman Terbaru</h3>
          <div className="space-y-3">
            {pengumuman.map((item) => (
              <div key={item.id} className={`flex items-start p-3 rounded-lg ${item.urgent ? 'bg-red-50 border-l-4 border-red-500' : 'bg-gray-50'}`}>
                <Megaphone size={16} className={`mt-1 mr-3 ${item.urgent ? 'text-red-500' : 'text-gray-500'}`} />
                <div>
                  <p className="font-medium">{item.judul}</p>
                  <p className="text-sm text-gray-600">{formatTanggal(item.updatedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Statistik Keuangan Bulanan</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart key={animationKey} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatRupiahSingkat(value)} />
<Tooltip formatter={(value) => formatRupiahSingkat(value)} />

            <Legend />
            <Bar dataKey="pemasukkan" fill="#10B981" name="Pemasukkan" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pengeluaran" fill="#EF4444" name="Pengeluaran" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
