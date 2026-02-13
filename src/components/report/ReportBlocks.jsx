function cleanNum(val) {
  const n = Number(String(val ?? "").replace(/,/g, "").trim());
  return Number.isNaN(n) ? null : n;
}

function balanceStyle(val) {
  const n = cleanNum(val);
  if (n === null) return { background: "#e2e8f0", color: "#0f172a" };
  if (n >= 0) return { background: "#166534", color: "#ffffff" };
  return { background: "#991b1b", color: "#ffffff" };
}

function extractBlocks(matrix) {
  const result = [];
  for (let i = 0; i < matrix.length - 1; i++) {
    const head = matrix[i];
    const val = matrix[i + 1];

    const headOk = head && head.every((c) => String(c ?? "").trim() !== "");
    const valOk = val && val.every((c) => String(c ?? "").trim() !== "");

    if (headOk && valOk) {
      result.push({ head, val });
      i++;
    }
  }
  return result;
}

const sheetTableStyle = {
  borderCollapse: "collapse",
  tableLayout: "fixed",
  width: "520px",
};

const cellBaseStyle = {
  border: "2px solid #000",
  padding: "12px 18px",
  textAlign: "center",
  fontFamily:
    "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  width: "33.333%",
  wordBreak: "break-word",
};

export default function ReportBlocks({ matrix }) {
  const list = extractBlocks(matrix || []);

  if (!list.length) {
    return (
      <p id="statusText" className="text-sm text-slate-500">
        No report data found in K5:M15.
      </p>
    );
  }

  return (
    <div id="blocks" className="mt-6 flex flex-col items-center gap-10">
      {list.map(({ head, val }, idx) => (
        <div
          key={idx}
          style={{
            width: "520px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table className="sheet-table" style={sheetTableStyle}>
            <tbody>
              <tr>
                <th style={{ ...cellBaseStyle, fontWeight: 700 }}>{head[0]}</th>
                <th style={{ ...cellBaseStyle, fontWeight: 700 }}>{head[1]}</th>
                <th style={{ ...cellBaseStyle, fontWeight: 700 }}>{head[2]}</th>
              </tr>

              <tr>
                <td style={{ ...cellBaseStyle, fontWeight: 600 }}>{val[0]}</td>
                <td style={{ ...cellBaseStyle, fontWeight: 600 }}>{val[1]}</td>
                <td
                  style={{
                    ...cellBaseStyle,
                    fontWeight: 800,
                    ...balanceStyle(val[2]),
                  }}
                >
                  {val[2]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
