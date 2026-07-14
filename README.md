# SlideBlockJS

縦長HTML文書を「スライドブロック」単位で扱い、発表向けナビゲーションを提供する軽量ライブラリ。依存なし、単一ファイル (`slideblock.js`)。

詳細仕様は [spec.md](./spec.md) 参照。

## 使い方

1. 各スライドを `<section class="slide-block" id="...">` で囲む
2. `slideblock.js` を `<body>` 最下部で読み込む
3. 読み込み時に自動で初期化される

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>My Slides</title>
</head>
<body>
  <section id="intro" class="slide-block">
    <h1>はじめに</h1>
    <p>このライブラリの概要</p>
  </section>

  <section id="feature" class="slide-block">
    <h1>機能</h1>
    <ul>
      <li>スクロールスナップ</li>
      <li>キーボードナビゲーション</li>
      <li>自動目次生成</li>
    </ul>
  </section>

  <script src="slideblock.js"></script>
</body>
</html>
```

## 提供機能

- **スクロールスナップ**: 各ブロック上端が画面上部に吸着
- **キーボードナビゲーション**: `→`/`↓` で次のブロック、`←`/`↑` で前のブロック
- **現在ブロック強調**: 表示中のブロックに `.current` クラスを自動付与
- **自動目次生成**: 画面右に固定表示。各ブロックの最初の見出しをタイトルとして一覧化、クリックでジャンプ

## API

```js
// 自動初期化（script読み込み時に実行される）
SlideBlockJS.init();

// 手動初期化（オプション指定、再初期化も可能）
SlideBlockJS.init({
  container: document.body, // ブロックを探すルート要素
  snap: true,                // スクロールスナップ有効/無効
  keyboard: true,             // キーボード操作有効/無効
  toc: true                   // 目次自動生成有効/無効
});
```

`#toc` を持つ要素をあらかじめHTMLに用意しておくと、その要素に目次を生成する。無ければ自動生成して `<body>` に追加する。

## 非対応・制限（v1）

- 複雑なアニメーション・トランジション
- 複数カラムレイアウト内のブロック
- モバイルでのタッチスワイプ（基本はスクロール）
- 印刷レイアウトの最適化

## ライセンス

MIT
