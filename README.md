# SWR・ErrorBoundary を使ったエラー処理の共通化サンプル + SWR helper
- 各ページでのSWRのAPIアクセス・取得は基本エラーを考慮する必要ない
    - SWRConfig で 400 エラーは snackbar を表示、それ以外は ErrorFallback に処理を渡す
    - その他のエラーはErrorFallbackに移譲
- SWRでhelper的な型や処理
    - api/swr-helperを参照
    - 共通型と一つ前のデータを取得できる関数

## 動作確認
インストール・サーバーとモックを同時に動かす
```
npm i
npm run start-and-mock
```

## エラー処理の確認方法
_mock/middleware.jsにあるように、ルーティングするデータによってステータスコードが書き換わります。
routes.jsonを以下のように書き換えて保存すると自動でモックサーバーが更新されて、次のAPI取得ポーリング処理で適用されます。
```
routes.json
{
    "/user-info": "/user-info",
    "/todos?*": "/paramsError"  // 400エラーが返却される
    "/todos?*": "/unexpectedError"  // 500エラーが返却される
}
```

## withPrevDataの確認方法
_mock/db.jsonのtodosを書き換えるとレスポンスが変化します。
修正後に保存すると自動でモックサーバーに適用されて、次のAPI取得ポーリング処理で適用されます。
Todo list部分には更新後のデータ、Prev Todo listの方には更新前のデータが表示されます。

