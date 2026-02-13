import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function formatPKR(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-PK", { maximumFractionDigits: 2 });
}

function parseNum(text) {
  const t = String(text ?? "").replace(/,/g, "").trim();
  const n = Number(t);
  return Number.isNaN(n) ? 0 : n;
}

function pad2(x) {
  return String(x).padStart(2, "0");
}

function getNowStrings() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mi = pad2(d.getMinutes());
  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${mi}`,
    yyyy,
    mm,
    dd,
  };
}

function extractPeopleFromDOM(reportBoxEl) {
  const tables = Array.from(reportBoxEl.querySelectorAll("table.sheet-table"));
  const people = [];

  tables.forEach((tbl) => {
    const ths = Array.from(tbl.querySelectorAll("th")).map((x) =>
      String(x.textContent || "").trim()
    );
    const tds = Array.from(tbl.querySelectorAll("td")).map((x) =>
      String(x.textContent || "").trim()
    );

    if (ths.length < 3 || tds.length < 3) return;

    const paidHead = ths[0] || "";
    const balHead = ths[2] || "";

    if (!/paid\s*by/i.test(paidHead) || !/balance/i.test(balHead)) return;

    const nameMatch = paidHead.match(/paid\s*by\s*(.+)$/i);
    const name = nameMatch ? nameMatch[1].trim() : "Member";

    const paid = parseNum(tds[0]);
    const share = parseNum(tds[1]);
    const balance = parseNum(tds[2]);

    people.push({ name, paid, share, balance });
  });

  return people;
}

function calcSummary(people) {
  const totalPaid = people.reduce((s, p) => s + p.paid, 0);
  const totalShare = people.reduce((s, p) => s + p.share, 0);
  const netBalance = people.reduce((s, p) => s + p.balance, 0);
  return { totalPaid, totalShare, netBalance };
}

export async function buildExportCanvasClean(reportBoxEl) {
  const people = extractPeopleFromDOM(reportBoxEl);
  const { totalPaid, totalShare, netBalance } = calcSummary(people);

  const now = getNowStrings();
  const reportId = `BR-${now.yyyy}${now.mm}${now.dd}-${Math.floor(
    100 + Math.random() * 900
  )}`;

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-99999px";
  wrapper.style.top = "0";
  wrapper.style.width = "900px";
  wrapper.style.background = "#ffffff";
  wrapper.style.padding = "28px";
  wrapper.style.boxSizing = "border-box";
  wrapper.style.fontFamily =
    "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial";
  wrapper.style.color = "#0f172a";

  const main = document.createElement("div");
  main.style.position = "relative";
  main.style.zIndex = "2";

  const content = reportBoxEl.cloneNode(true);
  content.style.marginTop = "14px";
  content.style.border = "2px solid #0f172a";
  content.style.borderRadius = "16px";
  content.style.padding = "18px";
  content.style.boxSizing = "border-box";
  content.style.background = "#fff";

  const loading = content.querySelector("#statusText");
  if (loading) loading.style.display = "none";

  main.appendChild(content);
  wrapper.appendChild(main);
  document.body.appendChild(wrapper);

  // 🔥 OKLCH FIX ADDED HERE
  const canvas = await html2canvas(wrapper, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
    onclone: (clonedDoc) => {
      clonedDoc.querySelectorAll("*").forEach((el) => {
        const cs = getComputedStyle(el);

        if (cs.color && cs.color.includes("oklch")) {
          el.style.color = "#0f172a";
        }

        if (cs.backgroundColor && cs.backgroundColor.includes("oklch")) {
          el.style.backgroundColor = "#ffffff";
        }

        if (cs.borderTopColor && cs.borderTopColor.includes("oklch")) {
          el.style.borderColor = "#e2e8f0";
        }

        if (cs.outlineColor && cs.outlineColor.includes("oklch")) {
          el.style.outlineColor = "#e2e8f0";
        }
      });
    },
  });

  wrapper.remove();

  return { canvas, now };
}

export async function saveAsPNG(reportBoxEl) {
  const { canvas, now } = await buildExportCanvasClean(reportBoxEl);
  const link = document.createElement("a");
  link.download = `balance-report-${now.date}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function saveAsPDF(reportBoxEl) {
  const { canvas, now } = await buildExportCanvasClean(reportBoxEl);

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth - 10;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 5, 10, imgWidth, imgHeight);

  let remaining = imgHeight - (pageHeight - 20);
  let offsetY = 10;

  while (remaining > 0) {
    pdf.addPage();
    offsetY -= pageHeight - 20;
    pdf.addImage(imgData, "PNG", 5, offsetY, imgWidth, imgHeight);
    remaining -= pageHeight - 20;
  }

  pdf.save(`balance-report-${now.date}.pdf`);
}
