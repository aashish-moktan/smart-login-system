import { App } from "./utils";

const PORT = process.env.PORT || 3000;

(async () => {
  const app = App.getApp();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
