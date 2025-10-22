import React, { useState } from 'react';

const AdminPanel = ({ isOpen, onClose, onSettingsChange, currentSettings }) => {
  const [settings, setSettings] = useState(currentSettings || {
    theme: 'light',
    density: 'comfortable',
    showAvatars: true,
    showStatus: true,
    tableSize: 'md',
    animations: true,
    colorScheme: 'blue'
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const themes = [
    { value: 'light', label: 'ライト', description: '明るいテーマ' },
    { value: 'dark', label: 'ダーク', description: '暗いテーマ' },
    { value: 'auto', label: '自動', description: 'システム設定に従う' }
  ];

  const densities = [
    { value: 'compact', label: 'コンパクト', description: 'より多くのデータを表示' },
    { value: 'comfortable', label: '快適', description: 'バランスの取れた表示' },
    { value: 'spacious', label: '広々', description: 'ゆったりとした表示' }
  ];

  const tableSizes = [
    { value: 'sm', label: '小', description: '小さなテーブル' },
    { value: 'md', label: '中', description: '標準サイズ' },
    { value: 'lg', label: '大', description: '大きなテーブル' }
  ];

  const colorSchemes = [
    { value: 'blue', label: 'ブルー', color: 'bg-blue-500' },
    { value: 'green', label: 'グリーン', color: 'bg-green-500' },
    { value: 'purple', label: 'パープル', color: 'bg-purple-500' },
    { value: 'orange', label: 'オレンジ', color: 'bg-orange-500' },
    { value: 'pink', label: 'ピンク', color: 'bg-pink-500' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">管理パネル</h2>
            <p className="text-gray-600 mt-1">UI設定と表示オプション</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">

          {/* Density Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">表示密度</h3>
            <div className="grid grid-cols-1 gap-3">
              {densities.map((density) => (
                <label key={density.value} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="density"
                    value={density.value}
                    checked={settings.density === density.value}
                    onChange={(e) => handleSettingChange('density', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{density.label}</div>
                    <div className="text-sm text-gray-500">{density.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Table Size */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">テーブルサイズ</h3>
            <div className="grid grid-cols-3 gap-3">
              {tableSizes.map((size) => (
                <label key={size.value} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="tableSize"
                    value={size.value}
                    checked={settings.tableSize === size.value}
                    onChange={(e) => handleSettingChange('tableSize', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{size.label}</div>
                    <div className="text-sm text-gray-500">{size.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>


          {/* Display Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">表示オプション</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <div className="text-sm font-medium text-gray-900">アバター表示</div>
                  <div className="text-sm text-gray-500">ユーザーアバターを表示</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showAvatars}
                  onChange={(e) => handleSettingChange('showAvatars', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <div className="text-sm font-medium text-gray-900">ステータス表示</div>
                  <div className="text-sm text-gray-500">オンライン/オフライン状態を表示</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showStatus}
                  onChange={(e) => handleSettingChange('showStatus', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <div className="text-sm font-medium text-gray-900">アニメーション</div>
                  <div className="text-sm text-gray-500">スムーズなアニメーション効果</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.animations}
                  onChange={(e) => handleSettingChange('animations', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            設定を保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
