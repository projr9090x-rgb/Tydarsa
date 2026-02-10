(function (w) {
  const tydarSA = {
    _key: null,
    _endpoint: "https://neketnybvslydanckeql.supabase.co/functions/v1/ingest-events",

    init(apiKey, opts = {}) {
      this._key = apiKey;
      this._opts = opts;

      if (opts.autoTrackPageViews) {
        this.track("page_view", {
          page: window.location.pathname,
          title: document.title
        });
      }

      if (opts.autoTrackClicks) {
        document.addEventListener("click", (e) => {
          const btn = e.target.closest("button, [role='button']");
          if (!btn) return;
          this.track("button_click", {
            text: btn.innerText || "button",
            id: btn.id || null
          });
        });
      }
    },

    async track(type, data = {}) {
      if (!this._key) return;

      try {
        await fetch(this._endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this._key
          },
          body: JSON.stringify({
            event_type: type,
            event_data: data
          })
        });
      } catch (e) {
        console.error("tydarSA error:", e);
      }
    }
  };

  w.tydarSA = tydarSA;
})(window);