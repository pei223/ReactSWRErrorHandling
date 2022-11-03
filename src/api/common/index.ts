import ky from "ky";

export const baseApi = ky
  .create({
    prefixUrl: "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
  })
  .extend({
    hooks: {
      beforeRequest: [
        (req: Request) => {
          // TODO ここで認証トークンの設定とか
        },
      ],
    },
  });
