# 予約管理ダッシュボード (Booking Management Dashboard)

A modern, responsive dashboard for managing reservation data from spreadsheets. Built with React, Vite, and Tailwind CSS.

## 機能 (Features)

### 📊 ダッシュボード
- 総予約数、今日の予約数、店舗数、キャスト数の統計表示
- 過去7日間の予約数推移グラフ
- 店舗別予約数分布（円グラフ）
- 予約数の時系列グラフ
- キャスト別予約数パフォーマンス（棒グラフ）
- 最近の予約一覧

### 🏪 店舗管理
- 店舗別の予約数とキャスト数表示
- 各店舗の詳細情報カード

### 👥 キャスト管理
- キャスト別の予約数と担当店舗数表示
- キャストプロフィールカード

### 👤 顧客管理
- 顧客別の予約回数と最終予約日表示
- 顧客プロフィールカード

### 📅 予約管理
- 日付別予約一覧表示
- 日付フィルタリング機能
- 予約詳細情報表示

### 🔍 検索・フィルタリング
- 顧客名、店舗名、キャスト名での検索
- 店舗別フィルタリング
- キャスト別フィルタリング

### 📱 レスポンシブデザイン
- モバイル、タブレット、デスクトップ対応
- ハンバーガーメニュー（モバイル）
- レスポンシブグリッドレイアウト

## 技術スタック (Tech Stack)

- **React 19** - UIライブラリ
- **Vite** - ビルドツール
- **Tailwind CSS** - CSSフレームワーク
- **Heroicons** - アイコンライブラリ
- **Recharts** - チャートライブラリ
- **Google Apps Script** - データソース

## セットアップ (Setup)

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで `http://localhost:5173` を開く

## データソース (Data Source)

このダッシュボードはGoogle Apps ScriptのAPIから予約データを取得します。API URLは `src/App.jsx` 内で設定されています。

### データ構造 (Data Structure)
予約データは以下のフィールドを持つオブジェクトの配列として期待されます：
- `日付` - 予約日
- `時間` - 予約時間
- `店舗` - 店舗名
- `キャスト` - キャスト名
- `お客様` - 顧客名

## カスタマイズ (Customization)

### テーマカラー
`tailwind.config.js` でカスタムカラーパレットを定義しています：
- Primary: ブルー系 (#2798ff)
- Grayish: グレー系

### コンポーネント
- `src/App.jsx` - メインアプリケーション
- `src/components/Charts.jsx` - チャートコンポーネント

## ライセンス (License)

MIT License