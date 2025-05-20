import { App } from "./utils";

const PORT = process.env.PORT || 3000;

(async () => {
  const appInstance = await App.init();
  const app = appInstance.getApp();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
