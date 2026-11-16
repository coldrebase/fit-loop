App({
  globalData: {
    theme: "light"
  },
  onLaunch() {
    const theme = wx.getStorageSync("fitloop-mode") === "dark" ? "dark" : "light";
    this.globalData.theme = theme;
  }
});
