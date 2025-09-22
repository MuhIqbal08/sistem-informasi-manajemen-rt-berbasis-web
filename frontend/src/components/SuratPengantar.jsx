import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function SuratPengantar() {
  const downloadPDF = () => {
    const content = document.querySelector("#suratpengantar");

    content.style.height = "297mm";
    content.style.maxHeight = "297mm";
    content.style.overflow = "hidden";

    const opt = {
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(content)
      .save()
      .then(() => {
        content.style.height = "";
        content.style.maxHeight = "";
        content.style.overflow = "";
      });
  };

  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorKtp, setNomorKtp] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [agama, setAgama] = useState("");
  const [statusPerkawinan, setStatusPerkawinan] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [statusPengajuan, setStatusPengajuan] = useState("");
  const [cek, setCek] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [keperluanId, setKeperluanId] = useState("");
  const [noSurat, setNoSurat] = useState("");
  const [rtId, setRtId] = useState("");
  const [tahunSurat, setTahunSurat] = useState("");
  const [noRT, setNoRT] = useState("");
  const [ttdImage, setTtdImage] = useState("");
  const [namaRT, setNamaRT] = useState("");
  const [tanggalACC, setTanggalACC] = useState("");
  const [date, setDate] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { userId, suratId } = useParams();
  const navigate = useNavigate();

  const options = [
    "Membuat KTP Baru / Perpanjangan",
    "Membuat Kartu Keluarga",
    "Membuat Akta Kelahiran",
    "Surat Keterangan Kematian / Ahli Waris",
    "Surat Keterangan Keluarga Ekonomi Lemah",
    "Surat Keterangan Ijin Usaha",
    "Surat Keterangan Tempat Tinggal / Domisili",
    "Surat Keterangan Pindah Rumah / Alamat",
    "Surat Keterangan Belum Menikah",
    "Surat Keterangan Musibah Banjir / Kebakaran",
    "Surat Keterangan Kelakuan Baik / SKCK",
    "Surat Keterangan Pembuatan Akta Tanah / SPPT / PBB",
    "Surat Keterangan Domisili Usaha / Yayasan",
    "Lainnya",
  ];

  const midIndex = Math.ceil(options.length / 2);
  const leftColumn = options.slice(0, midIndex);
  const rightColumn = options.slice(midIndex);

  // console.log("midIndex: ", midIndex);
  // console.log("leftColumn: ", leftColumn);
  // console.log("rightColumn: ", rightColumn);

  useEffect(() => {
    const getPengajuanById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/pengajuan/list/${userId}/${suratId}`
        );
        const data = response.data;
        console.log("data", data);
        setNama(data.nama);
        setTtl(data.ttl);
        setJenisKelamin(data.jenisKelamin);
        setAlamat(data.alamat);
        setNomorKtp(data.nomorKtp);
        setKewarganegaraan(data.kewarganegaraan);
        setAgama(data.agama);
        setStatusPerkawinan(data.statusPerkawinan);
        setPekerjaan(data.pekerjaan);
        setStatusPengajuan(data.statusPengajuan);
        setCek(1);
        setKeperluan(data.keperluan);
        setKeperluanId(data.keperluanId);
        console.log("keperluanId", data.keperluanId);
        const formattedDate = new Intl.DateTimeFormat("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date(data.updatedAt));
        setDate(formattedDate);
      } catch (error) {
        console.error(error);
      }
    };
    getPengajuanById();
  }, [userId, suratId]);
  console.log("date", date);

  useEffect(() => {
    const getTtd = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/suratTtd/${suratId}`
        );
        const data = response.data;
        setNoSurat(data.nomorSurat);
        setTahunSurat(data.tahunSurat);
        setRtId(data.rtId);
        setTtdImage(data.ttdImage);
        setNoRT(data.noRt);
        setTanggalACC(data.updatedAt);
        console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    };
    getTtd();
  }, [suratId]);

  useEffect(() => {
    const getRT = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/users/${rtId}`);
        const data = response.data;
        setNamaRT(data.name);
        // console.log("data", data);
        // setTtdImage(data.ttd);
      } catch (error) {
        console.error(error);
      }
    };
    getRT();
  }, [rtId]);

  const formatTanggal = (tanggal) => {
    const tanggalBaru = new Date(tanggal);
    return tanggalBaru.toLocaleDateString("id-ID", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log("formattedDate", date);

  return (
    <div className=" bg-gray-100">
      <div
        id="suratpengantar"
        className="w-full h-full lg:w-a4 lg:h-a4 mx-auto bg-white p-6 shadow-md border"
      >
        <div className="text-center">
          <h1 className="text-lg font-extrabold uppercase">
            Pemerintah Kabupaten Bekasi
          </h1>
          <h2 className="text-lg font-extrabold uppercase">
            Kecamatan Babelan - Kelurahan Bahagia
          </h2>
          <h3 className="text-xl font-extrabold uppercase">Rukun Warga 022</h3>
          <p className="text-xs font-semibold">
            Sekretariat: Perumahan Pondok Ungu Permai Sektor V Blok C RW 022,
            Kode Pos 17612 - Telp. 021-88883185
          </p>
          <hr className="h-px my-2 font-bold border-black border-2" />
        </div>

        <div className="w-fit flex flex-col mx-auto mb-1">
          <h3
            className="text-center text-lg font-extrabold uppercase "
            id="title"
          >
            Surat Pengantar
          </h3>
          <hr className=" border-black border " />
        </div>
        {statusPengajuan === "Sudah ACC" ? (
          <div className="flex justify-center font-semibold mb-4">
            <div>
              No. {noSurat} / SPRT / 0{noRT} / {tahunSurat}
            </div>
          </div>
        ) : (
          <div className="flex justify-center font-semibold mb-4">
            <div>No. ....... / SPRT / ....... / 20.......</div>
          </div>
        )}

        <p className="mb-4 text-sm">
          Yang bertanda tangan di bawah ini, Pengurus RT 0{noRT} RW 022
          Perumahan Pondok Ungu Permai V – Kelurahan Bahagia – Kecamatan Babelan
          – Kabupaten Bekasi, dengan ini menerangkan :
        </p>

        <div className="mb-4 text-sm mx-16">
          <table>
            <tbody>
              <tr>
                <td>Nama</td>
                <td className="pl-2">: {nama}</td>
              </tr>
              <tr>
                <td style={{ whiteSpace: "nowrap" }}>Tempat, Tanggal Lahir</td>
                <td className="pl-2">: {ttl}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td className="pl-2">: {jenisKelamin}</td>
              </tr>
              <tr>
                <td className="absolute">Alamat</td>
                <td className="pl-2">
                  : Perumahan Pondok Ungu Permai Sektor V Blok {alamat} RT 02 RW
                  <br />
                  <span className="pl-2">
                    022, Kelurahan Bahagia, Kecamatan Babelan, Kabupaten Bekasi
                  </span>
                </td>
              </tr>
              <tr>
                <td>Nomor KTP</td>
                <td className="pl-2">: {nomorKtp}</td>
              </tr>
              <tr>
                <td>Kewarganegaraan</td>
                <td className="pl-2">: {kewarganegaraan}</td>
              </tr>
              <tr>
                <td>Agama</td>
                <td className="pl-2">: {agama}</td>
              </tr>
              <tr>
                <td>Status Perkawinan</td>
                <td className="pl-2">: {statusPerkawinan}</td>
              </tr>
              <tr>
                <td>Pekerjaan</td>
                <td className="pl-2">: {pekerjaan}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold flex text-sm mb-2">
          Bahwa yang bersangkutan membutuhkan surat untuk keperluan :
        </p>

        {keperluanId && (
          <div className="grid grid-cols-2 mb-4 text-sm">
            <div className="flex flex-col">
              {leftColumn.map((option, index) => {
                const number = index + 1;
                return (
                  <label key={number} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      disabled
                      checked={keperluanId === index + 1}
                    />
                    {number}. {option}
                  </label>
                );
              })}
            </div>
            <div className="flex flex-col">
              {rightColumn.map((option, index) => {
                const number = midIndex + index + 1;
                const realIndex = midIndex + index;
                console.log("realIndex", realIndex);
                return (
                  <label key={number} className="flex items-center -ml-6">
                    {number === keperluanId + 1 ? (
                      <>
                        <input
                          type="checkbox"
                          className="mr-2"
                          disabled
                          checked={keperluanId === number}
                        />
                        {number}. {option}
                      </>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          className="mr-2"
                          disabled
                          checked={keperluanId === realIndex + 1}
                        />
                        {keperluanId === 14 ? (
                          <>
                            {number}. {keperluan}
                          </>
                        ) : (
                          <>
                            {number}. {option}
                          </>
                        )}
                      </>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-4 text-sm">
          <p>
            Demikian surat keterangan ini dikeluarkan sesuai dengan keadaan
            sebenarnya agar dapat dipergunakan sebagaimana mestinya dan kepada
            pihak-pihak yang terkait dimohon memberikan bantuan seperlunya.
          </p>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <div className="text-left">
            <br />
            <p>Mengetahui Ketua RW / 022</p>
            <p>No. Registrasi : ......... / RW 022 / ......... / 20</p>
            <p>Tanggal : ..........................................</p>
            <br />
            <br />
            <br />
            <br />
            <p>..............................................</p>
          </div>
          <div className="text-left flex flex-col">
            {statusPengajuan === "Sudah ACC" ? (
              <>
                <p>Bekasi, {formatTanggal(tanggalACC)}</p>
                <p>Ketua RT</p>
                <div className="flex flex-col text-center mt-1">
                  <p className=""></p>
                  <img
                    src={`http://localhost:3500${ttdImage}`}
                    alt="TTDRT"
                    className="w-24 h-24 my-2 mx-auto"
                  />
                  <div className="flex flex-col text-center mt-1">
                    <p className="">{namaRT}</p>
                    <p className="-mt-3">
                      ..............................................
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>Bekasi, .....................................</p>
                <p>Ketua RT</p>
                <div className="flex flex-col text-center mt-1">
                  <p className=""></p>
                  <p className="mt-24">
                    ..............................................
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-xs mt-10">
          <p>- Putih untuk Ybs, Merah Arsip RT, Kuning Arsip RW</p>
          <p>
            - Surat pengantar dapat diproses apabila warga telah memenuhi
            kewajiban bulanan
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-2 gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 rounded-md transition-all font-semibold px-4 py-1"
          onClick={downloadPDF}
        >
          Download
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 rounded-e-md transition-all font-semibold px-4 py-1"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default SuratPengantar;
