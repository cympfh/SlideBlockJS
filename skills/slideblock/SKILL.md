---
name: slideblock
description: 縦長HTMLをスライドブロック形式（スクロールスナップ・キーボード操作・自動目次付き）で構成したいときに使う。「スライド作って」「発表用HTML作って」「slideblockで」と言われたら使う。
---

# SlideBlock スキル

`slideblock.js` を使ったスライド形式HTMLの作成方法。

## いつ使うか

- 発表・プレゼン用のHTML資料を作りたいとき
- 縦スクロールでスライドのように区切られたページが欲しいとき
- PowerPoint的なページ制約を避けつつスライド感覚のナビゲーションが欲しいとき

## コンセプト（重要）

SlideBlockJSは「スライド資料」を作るツールではない。**縦長資料をスライド風に表示する**ツール。

普通のスライド資料には1ページに収めるという制約があり、そのために

- 内容を無理に削る
- 内容を複数ページに分割する
- 文字を小さくして詰め込む

といった不自由が生じる。SlideBlockJSはHTML文書の利点（内容の連続性・自由な長さ・大きな図表・詳細な記述）を保ったまま、スライドの利点（1トピックへの集中・ナビゲーションの容易さ）だけを取り入れる。

したがって、ブロックを書くときはページ制約を気にする必要はない。1ブロックが長くなっても、図表が大きくなっても、補足説明が多くなっても構わない。「1画面に収める」ために文字を小さくしたり内容を削ったりする必要はない（読み手はスクロールすればよい）。無理な圧縮・分割よりも、内容の充実を優先してよい。

## HTMLの書き方

1. スライド1枚につき `<section class="slide-block" id="一意なID">` で囲む
2. ブロック内の最初の見出し（`<h1>` 推奨）が目次のタイトルになる
3. `id` は目次ジャンプ・URLハッシュ用なので必ず付ける
    - `id` は内容を表す意味のある名前にする（`intro` など）
    - 連番（`block1`, `block2`, `01-intro` など）は非推奨。ブロックの挿入・削除で番号がずれる
4. `slideblock.js` を `<body>` の最後で読み込む（読み込み時に自動初期化される）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>発表タイトル</title>
</head>
<body>
  <section id="intro" class="slide-block">
    <h1>ブロックタイトル</h1>
    <p>主要メッセージ</p>
    <ul>
      <li>要点1</li>
      <li>要点2</li>
    </ul>
  </section>

  <section id="architecture-overview" class="slide-block">
    <h1>次のトピック</h1>
    <p>...</p>
  </section>

  <!-- ブロックは10〜30個程度を想定 -->

  <script src="slideblock.js"></script>
</body>
</html>
```

## 注意点

- 1ブロック = 1トピックに絞る（内容量そのものは制約しない。上記コンセプト参照）
- 図表・コードブロックなど自由にHTMLを書いてよい（`.slide-block` 内であれば制約なし）
- 目次は自動生成されるので `#toc` 要素を手動で書く必要はない（書いてもよい。書けばそこに目次が生成される）
- 追加CSSは自由に上書き可能（`.slide-block`, `.slide-block.current`, `#toc.slideblockjs-toc` などのクラス名を使う）
- 複雑なアニメーション・複数カラム内のブロック・印刷最適化は非対応（v1）

## 詳細仕様

`spec.md` および `slideblock.js` 本体を参照。オプションは `SlideBlockJS.init({container, snap, keyboard, toc})` で調整可能。
