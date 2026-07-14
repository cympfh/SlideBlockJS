# SlideBlockJS Specification

**Version:** 1.0  
**File:** slideblockjs.js (single vanilla JS file, no dependencies)

## 概要

SlideBlockJSは、HTMLの連続した縦長文書を「スライドブロック」単位で扱い、発表向けのナビゲーションを提供する軽量ライブラリ。  
従来のPowerPoint的なページ制約を排除しつつ、スライドの「1トピック集中」「視覚的明快さ」「操作性」をHTMLに取り入れる。

## 目的

- スライドの利点（焦点のしやすさ、ナビゲーション容易）を保持
- HTMLの利点（内容の連続性、大きな図表、詳細記述）を活かす
- 1ファイルで即利用可能

## HTML構造要件

```html
<section id="block1" class="slide-block">
  <h1>ブロックタイトル</h1>
  <p>主要メッセージ</p>
  <ul>
    <li>要点</li>
  </ul>
  <!-- 図表・コードなど -->
</section>
```

- 各ブロックは `<section class="slide-block">` で囲む
- `id` 属性は必須（目次・ジャンプ用）
- 最初の見出し（`<h1>`推奨）が目次タイトルになる
- ブロック数は任意（10〜30程度を想定）

## 提供機能

1. **スクロールスナップ**  
   ブロック上端が画面上部に吸着（CSS `scroll-snap-align: start` を自動適用）

2. **キーボードナビゲーション**  
   - 右矢印 / 下矢印：次のブロックへ
   - 左矢印 / 上矢印：前のブロックへ

3. **現在ブロック強調**  
   - 現在表示中のブロックに `.current` クラスを自動付与
   - 背景色などで視覚的に強調可能

4. **自動目次生成**  
   - 固定位置のナビゲーション領域（`#toc` または自動生成）に全ブロックタイトルをリスト
   - クリックで該当ブロックへスムーズスクロール

5. **クリック / タッチ対応**  
   - 目次クリックでジャンプ
   - ブロック間をスワイプまたはクリックで移動（任意拡張）

## CSS要件・推奨クラス

```css
.slide-block {
  scroll-snap-align: start;
  min-height: 100vh;
  padding: 60px 80px;
  box-sizing: border-box;
}

.slide-block.current {
  background-color: #f8f8ff; /* 強調色は任意 */
}

.slide-block h1 {
  font-size: 3.5rem;
  margin-bottom: 2rem;
}
```

- ライブラリは基本スタイルを注入（上書き可能）
- ユーザーは自由に追加CSSを記述

## JavaScript API（v1）

```js
// 自動初期化（script読み込み時）
SlideBlockJS.init();

// 手動初期化（オプション）
SlideBlockJS.init({
  container: document.body,
  snap: true,
  keyboard: true,
  toc: true
});
```

主なオプション（初期はデフォルトで十分）:
- `snap`: スクロールスナップ有効/無効
- `keyboard`: キーボード操作有効/無効
- `toc`: 目次自動生成有効/無効

## 使用方法

1. HTMLに `<section class="slide-block" id="...">` を記述
2. `slideblockjs.js` を `<body>` 最下部で読み込み
3. 必要に応じてCSSを調整

```html
<script src="slideblockjs.js"></script>
```

## 非対応・制限（v1）

- 複雑なアニメーション・トランジション
- 複数カラムレイアウト内のブロック
- モバイルでのタッチスワイプ（基本はスクロール）
- 印刷レイアウトの最適化

## 将来拡張候補

- フルスクリーンモード
- 発表者ビュー（ノート表示）
- PDFエクスポート
- テーマ切り替え

---

**作成日:** 2026-07-14  
**ライセンス:** MIT（想定）  
**作者:** @cympfh
