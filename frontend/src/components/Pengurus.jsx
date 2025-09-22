import React from 'react';
import { Facebook, Instagram, MessageCircle, Users, Shield, Heart, Dumbbell, Home, MessageSquare } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Pengurus = () => {
  const positions = [
    {
      id: 1,
      title: "Ketua RT",
      name: "Nur Fajar Dwi Raharjo",
      icon: <Users className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 2,
      title: "Wakil Ketua",
      name: "I Wayan Suwastika",
      icon: <Users className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 3,
      title: "Sekretaris",
      name: "Novrizal Kurniawan",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 4,
      title: "Bendahara 1",
      name: "Aldi",
      icon: <Home className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 5,
      title: "Bendahara 2",
      name: "Teguh Herianto",
      icon: <Home className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 6,
      title: "Seksi Keamanan",
      name: "Isman",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 7,
      title: "Seksi Rohani Islam",
      name: "Pipin Supriatna",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 8,
      title: "Seksi Rohani Islam",
      name: "Syofyan",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 9,
      title: "Seksi Pemuda dan Olahraga",
      name: "Teguh Herianto",
      icon: <Dumbbell className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 10,
      title: "Seksi Pemuda dan Olahraga",
      name: "Pondra Sadewa",
      icon: <Dumbbell className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 11,
      title: "Seksi Arisan dan Kesra",
      name: "Cucu",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 12,
      title: "Seksi Sarana dan Prasarana",
      name: "Roni",
      icon: <Home className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 13,
      title: "Seksi Sarana dan Prasarana",
      name: "Wijanarko",
      icon: <Home className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 14,
      title: "Seksi Humas",
      name: "Dedi Supriadi",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 15,
      title: "Seksi Humas",
      name: "Suheriansyah",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    },
    {
      id: 16,
      title: "Seksi Humas",
      name: "Mahmudin",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-gradient-to-br from-green-600 to-green-700",
      borderColor: "border-green-600",
      shadowColor: "shadow-green-100"
    },
    {
      id: 17,
      title: "Seksi Humas",
      name: "Suparman",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      shadowColor: "shadow-blue-100"
    }
  ];

  const SocialIcon = ({ type, className }) => {
    const iconProps = { size: 16, className };
    switch (type) {
      case 'facebook':
        return <Facebook {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'whatsapp':
        return <MessageCircle {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-green-600 mb-6 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Susunan Pengurus RT
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Struktur organisasi yang solid untuk melayani masyarakat dengan dedikasi tinggi
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {positions.map((position) => (
            <div
              key={position.id}
              className={`bg-white rounded-2xl shadow-xl ${position.shadowColor} p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 ${position.borderColor} border-opacity-20`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className={`w-20 h-20 rounded-full ${position.color} flex items-center justify-center text-white shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
                  {position.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                  {position.title}
                </h3>
                <h4 className="text-lg font-bold text-slate-800 leading-tight">
                  {position.name}
                </h4>
              </div>

              {/* Social Media Icons */}
              {/* <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-slate-100">
                <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 hover:scale-110 transform">
                  <SocialIcon type="facebook" />
                </button>
                <button className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500 transition-colors duration-200 hover:scale-110 transform">
                  <SocialIcon type="instagram" />
                </button>
                <button className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition-colors duration-200 hover:scale-110 transform">
                  <SocialIcon type="whatsapp" />
                </button>
              </div> */}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Bersama membangun lingkungan yang lebih baik untuk masa depan yang berkelanjutan
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Pengurus;