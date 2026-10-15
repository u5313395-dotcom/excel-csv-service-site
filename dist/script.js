(function () {
  const config = window.SITE_CONFIG || {};
  const emailValue = typeof config.CONTACT_EMAIL === "string" ? config.CONTACT_EMAIL.trim() : "";
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) ? emailValue : "";
  const serviceName = typeof config.SERVICE_NAME === "string" && config.SERVICE_NAME.trim()
    ? config.SERVICE_NAME.trim()
    : "Excel・CSV整形代行";
  const requestedStatus = config.SERVICE_STATUS === "live" ? "live" : "prelaunch";
  // 正式受付表示には、実際に相談を受信できる宛先も必要。
  const status = requestedStatus === "live" && email ? "live" : "prelaunch";
  const price = Number.isFinite(Number(config.PRICE)) && Number(config.PRICE) >= 0
    ? Math.round(Number(config.PRICE)).toLocaleString("ja-JP")
    : "5,000";

  document.querySelectorAll("[data-price]").forEach((node) => { node.textContent = price; });
  document.querySelectorAll(".brand > span:last-child").forEach((node) => { node.textContent = serviceName; });
  document.querySelectorAll("[data-status-short]").forEach((node) => {
    node.textContent = status === "live" ? "ご依頼を受付中" : "事前相談のみ受付中";
  });
  document.querySelectorAll("[data-status-message]").forEach((node) => {
    node.textContent = status === "live"
      ? "ご依頼を受付中です。作業前に範囲・金額・納期を確認します。"
      : "現在は匿名化サンプルによる事前相談のみ受け付けています。実データは受け取りません。";
  });
  document.querySelectorAll("[data-status-long]").forEach((node) => {
    node.textContent = status === "live"
      ? "ご依頼を受付中です。安全な受渡方法をご案内する前に、個人情報・取引先名・社外秘情報は送らないでください。"
      : "正式受付開始前のため、匿名化サンプルによる事前相談のみ受け付けています。実データの受渡しは行いません。";
  });
  document.querySelectorAll("[data-contact-cta]").forEach((node) => {
    node.textContent = status === "live" ? "依頼について相談する" : "匿名化サンプルで相談する";
  });
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };
  setText("[data-price-context]", status === "live" ? "標準料金" : "販売検証中の標準価格案");
  setText("[data-price-note]", status === "live"
    ? "標準範囲の料金です。範囲外は作業開始前に対応可否と金額を確認します。"
    : "受付開始前の価格案です。売上実績や適正価格が確認された金額ではありません。");
  setText("[data-limits-message]", status === "live"
    ? "下記は標準対象外または事前確認が必要な内容です。"
    : "現在は正式受付開始前です。下記に加え、匿名化サンプル以外のデータは受け取りません。");
  setText("[data-faq-xlsx]", status === "live"
    ? "xlsx形式に対応しています。標準範囲では先頭シートのみを扱います。数式セルは、お客様が再計算して保存した計算結果が必要です。こちらでは再計算しません。"
    : "xlsx形式の読み込みと納品は架空サンプルで確認済みです。標準範囲では先頭シートのみを扱います。数式セルは、お客様が再計算して保存した計算結果が必要です。こちらでは再計算しません。実データの受付は、安全な受渡・保管・削除手順の準備後です。");
  setText("[data-faq-csv]", status === "live"
    ? "はい。CSVのみのご依頼も標準範囲に含まれます。"
    : "はい。CSVのみも標準範囲案に含めています。現在は匿名化サンプルによる事前相談のみです。");
  setText("[data-faq-realdata]", status === "live"
    ? "メールにはファイルを添付せず、作業範囲に合意したあとに案内する方法だけでお渡しください。"
    : "問い合わせ先と安全な受渡・保管・削除手順が整うまでは実データを受け取りません。現在は匿名化したサンプルによる事前相談のみです。");
  setText("[data-contact-title]", status === "live"
    ? "依頼内容についてご相談ください。"
    : "まずは、匿名化サンプルでご相談ください。");

  const contactDescription = document.querySelector("[data-contact-description]");
  const contactStatus = document.querySelector("[data-contact-status]");
  const contactHint = document.querySelector("[data-contact-hint]");
  const emailLink = document.querySelector("[data-email-link]");
  if (email) {
    document.querySelectorAll("[data-ad-email]").forEach((node) => {
      const body = "広告CSVの整理について相談します。\n\n・対象媒体：\n・ファイル数／おおよその行数：\n・列名：\n・希望する完成様式：\n・依頼したい作業：\n・希望納期：\n\n※実データ、個人情報、取引先名、社外秘情報、添付ファイルは送りません。";
      node.href = `mailto:${email}?subject=${encodeURIComponent("広告CSV整理の相談・見積り")}&body=${encodeURIComponent(body)}`;
    });
    const subject = status === "live" ? "Excel・CSV整形代行の相談" : "匿名化サンプルによる事前相談";
    emailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    emailLink.hidden = false;
    contactStatus.textContent = status === "live" ? "ご依頼を受付中です。" : "匿名化サンプルについてメールでご相談いただけます。";
    contactHint.textContent = status === "live"
      ? "ファイルは添付せず、まず処理内容だけをご相談ください。"
      : "匿名化した数行と完成イメージのみご相談ください。ファイル添付はしないでください。";
    if (contactDescription && status === "live") {
      contactDescription.textContent = "作業前に対象範囲・金額・納期を確認します。安全な受渡方法をご案内するまで、個人情報・取引先名・社外秘情報や実ファイルは送らないでください。";
    }
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();

