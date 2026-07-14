# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1] - 2026-07-14

### Added
- 目次（`#toc`）の開閉トグルボタン
- サンプルに長文ブロックを追加（ページ制約なく長文を書ける実例）

### Changed
- README: GitHub Pages上の `slideblock.js` を直接参照する簡易利用法を追記

(git commit: de114bf, f2de206)

## [1.0] - 2026-07-14

### Added
- スクロールスナップ（`.slide-block` に `scroll-snap-align: start` を自動適用）
- キーボードナビゲーション（矢印キーで前後のブロックへ移動）
- 現在ブロックの自動強調（IntersectionObserverで表示中のブロックに `.current` を付与）
- 自動目次生成（`#toc` を自動生成、クリックで該当ブロックへスムーズスクロール）
- `sample/index.html`（動作確認用サンプル）
- `skills/slideblock/SKILL.md`（ClaudeCode向けスキル、コンセプト説明を含む）
- `README.md`、`spec.md`

(git commit: 3ff7bea)
