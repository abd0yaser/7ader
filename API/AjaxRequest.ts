function AjaxRequest(options: any) {
  return fetch(
    options.host || "https://www.7ader.net/GeneralApiV11/api/General/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify({
        ConnectionStringName: options.ConnectionStringName || "Teleware",
        StoredProcedureName: options.SP,
        SpParams: options.SqlParams,
        CacheKey: options.cacheKey || null,
        TablesNames: options.TablesNames || null,
        RenameTables: options.renameTables || false,
        IncludesUserID: options.IncludesUserID || false,
      }),
    }
  ).then((response) => {
    if (response.ok === true && response.status === 200) {
      return response.json().then((res) => {
        if (isNaN(res["error-code"]) || res["error-code"] === 4) {
          return res;
        } else {
          throw new Error("API Error: " + res["error-code"]);
        }
      });
    } else {
      throw new Error("HTTP Error: " + response.status);
    }
  });
}

export { AjaxRequest };
