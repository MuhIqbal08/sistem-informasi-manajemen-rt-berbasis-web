import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KeuanganModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingItem
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingItem ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {editingItem ? 'Perbarui informasi transaksi' : 'Masukkan detail transaksi baru'}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Tipe Transaksi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Transaksi</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'pemasukan' })}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.type === 'pemasukan'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-green-300'
                }`}
              >
                <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Pemasukan</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'pengeluaran' })}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.type === 'pengeluaran'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-red-300'
                }`}
              >
                <TrendingDown className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Pengeluaran</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan deskripsi transaksi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan kategori"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {editingItem ? 'Perbarui' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeuanganModal;
